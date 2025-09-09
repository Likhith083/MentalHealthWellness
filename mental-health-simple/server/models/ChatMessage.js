// Chat Message Schema
export const createChatMessage = (data) => {
  return {
    userId: data.userId || 'anonymous',
    messageId: data.messageId || Date.now().toString(),
    type: data.type, // 'user' or 'bot'
    content: data.content,
    timestamp: data.timestamp || new Date(),
    sessionId: data.sessionId || null, // group messages by session
    metadata: data.metadata || {}, // additional data like model used
    createdAt: new Date()
  }
}

export const validateChatMessage = (data) => {
  const errors = []
  
  if (!data.type || !['user', 'bot'].includes(data.type)) {
    errors.push('Type must be either "user" or "bot"')
  }
  
  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
