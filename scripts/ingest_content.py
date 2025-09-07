#!/usr/bin/env python3
"""
Content Ingestion CLI for Embeddings API

Reads a directory of files (pdf, txt, md, vtt), extracts text,
chunks it, and uploads to the embeddings API for vector storage.

Usage:
    python scripts/ingest_content.py --input-dir ./content --api-url http://localhost:8001
    python scripts/ingest_content.py --input-dir ./docs --chunk-size 600 --module "course-materials"
"""

import argparse
import asyncio
import json
import logging
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Any
import aiohttp
import aiofiles
from dataclasses import dataclass

# Try to import optional dependencies
try:
    from pdfminer.high_level import extract_text as extract_pdf_text
    from pdfminer.pdfparser import PDFSyntaxError
    PDF_SUPPORT = True
except ImportError:
    PDF_SUPPORT = False
    print("Warning: pdfminer3k not installed. PDF support disabled.")
    print("Install with: pip install pdfminer3k")

try:
    import tiktoken
    TIKTOKEN_SUPPORT = True
except ImportError:
    TIKTOKEN_SUPPORT = False
    print("Warning: tiktoken not installed. Using character-based chunking.")
    print("Install with: pip install tiktoken")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@dataclass
class ProcessingStats:
    """Statistics for content processing."""
    files_processed: int = 0
    files_failed: int = 0
    chunks_created: int = 0
    vectors_upserted: int = 0
    errors: List[str] = None
    
    def __post_init__(self):
        if self.errors is None:
            self.errors = []

class ContentProcessor:
    """Handles content extraction and processing from various file types."""
    
    SUPPORTED_EXTENSIONS = {'.pdf', '.txt', '.md', '.vtt'}
    
    def __init__(self, chunk_size: int = 800, chunk_overlap: int = 100):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        
        # Initialize tokenizer if available
        if TIKTOKEN_SUPPORT:
            try:
                self.tokenizer = tiktoken.get_encoding("cl100k_base")  # GPT-4 tokenizer
                self.use_tokens = True
                logger.info("Using tiktoken for token-based chunking")
            except Exception as e:
                logger.warning(f"Failed to initialize tiktoken: {e}. Using character-based chunking.")
                self.use_tokens = False
        else:
            self.use_tokens = False
    
    def _count_tokens_or_chars(self, text: str) -> int:
        """Count tokens if tiktoken is available, otherwise characters."""
        if self.use_tokens:
            return len(self.tokenizer.encode(text))
        else:
            return len(text)
    
    def _extract_text_from_file(self, file_path: Path) -> Tuple[str, Dict[str, Any]]:
        """Extract text from various file types."""
        extension = file_path.suffix.lower()
        metadata = {
            'filename': file_path.name,
            'extension': extension,
            'file_size': file_path.stat().st_size,
            'modified_time': file_path.stat().st_mtime
        }
        
        try:
            if extension == '.pdf':
                if not PDF_SUPPORT:
                    raise ValueError("PDF support not available. Install pdfminer3k.")
                text = extract_pdf_text(str(file_path))
                
            elif extension in {'.txt', '.md'}:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    text = f.read()
                    
            elif extension == '.vtt':
                text = self._extract_vtt_text(file_path)
                
            else:
                raise ValueError(f"Unsupported file type: {extension}")
            
            # Clean up text
            text = self._clean_text(text)
            
            if not text.strip():
                raise ValueError("No text content extracted")
                
            return text, metadata
            
        except Exception as e:
            logger.error(f"Failed to extract text from {file_path}: {e}")
            raise
    
    def _extract_vtt_text(self, file_path: Path) -> str:
        """Extract text content from VTT (WebVTT) subtitle files."""
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Remove VTT headers and timestamps
        lines = content.split('\n')
        text_lines = []
        
        for line in lines:
            line = line.strip()
            # Skip empty lines, WEBVTT header, and timestamp lines
            if (not line or 
                line.startswith('WEBVTT') or 
                '-->' in line or 
                re.match(r'^\d+$', line)):
                continue
            text_lines.append(line)
        
        return ' '.join(text_lines)
    
    def _clean_text(self, text: str) -> str:
        """Clean and normalize text content."""
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        # Remove control characters
        text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', text)
        return text.strip()
    
    def _chunk_text(self, text: str, doc_id: str) -> List[Dict[str, Any]]:
        """Split text into chunks with metadata."""
        if self._count_tokens_or_chars(text) <= self.chunk_size:
            return [{
                'text': text,
                'chunk_id': f"{doc_id}_chunk_0",
                'chunk_index': 0,
                'start_position': 0,
                'end_position': len(text)
            }]
        
        chunks = []
        start = 0
        chunk_index = 0
        
        while start < len(text):
            # Determine end position
            if self.use_tokens:
                # For token-based chunking, we need to be more careful
                end = self._find_token_boundary(text, start, self.chunk_size)
            else:
                end = start + self.chunk_size
            
            # Try to break at sentence boundaries for better chunks
            if end < len(text):
                # Look for sentence endings within the last portion
                search_start = max(start, end - 200)
                sentence_end = self._find_sentence_boundary(text, search_start, end)
                if sentence_end > start:
                    end = sentence_end
            
            chunk_text = text[start:end].strip()
            if chunk_text:
                chunks.append({
                    'text': chunk_text,
                    'chunk_id': f"{doc_id}_chunk_{chunk_index}",
                    'chunk_index': chunk_index,
                    'start_position': start,
                    'end_position': end
                })
                chunk_index += 1
            
            # Move start position with overlap
            start = end - self.chunk_overlap
            if start >= len(text):
                break
        
        return chunks
    
    def _find_token_boundary(self, text: str, start: int, max_tokens: int) -> int:
        """Find a good boundary for token-based chunking."""
        if not self.use_tokens:
            return start + max_tokens
        
        # Binary search for the right boundary
        left, right = start, len(text)
        best_end = start + max_tokens
        
        while left < right:
            mid = (left + right + 1) // 2
            chunk = text[start:mid]
            token_count = self._count_tokens_or_chars(chunk)
            
            if token_count <= max_tokens:
                best_end = mid
                left = mid
            else:
                right = mid - 1
        
        return best_end
    
    def _find_sentence_boundary(self, text: str, search_start: int, max_end: int) -> int:
        """Find the best sentence boundary for chunking."""
        # Look for sentence endings
        for pattern in [r'\.(?:\s|$)', r'[!?](?:\s|$)', r'\n\n']:
            matches = list(re.finditer(pattern, text[search_start:max_end]))
            if matches:
                # Take the last match
                last_match = matches[-1]
                return search_start + last_match.end()
        
        return max_end
    
    async def process_file(self, file_path: Path, module: str = "default") -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
        """Process a single file and return chunks with metadata."""
        logger.info(f"Processing file: {file_path}")
        
        try:
            # Extract text and basic metadata
            text, file_metadata = self._extract_text_from_file(file_path)
            
            # Create document ID
            doc_id = f"{module}_{file_path.stem}"
            
            # Chunk the text
            chunks = self._chunk_text(text, doc_id)
            
            # Add metadata to each chunk
            processed_chunks = []
            for chunk in chunks:
                chunk_data = {
                    'doc_id': chunk['chunk_id'],  # Use chunk_id as doc_id for API
                    'text': chunk['text'],
                    'metadata': {
                        'original_doc_id': doc_id,
                        'module': module,
                        'chunk_id': chunk['chunk_id'],
                        'chunk_index': chunk['chunk_index'],
                        'start_ts': chunk['start_position'],  # Using position as timestamp
                        'filename': file_metadata['filename'],
                        'file_extension': file_metadata['extension'],
                        'file_size': file_metadata['file_size'],
                        'token_count': self._count_tokens_or_chars(chunk['text'])
                    }
                }
                processed_chunks.append(chunk_data)
            
            summary = {
                'doc_id': doc_id,
                'filename': file_path.name,
                'chunks_created': len(processed_chunks),
                'total_tokens': sum(self._count_tokens_or_chars(chunk['text']) for chunk in chunks),
                'file_size': file_metadata['file_size']
            }
            
            return processed_chunks, summary
            
        except Exception as e:
            logger.error(f"Failed to process file {file_path}: {e}")
            raise

class EmbeddingsAPIClient:
    """Client for interacting with the embeddings API."""
    
    def __init__(self, api_url: str):
        self.api_url = api_url.rstrip('/')
        self.upsert_url = f"{self.api_url}/api/embeddings/upsert"
    
    async def upsert_chunk(self, session: aiohttp.ClientSession, chunk_data: Dict[str, Any]) -> bool:
        """Upload a single chunk to the embeddings API."""
        try:
            async with session.post(self.upsert_url, json=chunk_data) as response:
                if response.status == 200:
                    return True
                else:
                    error_text = await response.text()
                    logger.error(f"API error for chunk {chunk_data['doc_id']}: {response.status} - {error_text}")
                    return False
                    
        except Exception as e:
            logger.error(f"Failed to upload chunk {chunk_data['doc_id']}: {e}")
            return False
    
    async def health_check(self) -> bool:
        """Check if the API is available."""
        try:
            health_url = f"{self.api_url}/api/embeddings/health"
            async with aiohttp.ClientSession() as session:
                async with session.get(health_url) as response:
                    return response.status == 200
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return False

async def main():
    """Main CLI function."""
    parser = argparse.ArgumentParser(
        description="Ingest content files and upload to embeddings API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/ingest_content.py --input-dir ./content
  python scripts/ingest_content.py --input-dir ./docs --chunk-size 600 --module "course-materials"
  python scripts/ingest_content.py --input-dir ./pdfs --api-url http://localhost:8001 --verbose
        """
    )
    
    parser.add_argument(
        '--input-dir', '-i',
        type=str,
        required=True,
        help='Directory containing files to process'
    )
    
    parser.add_argument(
        '--api-url', '-u',
        type=str,
        default='http://localhost:8001',
        help='Base URL for the embeddings API (default: http://localhost:8001)'
    )
    
    parser.add_argument(
        '--chunk-size', '-c',
        type=int,
        default=800,
        help='Maximum chunk size in tokens/characters (default: 800)'
    )
    
    parser.add_argument(
        '--chunk-overlap', '-o',
        type=int,
        default=100,
        help='Overlap between chunks in tokens/characters (default: 100)'
    )
    
    parser.add_argument(
        '--module', '-m',
        type=str,
        default='default',
        help='Module name for categorizing content (default: default)'
    )
    
    parser.add_argument(
        '--max-concurrent', '-j',
        type=int,
        default=5,
        help='Maximum concurrent API requests (default: 5)'
    )
    
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Enable verbose logging'
    )
    
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Process files but do not upload to API'
    )
    
    args = parser.parse_args()
    
    # Configure logging level
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Validate input directory
    input_dir = Path(args.input_dir)
    if not input_dir.exists():
        logger.error(f"Input directory does not exist: {input_dir}")
        sys.exit(1)
    
    if not input_dir.is_dir():
        logger.error(f"Input path is not a directory: {input_dir}")
        sys.exit(1)
    
    # Initialize components
    processor = ContentProcessor(
        chunk_size=args.chunk_size,
        chunk_overlap=args.chunk_overlap
    )
    
    api_client = EmbeddingsAPIClient(args.api_url)
    stats = ProcessingStats()
    
    # Check API health if not dry run
    if not args.dry_run:
        logger.info("Checking API health...")
        if not await api_client.health_check():
            logger.error(f"API health check failed. Is the service running at {args.api_url}?")
            sys.exit(1)
        logger.info("API is healthy")
    
    # Find all supported files
    supported_files = []
    for ext in processor.SUPPORTED_EXTENSIONS:
        pattern = f"**/*{ext}"
        files = list(input_dir.glob(pattern))
        supported_files.extend(files)
    
    if not supported_files:
        logger.warning(f"No supported files found in {input_dir}")
        logger.info(f"Supported extensions: {', '.join(processor.SUPPORTED_EXTENSIONS)}")
        sys.exit(0)
    
    logger.info(f"Found {len(supported_files)} files to process")
    
    # Process files
    all_chunks = []
    file_summaries = []
    
    for file_path in supported_files:
        try:
            chunks, summary = await processor.process_file(file_path, args.module)
            all_chunks.extend(chunks)
            file_summaries.append(summary)
            stats.files_processed += 1
            stats.chunks_created += len(chunks)
            
            logger.info(f"✓ {file_path.name}: {len(chunks)} chunks created")
            
        except Exception as e:
            stats.files_failed += 1
            stats.errors.append(f"{file_path.name}: {str(e)}")
            logger.error(f"✗ Failed to process {file_path.name}: {e}")
    
    # Upload chunks to API if not dry run
    if not args.dry_run and all_chunks:
        logger.info(f"Uploading {len(all_chunks)} chunks to API...")
        
        semaphore = asyncio.Semaphore(args.max_concurrent)
        
        async def upload_chunk_with_semaphore(session, chunk):
            async with semaphore:
                success = await api_client.upsert_chunk(session, chunk)
                if success:
                    stats.vectors_upserted += 1
                return success
        
        async with aiohttp.ClientSession() as session:
            tasks = [
                upload_chunk_with_semaphore(session, chunk)
                for chunk in all_chunks
            ]
            
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            failed_uploads = sum(1 for result in results if not result or isinstance(result, Exception))
            if failed_uploads > 0:
                logger.warning(f"{failed_uploads} chunks failed to upload")
    
    # Print summary
    print("\n" + "="*60)
    print("CONTENT INGESTION SUMMARY")
    print("="*60)
    print(f"Files processed:     {stats.files_processed}")
    print(f"Files failed:        {stats.files_failed}")
    print(f"Chunks created:      {stats.chunks_created}")
    
    if not args.dry_run:
        print(f"Vectors upserted:    {stats.vectors_upserted}")
        upload_success_rate = (stats.vectors_upserted / stats.chunks_created * 100) if stats.chunks_created > 0 else 0
        print(f"Upload success rate: {upload_success_rate:.1f}%")
    else:
        print("Vectors upserted:    N/A (dry run)")
    
    print(f"\nConfiguration:")
    print(f"  Input directory:   {input_dir}")
    print(f"  Module:            {args.module}")
    print(f"  Chunk size:        {args.chunk_size} {'tokens' if processor.use_tokens else 'characters'}")
    print(f"  Chunk overlap:     {args.chunk_overlap}")
    print(f"  API URL:           {args.api_url}")
    
    if file_summaries:
        print(f"\nFile Details:")
        for summary in file_summaries:
            print(f"  {summary['filename']}: {summary['chunks_created']} chunks, {summary['total_tokens']} tokens")
    
    if stats.errors:
        print(f"\nErrors ({len(stats.errors)}):")
        for error in stats.errors[:10]:  # Show first 10 errors
            print(f"  • {error}")
        if len(stats.errors) > 10:
            print(f"  ... and {len(stats.errors) - 10} more errors")
    
    print("="*60)
    
    # Exit with error code if there were failures
    if stats.files_failed > 0 or (not args.dry_run and stats.vectors_upserted < stats.chunks_created):
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
