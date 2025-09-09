import { MongoClient } from 'mongodb'

const MONGODB_URI = 'mongodb://localhost:27017'
const DB_NAME = 'mindful_db'

let client
let db

export const connectToDatabase = async () => {
  try {
    if (client && db) {
      return { client, db }
    }

    client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    db = client.db(DB_NAME)
    
    console.log('✅ Connected to MongoDB successfully')
    console.log(`📊 Database: ${DB_NAME}`)
    
    return { client, db }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.')
  }
  return db
}

export const closeDatabase = async () => {
  if (client) {
    await client.close()
    console.log('🔌 MongoDB connection closed')
  }
}
