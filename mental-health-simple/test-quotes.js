// Test script for quotes API
import fetch from 'node-fetch'

const API_BASE_URL = 'http://localhost:3001'

async function testQuotesAPI() {
  console.log('🧪 Testing Quotes API...\n')
  
  try {
    // Test health endpoint first
    console.log('1. Testing health endpoint...')
    const healthResponse = await fetch(`${API_BASE_URL}/api/health`)
    const healthData = await healthResponse.json()
    console.log('✅ Health check:', healthData)
    
    // Test daily quote endpoint
    console.log('\n2. Testing daily quote endpoint...')
    const dailyResponse = await fetch(`${API_BASE_URL}/api/quotes/daily`)
    const dailyData = await dailyResponse.json()
    console.log('✅ Daily quote:', dailyData)
    
    // Test random quote endpoint
    console.log('\n3. Testing random quote endpoint...')
    const randomResponse = await fetch(`${API_BASE_URL}/api/quotes/random`)
    const randomData = await randomResponse.json()
    console.log('✅ Random quote:', randomData)
    
    console.log('\n🎉 All tests passed!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testQuotesAPI()
