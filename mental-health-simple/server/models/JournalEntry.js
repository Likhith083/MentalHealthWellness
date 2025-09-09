// Journal Entry Schema
export const createJournalEntry = (data) => {
  return {
    userId: data.userId || 'anonymous',
    title: data.title || 'Untitled Entry',
    content: data.content,
    prompt: data.prompt || null, // journal prompt used
    mood: data.mood || null, // associated mood
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
  
  if (data.title && typeof data.title !== 'string') {
    errors.push('Title must be a string')
  }
  
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
