import { MongoClient } from 'mongodb'

const MONGODB_URI = 'mongodb://localhost:27017'
const DB_NAME = 'mindful_db'

async function testMongoDBConnection() {
  console.log('🔍 Testing MongoDB Connection...')
  console.log(`📡 Attempting to connect to: ${MONGODB_URI}`)
  
  let client = null
  
  try {
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 5000
    })
    
    console.log('⏳ Connecting to MongoDB...')
    await client.connect()
    
    console.log('✅ Successfully connected to MongoDB!')
    
    // Test database access
    const db = client.db(DB_NAME)
    console.log(`📊 Database: ${DB_NAME}`)
    
    // List collections
    const collections = await db.listCollections().toArray()
    console.log('📁 Available collections:')
    if (collections.length === 0) {
      console.log('   (No collections found - this is normal for a new database)')
    } else {
      collections.forEach(collection => {
        console.log(`   - ${collection.name}`)
      })
    }
    
    // Test basic operations
    console.log('\n🧪 Testing basic database operations...')
    
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
    
    // Test inserting a sample document
    console.log('\n💾 Testing document insertion...')
    const testDoc = {
      userId: 'test-connection',
      test: true,
      timestamp: new Date()
    }
    
    const insertResult = await moodCollection.insertOne(testDoc)
    console.log(`✅ Test document inserted with ID: ${insertResult.insertedId}`)
    
    // Test retrieving the document
    const retrievedDoc = await moodCollection.findOne({ _id: insertResult.insertedId })
    console.log('✅ Test document retrieved successfully')
    
    // Clean up test document
    await moodCollection.deleteOne({ _id: insertResult.insertedId })
    console.log('✅ Test document cleaned up')
    
    console.log('\n🎉 MongoDB connection test completed successfully!')
    console.log('✅ Database is properly connected and working')
    
    return true
    
  } catch (error) {
    console.error('❌ MongoDB connection failed!')
    console.error('Error details:', error.message)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:')
      console.log('1. Make sure MongoDB is installed and running')
      console.log('2. Check if MongoDB service is started')
      console.log('3. Verify MongoDB is listening on port 27017')
      console.log('4. Try starting MongoDB manually: mongod')
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 Connection timeout - MongoDB might be starting up')
      console.log('Try running this test again in a few seconds')
    }
    
    return false
  } finally {
    if (client) {
      try {
        await client.close()
        console.log('🔌 MongoDB connection closed')
      } catch (closeError) {
        console.error('Error closing connection:', closeError.message)
      }
    }
  }
}

async function testAPIConnection() {
  console.log('\n🌐 Testing API Server Connection...')
  
  try {
    const response = await fetch('http://localhost:3001/api/health')
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ API server is running')
      console.log(`📡 Response: ${data.message}`)
      return true
    } else {
      console.error(`❌ API server returned status: ${response.status}`)
      return false
    }
  } catch (error) {
    console.error('❌ API server connection failed!')
    console.error('Error details:', error.message)
    
    console.log('\n💡 Troubleshooting tips:')
    console.log('1. Make sure the API server is running: npm run server')
    console.log('2. Check if port 3001 is available')
    console.log('3. Verify the server started without errors')
    
    return false
  }
}

async function runTests() {
  console.log('🚀 Starting Database and API Connection Tests...\n')
  
  const mongoResult = await testMongoDBConnection()
  const apiResult = await testAPIConnection()
  
  console.log('\n📊 Test Results Summary:')
  console.log('========================')
  console.log(`MongoDB Connection: ${mongoResult ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`API Server: ${apiResult ? '✅ PASS' : '❌ FAIL'}`)
  
  if (mongoResult && apiResult) {
    console.log('\n🎉 All tests passed! Your application is ready to use.')
    console.log('You can now start the frontend with: npm run dev')
  } else {
    console.log('\n⚠️  Some tests failed. Please fix the issues above before proceeding.')
    
    if (!mongoResult) {
      console.log('\n🔧 To fix MongoDB issues:')
      console.log('1. Install MongoDB: https://www.mongodb.com/try/download/community')
      console.log('2. Start MongoDB service')
      console.log('3. Or run: mongod (if installed manually)')
    }
    
    if (!apiResult) {
      console.log('\n🔧 To fix API issues:')
      console.log('1. Run: npm run server')
      console.log('2. Check for any error messages')
      console.log('3. Ensure port 3001 is not in use')
    }
  }
  
  process.exit(mongoResult && apiResult ? 0 : 1)
}

// Run the tests
runTests().catch(console.error)
