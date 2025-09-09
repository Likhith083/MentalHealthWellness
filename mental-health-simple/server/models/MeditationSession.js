// Meditation Session Schema
export const createMeditationSession = (data) => {
  return {
    userId: data.userId || 'anonymous',
    sessionId: data.sessionId, // reference to meditation session
    sessionTitle: data.sessionTitle,
    duration: data.duration, // in seconds
    completedDuration: data.completedDuration || 0, // how much was completed
    category: data.category || 'General',
    difficulty: data.difficulty || 'Beginner',
    rating: data.rating || null, // user rating 1-5
    notes: data.notes || '',
    date: data.date || new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const validateMeditationSession = (data) => {
  const errors = []
  
  if (!data.sessionId || !data.sessionTitle) {
    errors.push('Session ID and title are required')
  }
  
  if (typeof data.duration !== 'number' || data.duration <= 0) {
    errors.push('Duration must be a positive number')
  }
  
  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    errors.push('Rating must be between 1 and 5')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
