import React from 'react'
import { Link } from 'react-router-dom'
import ChatWidget from '../components/ChatWidget'

function AICounselor() {
  return (
    <div className="min-h-screen gradient-purple">
      {/* Navigation Header */}
      <nav className="nav-header shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">AI Counselor - Personal Support</h1>
              </div>
            </div>
            <div className="hidden md:flex space-x-2">
              <Link 
                to="/" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
              >
                🏠 Home
              </Link>
              <Link 
                to="/mentor" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                🎓 Mentor Console
              </Link>
              <Link 
                to="/counselor" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
              >
                🔧 Nudge Designer
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-200 rounded-3xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Counselor
            </span>
            <br />
            <span className="text-gray-800">Personal Support & Guidance</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get personalized emotional support, academic guidance, and motivation from our empathetic AI counselor. 
            We're here to help you navigate your learning journey with care and understanding.
          </p>
        </div>

        {/* Support Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="feature-card text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Emotional Support</h3>
            <p className="text-sm text-gray-600">Get help managing stress, anxiety, and academic pressure with empathy and care</p>
          </div>

          <div className="feature-card text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Study Planning</h3>
            <p className="text-sm text-gray-600">Create personalized study schedules and effective learning strategies</p>
          </div>

          <div className="feature-card text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Goal Setting</h3>
            <p className="text-sm text-gray-600">Define clear objectives and create actionable plans to achieve them</p>
          </div>

          <div className="feature-card text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Career Guidance</h3>
            <p className="text-sm text-gray-600">Explore career paths and get advice on professional development</p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-12 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Important Notice - Professional Support
              </h3>
              <p className="text-yellow-700 leading-relaxed">
                Our AI counselor provides general guidance and emotional support for academic challenges. 
                For serious mental health concerns, crisis situations, or clinical support, please consult with 
                a qualified professional counselor, therapist, or contact your local mental health services.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-medium rounded-full">Academic Support</span>
                <span className="px-3 py-1 bg-orange-200 text-orange-800 text-xs font-medium rounded-full">Study Guidance</span>
                <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-medium rounded-full">Non-Clinical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Widget Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">AI Counselor Chat</h3>
                  <p className="text-purple-100 text-sm">Your personal support companion</p>
                </div>
              </div>
            </div>
            <div className="chat-widget-container" style={{ height: '600px' }}>
              <ChatWidget 
                courseId="COUNSELOR_SUPPORT"
                moduleId="Personal_Development"
                userHash="counselor_user_789"
                userLang="English"
              />
            </div>
          </div>
        </div>

        {/* Quick Support Topics */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Quick Support Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">😰</span>
                </div>
                <h3 className="font-semibold text-gray-900">Exam Anxiety</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Feeling overwhelmed about upcoming exams? Let's work on strategies to manage test anxiety and build confidence.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">Stress Management</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Confidence Building</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📚</span>
                </div>
                <h3 className="font-semibold text-gray-900">Study Motivation</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Struggling to stay motivated? Let's find your learning style and create a study plan that works for you.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Motivation</span>
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Study Plans</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">🎯</span>
                </div>
                <h3 className="font-semibold text-gray-900">Career Confusion</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Unsure about your career path? Let's explore your interests, strengths, and potential opportunities together.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Career Planning</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">Self Discovery</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">⏰</span>
                </div>
                <h3 className="font-semibold text-gray-900">Time Management</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Feeling overwhelmed with deadlines? Let's create a balanced schedule that works with your lifestyle.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">Organization</span>
                <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">Balance</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-lg">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-900">Social Challenges</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Having trouble with peer relationships or group work? Let's discuss strategies for better social interactions.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">Social Skills</span>
                <span className="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded-full">Communication</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 text-lg">💪</span>
                </div>
                <h3 className="font-semibold text-gray-900">Self-Confidence</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Working on building self-esteem and confidence? Let's explore your strengths and develop a positive mindset.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">Self-Esteem</span>
                <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full">Mindset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AICounselor
