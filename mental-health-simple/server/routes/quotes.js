import express from 'express'
const router = express.Router()

// Get daily quote from ZenQuotes API
router.get('/daily', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/today')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data && data.length > 0) {
      res.json({
        success: true,
        data: data[0]
      })
    } else {
      throw new Error('No quote data received')
    }
  } catch (error) {
    console.error('Error fetching quote:', error)
    
    // Return fallback quote
    res.json({
      success: true,
      data: {
        q: "The present moment is the only time over which we have dominion.",
        a: "Thích Nhất Hạnh",
        h: "<blockquote>&ldquo;The present moment is the only time over which we have dominion.&rdquo; &mdash; <footer>Thích Nhất Hạnh</footer></blockquote>"
      }
    })
  }
})

// Get random quote from ZenQuotes API
router.get('/random', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data && data.length > 0) {
      res.json({
        success: true,
        data: data[0]
      })
    } else {
      throw new Error('No quote data received')
    }
  } catch (error) {
    console.error('Error fetching random quote:', error)
    
    // Return fallback quote
    res.json({
      success: true,
      data: {
        q: "The only way to do great work is to love what you do.",
        a: "Steve Jobs",
        h: "<blockquote>&ldquo;The only way to do great work is to love what you do.&rdquo; &mdash; <footer>Steve Jobs</footer></blockquote>"
      }
    })
  }
})

export default router
