import express from 'express'
import { ObjectId } from 'mongodb'
import { getDatabase } from '../config/database.js'
import { createAssessmentResult, validateAssessmentResult } from '../models/AssessmentResult.js'

const router = express.Router()

// Get all assessment results for a user
router.get('/:userId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { limit = 50, offset = 0, assessmentId } = req.query
    
    let query = { userId }
    if (assessmentId) {
      query.assessmentId = assessmentId
    }
    
    const results = await db.collection('assessmentResults')
      .find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .toArray()
    
    res.json({ success: true, data: results })
  } catch (error) {
    console.error('Error fetching assessment results:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch assessment results' })
  }
})

// Create a new assessment result
router.post('/', async (req, res) => {
  try {
    const db = getDatabase()
    const assessmentData = req.body
    
    const validation = validateAssessmentResult(assessmentData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed', 
        details: validation.errors 
      })
    }
    
    const assessmentResult = createAssessmentResult(assessmentData)
    const result = await db.collection('assessmentResults').insertOne(assessmentResult)
    
    res.status(201).json({ 
      success: true, 
      data: { ...assessmentResult, _id: result.insertedId } 
    })
  } catch (error) {
    console.error('Error creating assessment result:', error)
    res.status(500).json({ success: false, error: 'Failed to create assessment result' })
  }
})

// Get assessment statistics
router.get('/:userId/stats', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId } = req.params
    const { days = 90 } = req.query
    
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
          _id: '$assessmentId',
          assessmentTitle: { $first: '$assessmentTitle' },
          latestScore: { $first: '$score' },
          averageScore: { $avg: '$score' },
          totalAssessments: { $sum: 1 },
          latestDate: { $max: '$date' }
        }
      },
      {
        $sort: { latestDate: -1 }
      }
    ]
    
    const stats = await db.collection('assessmentResults').aggregate(pipeline).toArray()
    
    res.json({ success: true, data: stats })
  } catch (error) {
    console.error('Error fetching assessment stats:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch assessment statistics' })
  }
})

// Get progress over time for a specific assessment
router.get('/:userId/progress/:assessmentId', async (req, res) => {
  try {
    const db = getDatabase()
    const { userId, assessmentId } = req.params
    const { days = 90 } = req.query
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(days))
    
    const results = await db.collection('assessmentResults')
      .find({
        userId,
        assessmentId,
        date: { $gte: startDate }
      })
      .sort({ date: 1 })
      .toArray()
    
    res.json({ success: true, data: results })
  } catch (error) {
    console.error('Error fetching assessment progress:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch assessment progress' })
  }
})

export default router
