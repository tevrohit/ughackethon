import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Ticket {
  id: string
  user_hash: string
  course_id: string
  module_id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  language: string
  assigned_to?: string
  created_at: string
  updated_at: string
  resolved_at?: string
  sla_status: 'on_time' | 'at_risk' | 'overdue'
  sla_due_date: string
  resolution_notes?: string
  comments_count: number
  student_risk_score: number
}

interface Comment {
  id: string
  ticket_id: string
  comment: string
  author: string
  is_internal: boolean
  created_at: string
}

interface StudentProfile {
  user_hash: string
  course_id: string
  risk_score: number
  engagement_level: string
  last_activity: string
  total_tickets: number
  resolved_tickets: number
  avg_resolution_time: number
  preferred_language: string
  learning_progress: number
}

function Mentor() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    sla_filter: '',
    language: '',
    status: '',
    priority: '',
    assigned_to: ''
  })
  const [newComment, setNewComment] = useState('')
  const [assignTo, setAssignTo] = useState('')
  const [resolutionNotes, setResolutionNotes] = useState('')

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })
      
      const response = await fetch(`/api/tickets?${queryParams}`)
      if (response.ok) {
        const data = await response.json()
        setTickets(data)
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch ticket details
  const fetchTicketDetails = async (ticketId: string) => {
    try {
      const [ticketResponse, commentsResponse] = await Promise.all([
        fetch(`/api/tickets/${ticketId}`),
        fetch(`/api/tickets/${ticketId}/comments`)
      ])
      
      if (ticketResponse.ok && commentsResponse.ok) {
        const ticketData = await ticketResponse.json()
        const commentsData = await commentsResponse.json()
        
        setSelectedTicket(ticketData)
        setComments(commentsData)
        
        // Fetch student profile
        const profileResponse = await fetch(`/api/students/${ticketData.user_hash}/profile?course_id=${ticketData.course_id}`)
        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          setStudentProfile(profileData)
        }
      }
    } catch (error) {
      console.error('Error fetching ticket details:', error)
    }
  }

  // Handle ticket assignment
  const handleAssignTicket = async () => {
    if (!selectedTicket || !assignTo) return
    
    try {
      const response = await fetch(`/api/tickets/${selectedTicket.id}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assigned_to: assignTo,
          notes: `Assigned by mentor console`
        })
      })
      
      if (response.ok) {
        const updatedTicket = await response.json()
        setSelectedTicket(updatedTicket)
        setAssignTo('')
        fetchTickets() // Refresh list
      }
    } catch (error) {
      console.error('Error assigning ticket:', error)
    }
  }

  // Handle ticket resolution
  const handleResolveTicket = async () => {
    if (!selectedTicket || !resolutionNotes) return
    
    try {
      const response = await fetch(`/api/tickets/${selectedTicket.id}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resolution_notes: resolutionNotes,
          resolved_by: 'mentor'
        })
      })
      
      if (response.ok) {
        const updatedTicket = await response.json()
        setSelectedTicket(updatedTicket)
        setResolutionNotes('')
        fetchTickets() // Refresh list
      }
    } catch (error) {
      console.error('Error resolving ticket:', error)
    }
  }

  // Handle adding comment
  const handleAddComment = async () => {
    if (!selectedTicket || !newComment) return
    
    try {
      const response = await fetch(`/api/tickets/${selectedTicket.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: newComment,
          author: 'mentor',
          is_internal: false
        })
      })
      
      if (response.ok) {
        const newCommentData = await response.json()
        setComments([...comments, newCommentData])
        setNewComment('')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [filters])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSLAColor = (sla: string) => {
    switch (sla) {
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'at_risk': return 'bg-yellow-100 text-yellow-800'
      case 'on_time': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="min-h-screen gradient-green">
      {/* Navigation Header */}
      <nav className="nav-header shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Mentor Console</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors">
                Home
              </Link>
              <Link to="/counselor" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors">
                Counselor
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Tickets Table */}
          <div className={`${selectedTicket ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
            <div className="bg-white rounded-lg shadow-lg">
              {/* Filters */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Tickets</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <select
                    value={filters.sla_filter}
                    onChange={(e) => setFilters({...filters, sla_filter: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All SLA</option>
                    <option value="overdue">Overdue</option>
                    <option value="at_risk">At Risk</option>
                    <option value="on_time">On Time</option>
                  </select>
                  
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                  
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters({...filters, priority: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All Priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  
                  <select
                    value={filters.assigned_to}
                    onChange={(e) => setFilters({...filters, assigned_to: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All Assigned</option>
                    <option value="unassigned">Unassigned</option>
                    <option value="mentor">Mentor</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SLA</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading tickets...</td>
                      </tr>
                    ) : tickets.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No tickets found</td>
                      </tr>
                    ) : (
                      tickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className={`hover:bg-gray-50 cursor-pointer ${selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''}`}
                          onClick={() => fetchTicketDetails(ticket.id)}
                        >
                          <td className="px-4 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                              <div className="text-sm text-gray-500">{ticket.id} • {ticket.course_id}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSLAColor(ticket.sla_status)}`}>
                              {ticket.sla_status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-sm font-semibold ${getRiskColor(ticket.student_risk_score)}`}>
                              {ticket.student_risk_score}%
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-900 capitalize">{ticket.status.replace('_', ' ')}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ticket Detail Panel */}
          {selectedTicket && (
            <div className="w-1/2 bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedTicket.title}</h3>
                    <p className="text-sm text-gray-500">{selectedTicket.id} • Created {new Date(selectedTicket.created_at).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSLAColor(selectedTicket.sla_status)}`}>
                      {selectedTicket.sla_status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Course: {selectedTicket.course_id}</p>
                    <p className="text-sm text-gray-500">Module: {selectedTicket.module_id}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto max-h-96 p-6">
                {/* Student 360 Profile */}
                {studentProfile && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Student 360</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Risk Score:</span>
                        <span className={`ml-2 font-semibold ${getRiskColor(studentProfile.risk_score)}`}>
                          {studentProfile.risk_score}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Engagement:</span>
                        <span className="ml-2 capitalize">{studentProfile.engagement_level}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Progress:</span>
                        <span className="ml-2">{Math.round(studentProfile.learning_progress * 100)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Tickets:</span>
                        <span className="ml-2">{studentProfile.total_tickets}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-700">{selectedTicket.description}</p>
                </div>

                {/* Comments Thread */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Conversation ({comments.length})</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {comments.map((comment) => (
                      <div key={comment.id} className={`p-3 rounded-lg ${comment.is_internal ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.comment}</p>
                        {comment.is_internal && <span className="text-xs text-yellow-600">Internal Note</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Comment */}
                <div className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    rows={3}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Add Comment
                  </button>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  {/* Assignment */}
                  {selectedTicket.status !== 'resolved' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={assignTo}
                          onChange={(e) => setAssignTo(e.target.value)}
                          placeholder="Enter mentor name"
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <button
                          onClick={handleAssignTicket}
                          disabled={!assignTo}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:bg-gray-300"
                        >
                          Assign
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Resolution */}
                  {selectedTicket.status !== 'resolved' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Notes</label>
                      <div className="space-y-2">
                        <textarea
                          value={resolutionNotes}
                          onChange={(e) => setResolutionNotes(e.target.value)}
                          placeholder="Enter resolution details..."
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          rows={3}
                        />
                        <button
                          onClick={handleResolveTicket}
                          disabled={!resolutionNotes}
                          className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 disabled:bg-gray-300"
                        >
                          Resolve Ticket
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mentor
