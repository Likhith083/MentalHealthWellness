# MongoDB Setup Guide

This guide will help you set up MongoDB integration for your Mental Health App.

## Prerequisites

- MongoDB installed and running on your system
- MongoDB Compass (optional, for database management)
- Node.js and npm installed

## Quick Start

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if MongoDB is installed as a service)
# MongoDB should start automatically

# Or start manually
mongod
```

### 2. Start the Backend Server
```bash
npm run server
```
This will start the API server on `http://localhost:3001`

### 3. Start the Frontend
```bash
npm run dev
```
This will start the React app on `http://localhost:5173`

### 4. Run Both Together
```bash
npm run dev:full
```
This runs both the backend API and frontend simultaneously.

## Database Configuration

The app is configured to connect to:
- **Host**: `localhost`
- **Port**: `27017`
- **Database**: `mindful_db`

### Connection Details
- **Connection String**: `mongodb://localhost:27017`
- **Database Name**: `mindful_db`

## Data Migration

The app includes a built-in migration tool to move data from localStorage to MongoDB:

1. Open the app in your browser
2. Go to the Home page
3. Look for the "Data Migration" section
4. Click "Test Connection" to verify MongoDB is accessible
5. Click "Migrate to MongoDB" to transfer your data
6. Optionally clear localStorage after successful migration

## API Endpoints

The backend provides the following API endpoints:

### Mood Entries
- `GET /api/mood-entries/:userId` - Get mood entries
- `POST /api/mood-entries` - Create mood entry
- `PUT /api/mood-entries/:id` - Update mood entry
- `DELETE /api/mood-entries/:id` - Delete mood entry
- `GET /api/mood-entries/:userId/stats` - Get mood statistics

### Journal Entries
- `GET /api/journal-entries/:userId` - Get journal entries
- `POST /api/journal-entries` - Create journal entry
- `PUT /api/journal-entries/:id` - Update journal entry
- `DELETE /api/journal-entries/:id` - Delete journal entry
- `GET /api/journal-entries/:userId/search` - Search journal entries

### Assessments
- `GET /api/assessments/:userId` - Get assessment results
- `POST /api/assessments` - Create assessment result
- `GET /api/assessments/:userId/stats` - Get assessment statistics
- `GET /api/assessments/:userId/progress/:assessmentId` - Get progress over time

### Meditation
- `GET /api/meditation/:userId` - Get meditation sessions
- `POST /api/meditation` - Create meditation session
- `PUT /api/meditation/:id` - Update meditation session
- `GET /api/meditation/:userId/stats` - Get meditation statistics
- `GET /api/meditation/:userId/completed` - Get completed sessions

### Chat
- `GET /api/chat/:userId` - Get chat messages
- `POST /api/chat` - Create chat message
- `GET /api/chat/:userId/sessions` - Get chat sessions
- `DELETE /api/chat/:userId` - Clear chat history
- `DELETE /api/chat/:userId/session/:sessionId` - Clear specific session

## Database Collections

The app creates the following collections in MongoDB:

- `moodEntries` - Daily mood tracking data
- `journalEntries` - Journal entries and prompts
- `assessmentResults` - Mental health assessment results
- `meditationSessions` - Meditation session records
- `chatMessages` - AI chatbot conversation history

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running: `mongod --version`
2. Check if port 27017 is open: `netstat -an | findstr 27017`
3. Verify connection in MongoDB Compass: `mongodb://localhost:27017`

### API Connection Issues
1. Make sure the backend server is running: `npm run server`
2. Check if port 3001 is available
3. Verify the API health endpoint: `http://localhost:3001/api/health`

### Data Migration Issues
1. Ensure both MongoDB and the API server are running
2. Check the browser console for error messages
3. Verify data exists in localStorage before migration

## Security Notes

- The current setup uses a default user ID (`anonymous`) for simplicity
- In production, implement proper user authentication
- Consider adding data encryption for sensitive information
- Implement proper access controls and user isolation

## Next Steps

1. **User Authentication**: Add login/signup system
2. **Data Encryption**: Encrypt sensitive data at rest
3. **Backup Strategy**: Implement regular database backups
4. **Production Deployment**: Deploy to a cloud platform
5. **Monitoring**: Add logging and monitoring tools

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify MongoDB and API server are running
3. Ensure all dependencies are installed: `npm install`
4. Check the network tab in browser dev tools for API errors
