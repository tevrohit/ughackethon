import { useState } from 'react'
import { Link } from 'react-router-dom'

interface NudgePreview {
  text: string
  preview: string
  tone_tag: string
}

interface NudgeRequest {
  user_first_name: string
  language: string
  scenario_short: string
  tone: string
  cta_url: string
  channel: 'whatsapp' | 'email' | 'push'
}

function Counselor() {
  const [activeTab, setActiveTab] = useState<'designer' | 'support'>('designer')
  const [nudgeData, setNudgeData] = useState<NudgeRequest>({
    user_first_name: 'John',
    language: 'English',
    scenario_short: 'assignment_reminder',
    tone: 'friendly',
    cta_url: 'https://app.example.com/assignment',
    channel: 'whatsapp'
  })
  const [preview, setPreview] = useState<NudgePreview | null>(null)
  const [loading, setLoading] = useState(false)
  const [testRecipient, setTestRecipient] = useState('')

  // Available variables for template
  const availableVariables = [
    { name: 'user_first_name', description: 'Student\'s first name', example: 'John' },
    { name: 'language', description: 'User\'s preferred language', example: 'English' },
    { name: 'scenario_short', description: 'Nudge scenario type', example: 'assignment_reminder' },
    { name: 'tone', description: 'Communication tone', example: 'friendly' },
    { name: 'cta_url', description: 'Call-to-action URL', example: 'https://app.example.com' }
  ]

  const scenarios = [
    'assignment_reminder',
    'course_completion',
    'study_motivation',
    'deadline_approaching',
    'achievement_celebration',
    'engagement_boost',
    'feedback_request',
    'career_guidance'
  ]

  const tones = [
    'friendly',
    'professional',
    'encouraging',
    'urgent',
    'celebratory',
    'supportive'
  ]

  const languages = [
    'English',
    'Hindi',
    'Marathi',
    'Spanish',
    'French',
    'German'
  ]

  // Generate preview
  const generatePreview = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/nudge/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nudgeData)
      })
      
      if (response.ok) {
        const data = await response.json()
        setPreview(data)
      } else {
        console.error('Failed to generate preview')
      }
    } catch (error) {
      console.error('Error generating preview:', error)
    } finally {
      setLoading(false)
    }
  }

  // Send test nudge
  const sendTest = async () => {
    if (!testRecipient || !preview) return
    
    try {
      const response = await fetch('/api/nudge/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...nudgeData,
          recipient: testRecipient,
          message: preview.text
        })
      })
      
      if (response.ok) {
        alert('Test nudge sent successfully!')
      } else {
        alert('Failed to send test nudge')
      }
    } catch (error) {
      console.error('Error sending test:', error)
      alert('Error sending test nudge')
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
          </svg>
        )
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'push':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.718A10.951 10.951 0 0112 22a10.951 10.951 0 017.132-2.282M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5M20.662 17A9.955 9.955 0 0022 12c0-5.523-4.477-10-10-10" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen gradient-purple">
      {/* Navigation Header */}
      <nav className="nav-header shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Counselor Console</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
                Home
              </Link>
              <Link to="/mentor" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
                Mentor
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('designer')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'designer'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Nudge Designer
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'support'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Student Support
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'designer' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Template Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Nudge Template Editor</h2>
                
                {/* Channel Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                  <div className="flex space-x-4">
                    {(['whatsapp', 'email', 'push'] as const).map((channel) => (
                      <button
                        key={channel}
                        onClick={() => setNudgeData({...nudgeData, channel})}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                          nudgeData.channel === channel
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {getChannelIcon(channel)}
                        <span className="capitalize">{channel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <input
                      type="text"
                      value={nudgeData.user_first_name}
                      onChange={(e) => setNudgeData({...nudgeData, user_first_name: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="Enter student name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={nudgeData.language}
                      onChange={(e) => setNudgeData({...nudgeData, language: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scenario</label>
                    <select
                      value={nudgeData.scenario_short}
                      onChange={(e) => setNudgeData({...nudgeData, scenario_short: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      {scenarios.map((scenario) => (
                        <option key={scenario} value={scenario}>
                          {scenario.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                    <select
                      value={nudgeData.tone}
                      onChange={(e) => setNudgeData({...nudgeData, tone: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      {tones.map((tone) => (
                        <option key={tone} value={tone}>
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Call-to-Action URL</label>
                  <input
                    type="url"
                    value={nudgeData.cta_url}
                    onChange={(e) => setNudgeData({...nudgeData, cta_url: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="https://app.example.com/action"
                  />
                </div>

                {/* Generate Preview Button */}
                <button
                  onClick={generatePreview}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating...' : 'Generate Preview'}
                </button>
              </div>

              {/* Variables Reference */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Variables</h3>
                <div className="space-y-3">
                  {availableVariables.map((variable) => (
                    <div key={variable.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <code className="text-sm font-mono text-purple-600">{`{${variable.name}}`}</code>
                        <p className="text-xs text-gray-600 mt-1">{variable.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 italic">{variable.example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              {/* Preview */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                
                {preview ? (
                  <div className="space-y-4">
                    {/* Channel Preview */}
                    <div className={`p-4 rounded-lg border-2 ${
                      nudgeData.channel === 'whatsapp' ? 'bg-green-50 border-green-200' :
                      nudgeData.channel === 'email' ? 'bg-blue-50 border-blue-200' :
                      'bg-purple-50 border-purple-200'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {getChannelIcon(nudgeData.channel)}
                        <span className="text-sm font-medium capitalize">{nudgeData.channel}</span>
                      </div>
                      
                      {nudgeData.channel === 'whatsapp' && (
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-sm">{preview.text}</p>
                          <div className="mt-2 text-xs text-gray-500">
                            Preview: {preview.preview}
                          </div>
                        </div>
                      )}
                      
                      {nudgeData.channel === 'email' && (
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="border-b pb-2 mb-2">
                            <div className="text-xs text-gray-500">Subject:</div>
                            <div className="text-sm font-medium">{preview.preview}</div>
                          </div>
                          <div className="text-sm">{preview.text}</div>
                        </div>
                      )}
                      
                      {nudgeData.channel === 'push' && (
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="text-sm font-medium">{preview.preview}</div>
                          <div className="text-xs text-gray-600 mt-1">{preview.text}</div>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Tone:</span> {preview.tone_tag}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Generate a preview to see your nudge</p>
                  </div>
                )}
              </div>

              {/* Test Send */}
              {preview && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Test</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Recipient ({nudgeData.channel === 'whatsapp' ? 'Phone' : nudgeData.channel === 'email' ? 'Email' : 'User ID'})
                      </label>
                      <input
                        type="text"
                        value={testRecipient}
                        onChange={(e) => setTestRecipient(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder={
                          nudgeData.channel === 'whatsapp' ? '+1234567890' :
                          nudgeData.channel === 'email' ? 'test@example.com' :
                          'user123'
                        }
                      />
                    </div>
                    <button
                      onClick={sendTest}
                      disabled={!testRecipient}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Send Test
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Student Support Tab - Original Content */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI Counselor - Personal Support
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized support for your academic journey, career guidance, and personal development. 
                Our AI counselor is here to help with study planning, motivation, and goal setting.
              </p>
            </div>

            {/* Support Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="feature-card text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Emotional Support</h3>
                <p className="text-xs text-gray-600">Get help managing stress and anxiety</p>
              </div>

              <div className="feature-card text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Study Planning</h3>
                <p className="text-xs text-gray-600">Create effective study schedules</p>
              </div>

              <div className="feature-card text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Goal Setting</h3>
                <p className="text-xs text-gray-600">Define and achieve your objectives</p>
              </div>

              <div className="feature-card text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Career Guidance</h3>
                <p className="text-xs text-gray-600">Explore career paths and opportunities</p>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important Notice
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      This AI counselor provides general guidance and support. For serious mental health concerns, 
                      please consult with a qualified professional counselor or therapist.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Widget Container */}
            <div className="max-w-4xl mx-auto">
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
        )}
      </div>
    </div>
  )
}

export default Counselor
