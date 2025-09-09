import express from 'express'
import { getDatabase } from '../config/database.js'
import { createMeditationSession, validateMeditationSession } from '../models/MeditationSession.js'

const router = express.Router()

// Get all meditation sessions for a user
router.get('/:userId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { limit = 50, offset = 0, category } = req.query
    
    let query = { userId }
    if (category && category !== 'All') {
      query.category = category
    }
    
    const sessions = await db.collection('meditationSessions')
      .find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .toArray()
    
    res.json({ success: true, data: sessions })
  } catch (error) {
    console.error('Error fetching meditation sessions:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch meditation sessions' })
  }
})

// Create a new meditation session
router.post('/', async (req, res) => {
  try {
    const db = getDatabase()
    const sessionData = req.body
    
    const validation = validateMeditationSession(sessionData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const meditationSession = createMeditationSession(sessionData)
    const result = await db.collection('meditationSessions').insertOne(meditationSession)
    
    res.status(201).json({ 
      success: true, 
      data: { ...meditationSession, _id: result.insertedId } 
    })
  } catch (error) {
    console.error('Error creating meditation session:', error)
    res.status(500).json({ success: false, error: 'Failed to create meditation session' })
  }
})

// Update a meditation session (for completion, rating, etc.)
router.put('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    const updateData = req.body
    
    const validation = validateMeditationSession(updateData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const result = await db.collection('meditationSessions').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    )
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Meditation session not found' })
    }
    
    res.json({ success: true, data: { id, ...updateData } })
  } catch (error) {
    console.error('Error updating meditation session:', error)
    res.status(500).json({ success: false, error: 'Failed to update meditation session' })
  }
})

// Get meditation statistics
router.get('/:userId/stats', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { days = 30 } = req.query
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(days))
    
    const pipeline = [
      {
        $match: {
          userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalDuration: { $sum: '$completedDuration' },
          averageDuration: { $avg: '$completedDuration' },
          averageRating: { $avg: '$rating' },
          categories: { $addToSet: '$category' }
        }
      }
    ]
    
    const stats = await db.collection('meditationSessions').aggregate(pipeline).toArray()
    
    res.json({ 
      success: true, 
      data: stats[0] || { 
        totalSessions: 0, 
        totalDuration: 0, 
        averageDuration: 0, 
        averageRating: 0, 
        categories: [] 
      } 
    })
  } catch (error) {
    console.error('Error fetching meditation stats:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch meditation statistics' })
  }
})

// Get completed sessions by category
router.get('/:userId/completed', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    
    const completedSessions = await db.collection('meditationSessions')
      .find({ 
        userId,
        completedDuration: { $gt: 0 }
      })
      .sort({ date: -1 })
      .toArray()
    
    res.json({ success: true, data: completedSessions })
  } catch (error) {
    console.error('Error fetching completed sessions:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch completed sessions' })
  }
})

export default router
