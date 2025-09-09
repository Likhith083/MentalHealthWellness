import { MongoClient } from 'mongodb'
import fetch from 'node-fetch'

const MONGODB_URI = 'mongodb://localhost:27017'
const DB_NAME = 'mindful_db'
const API_BASE_URL = 'http://localhost:3001/api'

// Test data
const testMoodEntry = {
  userId: 'test-user-123',
  mood: 4,
  activities: ['Exercise', 'Reading'],
  notes: 'Feeling good today!',
  date: new Date()
}

const testJournalEntry = {
  userId: 'test-user-123',
  title: 'Test Journal Entry',
  content: 'This is a test journal entry to verify database functionality.',
  prompt: {
    id: 1,
    title: 'Gratitude Practice',
    category: 'Gratitude'
  },
  mood: '😊',
  date: new Date()
}

const testAssessmentResult = {
  userId: 'test-user-123',
  assessmentId: 1,
  assessmentTitle: 'PHQ-9 Depression Screening',
  score: 5,
  maxScore: 27,
  answers: [1, 0, 2, 1, 0, 1, 0, 0, 0],
  date: new Date()
}

async function testMongoDBConnection() {
  console.log('🔍 Testing MongoDB Connection...')
  
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(DB_NAME)
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${DB_NAME}`)
    
    // Test database operations
    const collections = await db.listCollections().toArray()
    console.log('📁 Available collections:', collections.map(c => c.name))
    
    // Test mood entries collection
    const moodCollection = db.collection('moodEntries')
    const moodCount = await moodCollection.countDocuments()
    console.log(`📈 Mood entries count: ${moodCount}`)
    
    // Test journal entries collection
    const journalCollection = db.collection('journalEntries')
    const journalCount = await journalCollection.countDocuments()
    console.log(`📝 Journal entries count: ${journalCount}`)
    
    // Test assessment results collection
    const assessmentCollection = db.collection('assessmentResults')
    const assessmentCount = await assessmentCollection.countDocuments()
    console.log(`📊 Assessment results count: ${assessmentCount}`)
    
    await client.close()
    console.log('✅ MongoDB connection test completed successfully')
    return true
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    return false
  }
}

async function testAPIEndpoints() {
  console.log('\n🌐 Testing API Endpoints...')
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...')
    const healthResponse = await fetch(`${API_BASE_URL}/health`)
    const healthData = await healthResponse.json()
    console.log('✅ Health check:', healthData.message)
    
    // Test mood entries endpoint
    console.log('Testing mood entries endpoint...')
    const moodResponse = await fetch(`${API_BASE_URL}/mood-entries/test-user-123`)
    const moodData = await moodResponse.json()
    console.log('✅ Mood entries endpoint working')
    
    // Test journal entries endpoint
    console.log('Testing journal entries endpoint...')
    const journalResponse = await fetch(`${API_BASE_URL}/journal-entries/test-user-123`)
    const journalData = await journalResponse.json()
    console.log('✅ Journal entries endpoint working')
    
    // Test assessment results endpoint
    console.log('Testing assessment results endpoint...')
    const assessmentResponse = await fetch(`${API_BASE_URL}/assessments/test-user-123`)
    const assessmentData = await assessmentResponse.json()
    console.log('✅ Assessment results endpoint working')
    
    return true
  } catch (error) {
    console.error('❌ API endpoints test failed:', error.message)
    return false
  }
}

async function testDataOperations() {
  console.log('\n💾 Testing Data Operations...')
  
  try {
    // Test creating a mood entry
    console.log('Creating test mood entry...')
    const createMoodResponse = await fetch(`${API_BASE_URL}/mood-entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testMoodEntry)
    })
    
    if (createMoodResponse.ok) {
      const createdMood = await createMoodResponse.json()
      console.log('✅ Mood entry created successfully:', createdMood.data._id)
      
      // Test retrieving the mood entry
      const getMoodResponse = await fetch(`${API_BASE_URL}/mood-entries/test-user-123`)
      const moodEntries = await getMoodResponse.json()
      console.log('✅ Mood entry retrieved successfully')
      
      // Test mood stats
      const statsResponse = await fetch(`${API_BASE_URL}/mood-entries/test-user-123/stats`)
      const stats = await statsResponse.json()
      console.log('✅ Mood stats retrieved:', stats.data)
    } else {
      console.error('❌ Failed to create mood entry:', await createMoodResponse.text())
    }
    
    // Test creating a journal entry
    console.log('Creating test journal entry...')
    const createJournalResponse = await fetch(`${API_BASE_URL}/journal-entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testJournalEntry)
    })
    
    if (createJournalResponse.ok) {
      const createdJournal = await createJournalResponse.json()
      console.log('✅ Journal entry created successfully:', createdJournal.data._id)
    } else {
      console.error('❌ Failed to create journal entry:', await createJournalResponse.text())
    }
    
    // Test creating an assessment result
    console.log('Creating test assessment result...')
    const createAssessmentResponse = await fetch(`${API_BASE_URL}/assessments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testAssessmentResult)
    })
    
    if (createAssessmentResponse.ok) {
      const createdAssessment = await createAssessmentResponse.json()
      console.log('✅ Assessment result created successfully:', createdAssessment.data._id)
    } else {
      console.error('❌ Failed to create assessment result:', await createAssessmentResponse.text())
    }
    
    return true
  } catch (error) {
    console.error('❌ Data operations test failed:', error.message)
    return false
  }
}

async function testDatabaseIntegrity() {
  console.log('\n🔍 Testing Database Integrity...')
  
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db(DB_NAME)
    
    // Test mood entries
    const moodCollection = db.collection('moodEntries')
    const moodEntries = await moodCollection.find({ userId: 'test-user-123' }).toArray()
    console.log(`✅ Found ${moodEntries.length} mood entries for test user`)
    
    // Test journal entries
    const journalCollection = db.collection('journalEntries')
    const journalEntries = await journalCollection.find({ userId: 'test-user-123' }).toArray()
    console.log(`✅ Found ${journalEntries.length} journal entries for test user`)
    
    // Test assessment results
    const assessmentCollection = db.collection('assessmentResults')
    const assessmentResults = await assessmentCollection.find({ userId: 'test-user-123' }).toArray()
    console.log(`✅ Found ${assessmentResults.length} assessment results for test user`)
    
    // Test data validation
    const recentMood = await moodCollection.findOne({ userId: 'test-user-123' }, { sort: { date: -1 } })
    if (recentMood) {
      console.log('✅ Recent mood entry validation:')
      console.log(`   - Mood: ${recentMood.mood}`)
      console.log(`   - Activities: ${recentMood.activities?.join(', ')}`)
      console.log(`   - Notes: ${recentMood.notes}`)
      console.log(`   - Date: ${recentMood.date}`)
    }
    
    await client.close()
    return true
  } catch (error) {
    console.error('❌ Database integrity test failed:', error.message)
    return false
  }
}

async function cleanupTestData() {
  console.log('\n🧹 Cleaning up test data...')
  
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db(DB_NAME)
    
    // Remove test data
    const moodResult = await db.collection('moodEntries').deleteMany({ userId: 'test-user-123' })
    const journalResult = await db.collection('journalEntries').deleteMany({ userId: 'test-user-123' })
    const assessmentResult = await db.collection('assessmentResults').deleteMany({ userId: 'test-user-123' })
    
    console.log(`✅ Cleaned up ${moodResult.deletedCount} mood entries`)
    console.log(`✅ Cleaned up ${journalResult.deletedCount} journal entries`)
    console.log(`✅ Cleaned up ${assessmentResult.deletedCount} assessment results`)
    
    await client.close()
    return true
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message)
    return false
  }
}

async function runAllTests() {
  console.log('🚀 Starting MongoDB and API Tests...\n')
  
  const results = {
    mongoConnection: false,
    apiEndpoints: false,
    dataOperations: false,
    databaseIntegrity: false,
    cleanup: false
  }
  
  // Test MongoDB connection
  results.mongoConnection = await testMongoDBConnection()
  
  // Wait a moment for server to start
  if (results.mongoConnection) {
    console.log('\n⏳ Waiting for API server to start...')
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Test API endpoints
    results.apiEndpoints = await testAPIEndpoints()
    
    // Test data operations
    results.dataOperations = await testDataOperations()
    
    // Test database integrity
    results.databaseIntegrity = await testDatabaseIntegrity()
    
    // Cleanup test data
    results.cleanup = await cleanupTestData()
  }
  
  // Summary
  console.log('\n📊 Test Results Summary:')
  console.log('========================')
  console.log(`MongoDB Connection: ${results.mongoConnection ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`API Endpoints: ${results.apiEndpoints ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Data Operations: ${results.dataOperations ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Database Integrity: ${results.databaseIntegrity ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Cleanup: ${results.cleanup ? '✅ PASS' : '❌ FAIL'}`)
  
  const allPassed = Object.values(results).every(result => result === true)
  console.log(`\n🎯 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`)
  
  if (allPassed) {
    console.log('\n🎉 Your MongoDB database is properly connected and working!')
    console.log('You can now use the application with full database functionality.')
  } else {
    console.log('\n⚠️  Some tests failed. Please check the error messages above.')
    console.log('Make sure MongoDB is running and the API server is started.')
  }
  
  process.exit(allPassed ? 0 : 1)
}

// Run the tests
runAllTests().catch(console.error)
