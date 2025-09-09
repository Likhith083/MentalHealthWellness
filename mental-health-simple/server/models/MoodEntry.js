// Mood Entry Schema
export const createMoodEntry = (data) => {
  return {
    userId: data.userId || 'anonymous',
    mood: data.mood, // 1-5 scale
    activities: data.activities || [], // array of activity strings
    notes: data.notes || '',
    date: data.date || new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const validateMoodEntry = (data) => {
  const errors = []
  
  if (!data.mood || data.mood < 1 || data.mood > 5) {
    errors.push('Mood must be between 1 and 5')
  }
  
  if (data.activities && !Array.isArray(data.activities)) {
    errors.push('Activities must be an array')
  }
  
  if (data.notes && typeof data.notes !== 'string') {
    errors.push('Notes must be a string')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
