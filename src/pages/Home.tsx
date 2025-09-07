import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-500 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-8 h-8 bg-orange-500 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                ✨ Welcome to the Future of Learning
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Learning
              </span>
              <br />
              <span className="text-gray-900">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Experience the future of education with our comprehensive AI learning platform. 
              Get personalized mentoring, emotional support, and intelligent nudges to accelerate your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              <Link 
                to="/mentor"
                className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-blue font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 no-underline flex items-center justify-center text-lg"
              >
                <span className="mr-3 text-xl">🚀</span>
                Start Learning Now
              </Link>
              <Link 
                to="/ai-counselor"
                className="w-full sm:w-auto px-12 py-5 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 no-underline flex items-center justify-center shadow-md hover:shadow-lg text-lg"
              >
                <span className="mr-3 text-xl">💡</span>
                Get Support
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">Instant AI Responses</h4>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">Multi-language Support</h4>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">Secure & Private</h4>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📱</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">Mobile Optimized</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full">
                🎯 Our Solutions
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Learning Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our suite of AI-powered tools designed to enhance your educational experience 
              with cutting-edge technology and personalized support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* AI Student Chat */}
          <Link to="/" className="group no-underline">
            <div className="relative feature-card bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-blue-100 h-full flex flex-col overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">AI Student Chat</h3>
                <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                  Get instant answers to your course questions with our intelligent AI assistant. 
                  Available 24/7 in multiple languages.
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-auto">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Instant Answers</span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">Multilingual</span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">24/7 Support</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Mentor Console */}
          <Link to="/mentor" className="group no-underline">
            <div className="relative feature-card bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-green-100 h-full flex flex-col overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Mentor Console</h3>
                <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                  Advanced ticket management system with student 360° profiles, 
                  SLA tracking, and intelligent assignment capabilities.
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-auto">
                  <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">Ticket Management</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Student 360°</span>
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">SLA Tracking</span>
                </div>
              </div>
            </div>
          </Link>

          {/* AI Counselor */}
          <Link to="/ai-counselor" className="group no-underline">
            <div className="relative feature-card bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-100 h-full flex flex-col overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">AI Counselor</h3>
                <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                  Emotional support and personalized guidance for your academic journey. 
                  Get help with study planning and motivation.
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-auto">
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">Emotional Support</span>
                  <span className="px-4 py-2 bg-pink-100 text-pink-800 text-sm font-medium rounded-full">Study Planning</span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">Goal Setting</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Nudge Designer */}
          <Link to="/counselor" className="group no-underline">
            <div className="relative feature-card bg-gradient-to-br from-white to-orange-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-orange-100 h-full flex flex-col overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Smart Nudge Designer</h3>
                <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                  Create personalized nudges across WhatsApp, Email, and Push notifications 
                  to boost student engagement and motivation.
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-auto">
                  <span className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">Multi-Channel</span>
                  <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full">Personalized</span>
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">Engagement</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Risk Assessment */}
          <div className="relative feature-card bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-red-100 h-full flex flex-col overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Risk Assessment</h3>
              <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                AI-powered student risk scoring to identify at-risk learners early 
                and provide proactive intervention strategies.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-auto">
                <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full">Early Detection</span>
                <span className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">Predictive</span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">Intervention</span>
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="relative feature-card bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-indigo-100 h-full flex flex-col overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Analytics Dashboard</h3>
              <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow">
                Comprehensive learning analytics with real-time insights, 
                progress tracking, and performance optimization recommendations.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-auto">
                <span className="px-4 py-2 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">Real-time</span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Insights</span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">Optimization</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Built with cutting-edge technology for optimal performance and scalability</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Ollama LLM</h3>
              <p className="text-gray-600">Local AI Processing</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">FastAPI</h3>
              <p className="text-gray-600">High Performance Backend</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚛️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">React</h3>
              <p className="text-gray-600">Modern Frontend</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Vector Search</h3>
              <p className="text-gray-600">Intelligent Content Retrieval</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">upGrad AI Learning Platform</h3>
            </div>
            <p className="text-gray-400 mb-6">Transforming education through artificial intelligence</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/mentor"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors no-underline text-white font-medium"
              >
                Access Mentor Console
              </Link>
              <Link 
                to="/ai-counselor"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors no-underline text-white font-medium"
              >
                Try AI Counselor
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
