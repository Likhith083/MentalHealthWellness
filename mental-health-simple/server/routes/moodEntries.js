import express from 'express'
import { getDatabase } from '../config/database.js'
import { createMoodEntry, validateMoodEntry } from '../models/MoodEntry.js'

const router = express.Router()

// Get all mood entries for a user
router.get('/:userId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { limit = 50, offset = 0 } = req.query
    
    const entries = await db.collection('moodEntries')
      .find({ userId })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .toArray()
    
    res.json({ success: true, data: entries })
  } catch (error) {
    console.error('Error fetching mood entries:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch mood entries' })
  }
})

// Create a new mood entry
router.post('/', async (req, res) => {
  try {
    const db = getDatabase()
    const moodData = req.body
    
    const validation = validateMoodEntry(moodData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const moodEntry = createMoodEntry(moodData)
    const result = await db.collection('moodEntries').insertOne(moodEntry)
    
    res.status(201).json({ 
      success: true, 
      data: { ...moodEntry, _id: result.insertedId } 
    })
  } catch (error) {
    console.error('Error creating mood entry:', error)
    res.status(500).json({ success: false, error: 'Failed to create mood entry' })
  }
})

// Update a mood entry
router.put('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    const updateData = req.body
    
    const validation = validateMoodEntry(updateData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const result = await db.collection('moodEntries').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    )
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Mood entry not found' })
    }
    
    res.json({ success: true, data: { id, ...updateData } })
  } catch (error) {
    console.error('Error updating mood entry:', error)
    res.status(500).json({ success: false, error: 'Failed to update mood entry' })
  }
})

// Delete a mood entry
router.delete('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    
    const result = await db.collection('moodEntries').deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Mood entry not found' })
    }
    
    res.json({ success: true, message: 'Mood entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting mood entry:', error)
    res.status(500).json({ success: false, error: 'Failed to delete mood entry' })
  }
})

// Get mood statistics
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
          averageMood: { $avg: '$mood' },
          totalEntries: { $sum: 1 },
          moodDistribution: {
            $push: '$mood'
          }
        }
      }
    ]
    
    const stats = await db.collection('moodEntries').aggregate(pipeline).toArray()
    
    res.json({ success: true, data: stats[0] || { averageMood: 0, totalEntries: 0, moodDistribution: [] } })
  } catch (error) {
    console.error('Error fetching mood stats:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch mood statistics' })
  }
})

export default router
