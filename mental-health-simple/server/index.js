import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/database.js'

// Import routes
import moodEntriesRouter from './routes/moodEntries.js'
import journalEntriesRouter from './routes/journalEntries.js'
import assessmentsRouter from './routes/assessments.js'
import meditationRouter from './routes/meditation.js'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectToDatabase().catch(console.error)

// Routes
app.use('/api/mood-entries', moodEntriesRouter)
app.use('/api/journal-entries', journalEntriesRouter)
app.use('/api/assessments', assessmentsRouter)
app.use('/api/meditation', meditationRouter)
app.use('/api/chat', chatRouter)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Mental Health App API is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err)
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'API endpoint not found' 
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Mental Health App API running on port ${PORT}`)
  console.log(`📊 MongoDB: mongodb://localhost:27017/mindful_db`)
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`)
})
