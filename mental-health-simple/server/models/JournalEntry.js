// Journal Entry Schema
export const createJournalEntry = (data) => {
  return {
    userId: data.userId || 'anonymous',
    title: data.title || 'Untitled Entry',
    content: data.content,
    template: data.template || null, // journal template used
    prompt: data.prompt || null, // legacy support
    mood: data.mood || null, // associated mood (1-5 scale)
    moodEmoji: data.moodEmoji || null, // mood emoji representation
    tags: data.tags || [],
    isPrivate: data.isPrivate !== false, // default to private
    date: data.date || new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const validateJournalEntry = (data) => {
  const errors = []
  
  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required')
  }
  
  if (data.content && data.content.length > 10000) {
    errors.push('Content must be less than 10,000 characters')
  }
  
  if (data.title && typeof data.title !== 'string') {
    errors.push('Title must be a string')
  }
  
  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }
  
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array')
  }
  
  if (data.tags && data.tags.length > 10) {
    errors.push('Maximum 10 tags allowed')
  }
  
  if (data.tags && data.tags.some(tag => typeof tag !== 'string' || tag.length > 50)) {
    errors.push('Each tag must be a string with less than 50 characters')
  }
  
  if (data.mood && (typeof data.mood !== 'number' || data.mood < 1 || data.mood > 5)) {
    errors.push('Mood must be a number between 1 and 5')
  }
  
  if (data.moodEmoji && typeof data.moodEmoji !== 'string') {
    errors.push('Mood emoji must be a string')
  }
  
  if (data.template && typeof data.template !== 'object') {
    errors.push('Template must be an object')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
