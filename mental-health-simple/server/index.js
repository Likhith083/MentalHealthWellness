import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/database.js'
import rateLimiter from './middleware/rateLimiter.js'
import logger from './middleware/logger.js'

// Import routes
import moodEntriesRouter from './routes/moodEntries.js'
import journalEntriesRouter from './routes/journalEntries.js'
import assessmentsRouter from './routes/assessments.js'
import meditationRouter from './routes/meditation.js'
import chatRouter from './routes/chat.js'
import quotesRouter from './routes/quotes.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(logger)
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting
app.use(rateLimiter(15 * 60 * 1000, 100)) // 100 requests per 15 minutes

// Connect to MongoDB
connectToDatabase().catch(console.error)

// Routes
app.use('/api/mood-entries', moodEntriesRouter)
app.use('/api/journal-entries', journalEntriesRouter)
app.use('/api/assessments', assessmentsRouter)
app.use('/api/meditation', meditationRouter)
app.use('/api/chat', chatRouter)
app.use('/api/quotes', quotesRouter)

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
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'API endpoint not found',
    path: req.originalUrl
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Mental Health App API running on port ${PORT}`)
  console.log(`📊 MongoDB: mongodb://localhost:27017/mindful_db`)
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`)
})
