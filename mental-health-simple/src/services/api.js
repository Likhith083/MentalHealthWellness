const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      // Handle non-JSON responses
      let data
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = { message: await response.text() }
      }

      if (!response.ok) {
        const error = new Error(data.error || data.message || `HTTP error! status: ${response.status}`)
        error.status = response.status
        error.data = data
        throw error
      }

      return data
    } catch (error) {
      // Network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        const networkError = new Error('Unable to connect to the server. Please check your internet connection and try again.')
        networkError.type = 'NETWORK_ERROR'
        throw networkError
      }
      
      console.error('API request failed:', error)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // Mood Entries
  async getMoodEntries(userId, limit = 50, offset = 0) {
    return this.request(`/mood-entries/${userId}?limit=${limit}&offset=${offset}`)
  }

  async createMoodEntry(moodData) {
    return this.request('/mood-entries', {
      method: 'POST',
      body: JSON.stringify(moodData),
    })
  }

  async updateMoodEntry(id, moodData) {
    return this.request(`/mood-entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moodData),
    })
  }

  async deleteMoodEntry(id) {
    return this.request(`/mood-entries/${id}`, {
      method: 'DELETE',
    })
  }

  async getMoodStats(userId, days = 30) {
    return this.request(`/mood-entries/${userId}/stats?days=${days}`)
  }

  // Journal Entries
  async getJournalEntries(userId, limit = 50, offset = 0, category = 'All') {
    return this.request(`/journal-entries/${userId}?limit=${limit}&offset=${offset}&category=${category}`)
  }

  async createJournalEntry(journalData) {
    return this.request('/journal-entries', {
      method: 'POST',
      body: JSON.stringify(journalData),
    })
  }

  async updateJournalEntry(id, journalData) {
    return this.request(`/journal-entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(journalData),
    })
  }

  async deleteJournalEntry(id) {
    return this.request(`/journal-entries/${id}`, {
      method: 'DELETE',
    })
  }

  async searchJournalEntries(userId, query, limit = 20) {
    return this.request(`/journal-entries/${userId}/search?q=${encodeURIComponent(query)}&limit=${limit}`)
  }

  // Assessments
  async getAssessmentResults(userId, limit = 50, offset = 0, assessmentId = null) {
    const params = new URLSearchParams({ limit, offset })
    if (assessmentId) params.append('assessmentId', assessmentId)
    return this.request(`/assessments/${userId}?${params}`)
  }

  async createAssessmentResult(assessmentData) {
    return this.request('/assessments', {
      method: 'POST',
      body: JSON.stringify(assessmentData),
    })
  }

  async getAssessmentStats(userId, days = 90) {
    return this.request(`/assessments/${userId}/stats?days=${days}`)
  }

  async getAssessmentProgress(userId, assessmentId, days = 90) {
    return this.request(`/assessments/${userId}/progress/${assessmentId}?days=${days}`)
  }

  // Meditation
  async getMeditationSessions(userId, limit = 50, offset = 0, category = 'All') {
    return this.request(`/meditation/${userId}?limit=${limit}&offset=${offset}&category=${category}`)
  }

  async createMeditationSession(sessionData) {
    return this.request('/meditation', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    })
  }

  async updateMeditationSession(id, sessionData) {
    return this.request(`/meditation/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sessionData),
    })
  }

  async getMeditationStats(userId, days = 30) {
    return this.request(`/meditation/${userId}/stats?days=${days}`)
  }

  async getCompletedSessions(userId) {
    return this.request(`/meditation/${userId}/completed`)
  }

  // Chat
  async getChatMessages(userId, limit = 100, offset = 0, sessionId = null) {
    const params = new URLSearchParams({ limit, offset })
    if (sessionId) params.append('sessionId', sessionId)
    return this.request(`/chat/${userId}?${params}`)
  }

  async createChatMessage(messageData) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify(messageData),
    })
  }

  async getChatSessions(userId) {
    return this.request(`/chat/${userId}/sessions`)
  }

  async clearChatHistory(userId) {
    return this.request(`/chat/${userId}`, {
      method: 'DELETE',
    })
  }

  async clearChatSession(userId, sessionId) {
    return this.request(`/chat/${userId}/session/${sessionId}`, {
      method: 'DELETE',
    })
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService
