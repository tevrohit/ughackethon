#!/bin/bash

# Ollama Installation and Model Setup Script
# This script checks for Ollama CLI and pulls required models for the application

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Environment variables for model selection
DEFAULT_LLM_MODEL="mistral:7b"
DEFAULT_EMBEDDING_MODEL="bge-large"
LLM_MODEL="${OLLAMA_LLM_MODEL:-$DEFAULT_LLM_MODEL}"
EMBEDDING_MODEL="${OLLAMA_EMBEDDING_MODEL:-$DEFAULT_EMBEDDING_MODEL}"

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Ollama is installed
check_ollama_installation() {
    print_info "Checking for Ollama CLI installation..."
    
    if ! command -v ollama &> /dev/null; then
        print_error "Ollama CLI is not installed or not in PATH"
        echo
        echo "Please install Ollama first:"
        echo "1. Visit: https://ollama.ai/download"
        echo "2. Or use curl: curl -fsSL https://ollama.ai/install.sh | sh"
        echo "3. For macOS with Homebrew: brew install ollama"
        echo "4. For Linux: curl -fsSL https://ollama.ai/install.sh | sh"
        echo
        echo "After installation, make sure to:"
        echo "- Start the Ollama service: ollama serve"
        echo "- Or ensure it's running as a system service"
        echo
        exit 1
    fi
    
    print_success "Ollama CLI found at: $(which ollama)"
}

# Function to check if Ollama service is running
check_ollama_service() {
    print_info "Checking if Ollama service is running..."
    
    if ! ollama list &> /dev/null; then
        print_error "Ollama service is not running or not accessible"
        echo
        echo "Please start the Ollama service:"
        echo "1. Run: ollama serve"
        echo "2. Or ensure it's running as a system service"
        echo "3. Check if port 11434 is available"
        echo
        exit 1
    fi
    
    print_success "Ollama service is running"
}

# Function to pull a model with error handling
pull_model() {
    local model_name="$1"
    local model_type="$2"
    
    print_info "Pulling ${model_type} model: ${model_name}"
    
    if ollama pull "$model_name"; then
        print_success "${model_type} model '${model_name}' pulled successfully"
    else
        print_error "Failed to pull ${model_type} model '${model_name}'"
        echo
        echo "Possible solutions:"
        echo "1. Check your internet connection"
        echo "2. Verify the model name is correct"
        echo "3. Check available models at: https://ollama.ai/library"
        echo "4. Ensure you have sufficient disk space"
        echo
        # GPU vs CPU considerations
        echo "GPU/CPU Considerations:"
        echo "- For CUDA GPUs: Models will automatically use GPU if available"
        echo "- For CPU-only: Models will run on CPU (slower but functional)"
        echo "- Check GPU support: ollama ps (shows GPU usage)"
        echo "- For Apple Silicon: Models use Metal acceleration automatically"
        echo
        exit 1
    fi
}

# Function to verify models are available
verify_models() {
    print_info "Verifying installed models..."
    
    echo
    echo "Currently installed models:"
    ollama list
    echo
    
    # Check if our specific models are installed
    if ollama list | grep -q "$LLM_MODEL"; then
        print_success "LLM model '${LLM_MODEL}' is available"
    else
        print_error "LLM model '${LLM_MODEL}' not found in installed models"
        exit 1
    fi
    
    if ollama list | grep -q "$EMBEDDING_MODEL"; then
        print_success "Embedding model '${EMBEDDING_MODEL}' is available"
    else
        print_error "Embedding model '${EMBEDDING_MODEL}' not found in installed models"
        exit 1
    fi
}

# Function to display GPU/CPU configuration info
display_system_info() {
    print_info "System Configuration Notes:"
    echo
    echo "GPU Configuration:"
    echo "- CUDA GPUs: Ollama automatically detects and uses NVIDIA GPUs"
    echo "- Apple Silicon: Uses Metal acceleration (M1/M2/M3 chips)"
    echo "- AMD GPUs: Limited support, check Ollama documentation"
    echo
    echo "CPU Configuration:"
    echo "- Models will run on CPU if no compatible GPU is found"
    echo "- CPU inference is slower but requires no additional setup"
    echo "- Ensure sufficient RAM (8GB+ recommended for 7B models)"
    echo
    echo "To modify GPU/CPU behavior:"
    echo "- Set CUDA_VISIBLE_DEVICES to control GPU usage"
    echo "- Use --gpu flag with ollama run command for specific GPU control"
    echo "- Monitor usage with: ollama ps"
    echo
}

# Main execution
main() {
    echo "=================================================="
    echo "Ollama Installation and Model Setup Script"
    echo "=================================================="
    echo
    
    print_info "Using LLM model: ${LLM_MODEL}"
    print_info "Using embedding model: ${EMBEDDING_MODEL}"
    echo
    print_info "To override models, set environment variables:"
    echo "  export OLLAMA_LLM_MODEL='qwen2.5:7b'"
    echo "  export OLLAMA_EMBEDDING_MODEL='snowflake-arctic-embed2'"
    echo
    
    # Step 1: Check Ollama installation
    check_ollama_installation
    
    # Step 2: Check if Ollama service is running
    check_ollama_service
    
    # Step 3: Pull LLM model
    pull_model "$LLM_MODEL" "LLM"
    
    # Step 4: Pull embedding model
    pull_model "$EMBEDDING_MODEL" "Embedding"
    
    # Step 5: Verify models are available
    verify_models
    
    # Step 6: Display system info
    display_system_info
    
    print_success "All models installed and verified successfully!"
    echo
    echo "You can now use the models with:"
    echo "  ollama run ${LLM_MODEL}"
    echo "  ollama run ${EMBEDDING_MODEL}"
    echo
}

# Execute main function
main "$@"
