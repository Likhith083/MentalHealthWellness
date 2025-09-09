import express from 'express'
import { getDatabase } from '../config/database.js'
import { createChatMessage, validateChatMessage } from '../models/ChatMessage.js'

const router = express.Router()

// Get chat history for a user
router.get('/:userId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { limit = 100, offset = 0, sessionId } = req.query
    
    let query = { userId }
    if (sessionId) {
      query.sessionId = sessionId
    }
    
    const messages = await db.collection('chatMessages')
      .find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .toArray()
    
    res.json({ success: true, data: messages.reverse() }) // reverse to get chronological order
  } catch (error) {
    console.error('Error fetching chat messages:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch chat messages' })
  }
})

// Create a new chat message
router.post('/', async (req, res) => {
  try {
    const db = getDatabase()
    const messageData = req.body
    
    const validation = validateChatMessage(messageData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const chatMessage = createChatMessage(messageData)
    const result = await db.collection('chatMessages').insertOne(chatMessage)
    
    res.status(201).json({ 
      success: true, 
      data: { ...chatMessage, _id: result.insertedId } 
    })
  } catch (error) {
    console.error('Error creating chat message:', error)
    res.status(500).json({ success: false, error: 'Failed to create chat message' })
  }
})

// Get chat sessions for a user
router.get('/:userId/sessions', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    
    const pipeline = [
      {
        $match: { userId }
      },
      {
        $group: {
          _id: '$sessionId',
          lastMessage: { $last: '$timestamp' },
          messageCount: { $sum: 1 },
          firstMessage: { $first: '$timestamp' }
        }
      },
      {
        $sort: { lastMessage: -1 }
      }
    ]
    
    const sessions = await db.collection('chatMessages').aggregate(pipeline).toArray()
    
    res.json({ success: true, data: sessions })
  } catch (error) {
    console.error('Error fetching chat sessions:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch chat sessions' })
  }
})

// Clear chat history for a user
router.delete('/:userId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    
    const result = await db.collection('chatMessages').deleteMany({ userId })
    
    res.json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} messages`,
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error('Error clearing chat history:', error)
    res.status(500).json({ success: false, error: 'Failed to clear chat history' })
  }
})

// Clear specific chat session
router.delete('/:userId/session/:sessionId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId, sessionId } = req.params
    
    const result = await db.collection('chatMessages').deleteMany({ 
      userId, 
      sessionId 
    })
    
    res.json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} messages from session`,
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error('Error clearing chat session:', error)
    res.status(500).json({ success: false, error: 'Failed to clear chat session' })
  }
})

export default router
