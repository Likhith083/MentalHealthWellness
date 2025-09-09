// Simple in-memory rate limiter
const requests = new Map()

const rateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean up old entries
    if (requests.has(clientId)) {
      const clientRequests = requests.get(clientId).filter(time => time > windowStart)
      requests.set(clientId, clientRequests)
    } else {
      requests.set(clientId, [])
    }

    const clientRequests = requests.get(clientId)

    if (clientRequests.length >= max) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests, please try again later',
        retryAfter: Math.ceil(windowMs / 1000)
      })
    }

    // Add current request
    clientRequests.push(now)
    requests.set(clientId, clientRequests)

    next()
  }
}

export default rateLimiter
