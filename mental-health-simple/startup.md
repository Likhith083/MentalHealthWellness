# Mental Health App - Startup Guide

This guide contains all the commands and steps needed to start and test your mental health application.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ MongoDB running (Community Edition 8.0.12+)
- ✅ All dependencies installed

## Quick Start Commands

### 1. Install Dependencies
```bash
# Install all required packages
npm install

# Install additional testing dependencies (if not already installed)
npm install node-fetch
```

### 2. Start MongoDB
```bash
# Check if MongoDB is running
mongod --version

# If not running, start MongoDB service
# Windows: MongoDB should start automatically as a service
# Or start manually: mongod
```

### 3. Start the Application

#### Option A: Start Both Frontend and Backend Together
```bash
# This starts both the API server and React frontend
npm run dev:full
```

#### Option B: Start Separately (Recommended for Development)

**Terminal 1 - Start API Server:**
```bash
# Start the backend API server
npm run server
# OR
node server/index.js
```

**Terminal 2 - Start Frontend:**
```bash
# Start the React development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **API Server**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## Testing Commands

### Test Database Connection
```bash
# Test MongoDB connection and basic operations
node test-connection-simple.js
```

### Test Full Application
```bash
# Test MongoDB + API + Data Operations
node test-database.js
```

### Test API Endpoints Manually
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test mood entries
curl http://localhost:3001/api/mood-entries/test-user

# Test journal entries
curl http://localhost:3001/api/journal-entries/test-user
```

## Troubleshooting Commands

### Check if Services are Running
```bash
# Check if MongoDB is running
netstat -an | findstr 27017

# Check if API server is running
netstat -an | findstr 3001

# Check if React dev server is running
netstat -an | findstr 5173
```

### Fix Common Issues

#### MongoDB Not Running
```bash
# Start MongoDB service
mongod

# Or restart MongoDB service (Windows)
net stop MongoDB
net start MongoDB
```

#### API Server Not Starting
```bash
# Check for port conflicts
netstat -an | findstr 3001

# Kill process using port 3001 (if needed)
# Windows: Find PID and kill
netstat -ano | findstr 3001
taskkill /PID <PID_NUMBER> /F
```

#### Frontend Not Starting
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

## Development Workflow

### Daily Development
1. **Start MongoDB** (usually runs as service)
2. **Start API Server**: `npm run server`
3. **Start Frontend**: `npm run dev`
4. **Open Browser**: http://localhost:5173

### Testing Changes
1. **Test Database**: `node test-connection-simple.js`
2. **Test Full App**: `node test-database.js`
3. **Check Logs**: Look at terminal output for any errors

### Stopping the Application
```bash
# Stop API server: Ctrl+C in the terminal running npm run server
# Stop Frontend: Ctrl+C in the terminal running npm run dev
# Stop MongoDB: Usually not needed (runs as service)
```

## Environment Configuration

### Create Environment File
```bash
# Copy example environment file
cp env.example .env

# Edit .env with your settings
# Default values work for local development
```

### Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=mindful_db

# Server Configuration
PORT=3001
NODE_ENV=development

# Ollama Configuration (for AI Chatbot)
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

## Database Information

### MongoDB Details
- **Host**: localhost:27017
- **Database**: mindful_db
- **Collections**: moodEntries, journalEntries, assessmentResults, meditationSessions, chatMessages

### Data Migration
The app includes built-in data migration from localStorage to MongoDB:
1. Open the app in browser
2. Go to Home page
3. Find "Data Migration" section
4. Click "Test Connection" to verify MongoDB
5. Click "Migrate to MongoDB" to transfer data

## Production Deployment

### Build for Production
```bash
# Build the frontend
npm run build

# The built files will be in the 'dist' folder
```

### Start Production Server
```bash
# Start API server in production mode
NODE_ENV=production node server/index.js
```

## Useful Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start React frontend |
| `npm run server` | Start API server |
| `npm run dev:full` | Start both frontend and backend |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `node test-connection-simple.js` | Test MongoDB connection |
| `node test-database.js` | Test full application |

## Health Checks

### Verify Everything is Working
1. **MongoDB**: `mongod --version` should show version info
2. **API Server**: Visit http://localhost:3001/api/health
3. **Frontend**: Visit http://localhost:5173
4. **Full Test**: Run `node test-database.js`

### Expected Output for Success
```
✅ MongoDB Connection: PASS
✅ API Endpoints: PASS  
✅ Data Operations: PASS
✅ Database Integrity: PASS
✅ Cleanup: PASS
🎯 Overall Result: ALL TESTS PASSED
```

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Look at terminal output for error messages
3. Verify all services are running
4. Check the network tab in browser dev tools
5. Run the test commands to identify specific issues

## Quick Reference Card

```bash
# Start everything
npm run dev:full

# Test everything
node test-database.js

# Check health
curl http://localhost:3001/api/health

# Access app
# Frontend: http://localhost:5173
# API: http://localhost:3001
```

---
*This startup guide ensures you can quickly get your mental health application running with full database functionality.*
