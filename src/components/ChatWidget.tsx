import React, { useState, useRef, useEffect } from 'react';

// Simple icon components as fallback
const PaperAirplaneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const MicrophoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

const PaperClipIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
  </svg>
);

const HandThumbUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5.25 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
  </svg>
);

const HandThumbDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 18.75 15H15.31c-.483 0-.964.078-1.423.23l-3.114 1.04a4.501 4.501 0 01-1.423.23h-1.27a.75.75 0 01-.75-.75v-2.25a.75.75 0 01.75-.75H10.5a2.25 2.25 0 002.25-2.25v-.75a2.25 2.25 0 00-2.25-2.25H8.25a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h2.25A2.25 2.25 0 0013 6v-1.5a2.25 2.25 0 00-2.25-2.25H9a.75.75 0 01-.75-.75v-.75a.75.75 0 01.75-.75h1.5A4.5 4.5 0 0115 4.5v1.5a2.25 2.25 0 01-2.25 2.25H11.25a.75.75 0 00-.75.75v.75c0 .414.336.75.75.75H13a4.5 4.5 0 014.5 4.5v.75a2.25 2.25 0 01-2.25 2.25H13.5a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75h1.27c.483 0 .964-.078 1.423-.23l3.114-1.04c.459-.152.94-.23 1.423-.23h1.27a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H18.75a2.25 2.25 0 01-2.25-2.25v-.75a2.25 2.25 0 012.25-2.25H21a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75H18.75a4.5 4.5 0 01-4.5-4.5V1.5A2.25 2.25 0 0012 .75h-1.5A2.25 2.25 0 008.25 3v.75a.75.75 0 00.75.75H10.5a2.25 2.25 0 012.25 2.25V7.5a2.25 2.25 0 01-2.25 2.25H8.25a.75.75 0 00-.75.75z" />
  </svg>
);

const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const GlobeAltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9zm0 0V9m0 12l-8.716-6.747M12 21l8.716-6.747M12 9l8.716 6.747M12 9L3.284 15.747M12 9l8.716-6.747M12 9L3.284 2.253" />
  </svg>
);

const ChatBubbleLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

interface ChatWidgetProps {
  courseId: string;
  moduleId: string;
  userHash: string;
  userLang: string;
}

interface SourceInfo {
  doc: string;
  chunk: string;
  score: number;
}

interface AIMessage {
  id: string;
  answer: string;
  sources: SourceInfo[];
  followups: string[];
  escalate: boolean;
  ticket_id?: string;
  timestamp: Date;
}

interface UserMessage {
  id: string;
  question: string;
  timestamp: Date;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: UserMessage | AIMessage;
  isStreaming?: boolean;
}

const QUICK_CHIPS = [
  "Explain this concept",
  "Give me an example",
  "What's the next step?",
  "I need help with homework",
  "Can you summarize?",
  "Practice questions"
];

const LANGUAGE_OPTIONS = [
  { code: 'English', label: 'English', flag: '🇺🇸' },
  { code: 'Hindi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'Marathi', label: 'मराठी', flag: '🇮🇳' }
];

const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  courseId, 
  moduleId, 
  userHash, 
  userLang: initialLang 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState(initialLang);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: {
        id: generateId(),
        question: question.trim(),
        timestamp: new Date()
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Create placeholder AI message for streaming
    const aiMessageId = generateId();
    const placeholderAI: Message = {
      id: aiMessageId,
      type: 'ai',
      content: {
        id: generateId(),
        answer: '',
        sources: [],
        followups: [],
        escalate: false,
        timestamp: new Date()
      },
      isStreaming: true
    };

    setMessages(prev => [...prev, placeholderAI]);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id_hash: userHash,
          course_id: courseId,
          module_id: moduleId,
          question: question.trim(),
          lang: selectedLang
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const aiResponse = await response.json();
      
      // Update the placeholder message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? {
              ...msg,
              content: {
                id: generateId(),
                answer: aiResponse.answer,
                sources: aiResponse.sources || [],
                followups: aiResponse.followups || [],
                escalate: aiResponse.escalate || false,
                ticket_id: aiResponse.ticket_id,
                timestamp: new Date()
              },
              isStreaming: false
            }
          : msg
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update with error message
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? {
              ...msg,
              content: {
                id: generateId(),
                answer: 'Sorry, I encountered an error. Please try again.',
                sources: [],
                followups: ['Could you try rephrasing your question?'],
                escalate: true,
                timestamp: new Date()
              },
              isStreaming: false
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendFeedback = async (messageId: string, isHelpful: boolean, ticketId?: string) => {
    try {
      const endpoint = ticketId 
        ? `/api/tickets/${ticketId}/feedback`
        : '/api/ai/feedback';
      
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_id: messageId,
          user_id_hash: userHash,
          helpful: isHelpful,
          course_id: courseId,
          module_id: moduleId
        })
      });
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const handleQuickChip = (chip: string) => {
    setInputMessage(chip);
    textareaRef.current?.focus();
  };

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleVoiceRecording = () => {
    // Placeholder for voice recording functionality
    setIsRecording(!isRecording);
    // TODO: Implement speech-to-text
  };

  const openDocumentSection = (source: SourceInfo) => {
    // Placeholder for opening document section
    console.log('Opening document:', source);
    // TODO: Implement document viewer
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <SparklesIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Mentor</h3>
            <p className="text-sm text-gray-600">{courseId} • {moduleId}</p>
          </div>
        </div>
        
        {/* Language Switcher */}
        <div className="relative">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGE_OPTIONS.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
          <GlobeAltIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <ChatBubbleLeftIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Ask me anything about your course!</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {message.type === 'user' ? (
                <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2">
                  <p className="text-sm">{(message.content as UserMessage).question}</p>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <SparklesIcon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {message.isStreaming ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-pulse flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-500">Thinking...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">
                            {(message.content as AIMessage).answer}
                          </p>
                          
                          {/* Sources */}
                          {(message.content as AIMessage).sources.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {(message.content as AIMessage).sources.map((source, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => openDocumentSection(source)}
                                  className="inline-flex items-center px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full text-xs text-blue-700 transition-colors"
                                >
                                  <DocumentTextIcon className="w-3 h-3 mr-1" />
                                  {source.doc}:{source.chunk}
                                  <span className="ml-1 text-blue-500">({(source.score * 100).toFixed(0)}%)</span>
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {/* Follow-up Questions */}
                          {(message.content as AIMessage).followups.length > 0 && (
                            <div className="mt-3 space-y-1">
                              <p className="text-xs text-gray-500 font-medium">Follow-up questions:</p>
                              {(message.content as AIMessage).followups.map((followup, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => sendMessage(followup)}
                                  className="block w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                                >
                                  {followup}
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {/* Feedback Buttons */}
                          <div className="mt-3 flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Was this helpful?</span>
                            <button
                              onClick={() => handleSendFeedback(
                                message.content.id, 
                                true, 
                                (message.content as AIMessage).ticket_id
                              )}
                              className="p-1 hover:bg-green-50 rounded-full transition-colors group"
                            >
                              <HandThumbUpIcon className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                            </button>
                            <button
                              onClick={() => handleSendFeedback(
                                message.content.id, 
                                false, 
                                (message.content as AIMessage).ticket_id
                              )}
                              className="p-1 hover:bg-red-50 rounded-full transition-colors group"
                            >
                              <HandThumbDownIcon className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Avatar */}
              <div className={`flex items-center mt-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <UserIcon className="w-3 h-3 text-white" />
                  ) : (
                    <SparklesIcon className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips */}
      {messages.length === 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickChip(chip)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <PaperClipIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">{file.name}</span>
                <button
                  onClick={() => removeAttachment(idx)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <PaperClipIcon className="w-5 h-5" />
          </button>
          
          {/* Voice Button */}
          <button
            onClick={handleVoiceRecording}
            className={`flex-shrink-0 p-2 rounded-full transition-colors ${
              isRecording 
                ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MicrophoneIcon className="w-5 h-5" />
          </button>
          
          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your course..."
              className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
              rows={1}
              disabled={isLoading}
            />
          </div>
          
          {/* Send Button */}
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isLoading}
            className="flex-shrink-0 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileAttachment}
        accept=".pdf,.txt,.md,.doc,.docx,.png,.jpg,.jpeg"
      />
    </div>
  );
};

export default ChatWidget;