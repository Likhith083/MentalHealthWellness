import express from 'express'
import { ObjectId } from 'mongodb'
import { getDatabase } from '../config/database.js'
import { createJournalEntry, validateJournalEntry } from '../models/JournalEntry.js'

const router = express.Router()

// Get all journal entries for a user
router.get('/:userId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { limit = 50, offset = 0, category } = req.query
    
    let query = { userId }
    if (category && category !== 'All') {
      query['prompt.category'] = category
    }
    
    const entries = await db.collection('journalEntries')
      .find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .toArray()
    
    res.json({ success: true, data: entries })
  } catch (error) {
    console.error('Error fetching journal entries:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch journal entries' })
  }
})

// Create a new journal entry
router.post('/', async (req, res) => {
  try {
    const db = getDatabase()
    const journalData = req.body
    
    const validation = validateJournalEntry(journalData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const journalEntry = createJournalEntry(journalData)
    const result = await db.collection('journalEntries').insertOne(journalEntry)
    
    res.status(201).json({ 
      success: true, 
      data: { ...journalEntry, _id: result.insertedId } 
    })
  } catch (error) {
    console.error('Error creating journal entry:', error)
    res.status(500).json({ success: false, error: 'Failed to create journal entry' })
  }
})

// Update a journal entry
router.put('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    const updateData = req.body
    
    const validation = validateJournalEntry(updateData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const result = await db.collection('journalEntries').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    )
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Journal entry not found' })
    }
    
    res.json({ success: true, data: { id, ...updateData } })
  } catch (error) {
    console.error('Error updating journal entry:', error)
    res.status(500).json({ success: false, error: 'Failed to update journal entry' })
  }
})

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    
    const result = await db.collection('journalEntries').deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Journal entry not found' })
    }
    
    res.json({ success: true, message: 'Journal entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting journal entry:', error)
    res.status(500).json({ success: false, error: 'Failed to delete journal entry' })
  }
})

// Search journal entries
router.get('/:userId/search', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { q, limit = 20 } = req.query
    
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query is required' })
    }
    
    const entries = await db.collection('journalEntries')
      .find({
        userId,
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { content: { $regex: q, $options: 'i' } }
        ]
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .toArray()
    
    res.json({ success: true, data: entries })
  } catch (error) {
    console.error('Error searching journal entries:', error)
    res.status(500).json({ success: false, error: 'Failed to search journal entries' })
  }
})

// Get journal statistics
router.get('/:userId/stats', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { days = 30 } = req.query
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(days))
    
    // Get total entries count
    const totalEntries = await db.collection('journalEntries').countDocuments({ userId })
    
    // Get average mood
    const moodEntries = await db.collection('journalEntries')
      .find({ userId, mood: { $exists: true, $ne: null } })
      .toArray()
    
    const averageMood = moodEntries.length > 0 
      ? moodEntries.reduce((sum, entry) => sum + (entry.mood || 0), 0) / moodEntries.length 
      : 0
    
    // Get most used template
    const templateCounts = await db.collection('journalEntries')
      .aggregate([
        { $match: { userId, 'template.title': { $exists: true } } },
        { $group: { _id: '$template.title', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ])
      .toArray()
    
    const mostUsedTemplate = templateCounts.length > 0 ? templateCounts[0]._id : ''
    
    // Get recent mood trend (last 7 days)
    const recentMoodTrend = await db.collection('journalEntries')
      .find({
        userId,
        mood: { $exists: true, $ne: null },
        date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      })
      .sort({ date: 1 })
      .toArray()
    
    const moodTrend = recentMoodTrend.map(entry => ({
      date: entry.date,
      mood: entry.mood,
      moodEmoji: entry.moodEmoji
    }))
    
    res.json({
      success: true,
      data: {
        totalEntries,
        averageMood: Math.round(averageMood * 10) / 10,
        mostUsedTemplate,
        recentMoodTrend: moodTrend
      }
    })
  } catch (error) {
    console.error('Error fetching journal stats:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch journal statistics' })
  }
})

export default router
