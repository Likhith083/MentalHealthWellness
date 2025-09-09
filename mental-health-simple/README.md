# Mindful - Mental Health Tracking App

A comprehensive mental health tracking application built with React, Node.js, and MongoDB. Track your mood, journal your thoughts, take assessments, and get AI-powered support.

## Features

- **Mood Tracking**: Daily mood logging with activities and notes
- **Journaling**: Guided journaling with prompts and free-form writing
- **Mental Health Assessments**: Evidence-based assessments (PHQ-9, GAD-7, etc.)
- **Meditation Sessions**: Track meditation practice and progress
- **AI Chatbot**: Mental health support powered by Ollama
- **Therapist Matching**: Find mental health professionals
- **Crisis Support**: Emergency resources and hotlines
- **Data Analytics**: Progress tracking and insights
- **Data Migration**: Move from localStorage to MongoDB

## Tech Stack

### Frontend
- React 19 with Vite
- React Router for navigation
- Lucide React for icons
- Custom CSS with responsive design

### Backend
- Node.js with Express
- MongoDB for data storage
- RESTful API design
- Rate limiting and security middleware

### AI Integration
- Ollama for local AI processing
- Mental health-focused prompts
- Secure conversation handling

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB running locally
- Ollama (optional, for AI chatbot)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd mental-health-simple
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB**
   ```bash
   # Windows (if installed as service)
   # MongoDB should start automatically
   
   # Or start manually
   mongod
   ```

4. **Start the application**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start separately
   npm run server  # Backend on :3001
   npm run dev     # Frontend on :5173
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001/api
   - Health check: http://localhost:3001/api/health

## API Endpoints

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

### Chat
- `GET /api/chat/:userId` - Get chat messages
- `POST /api/chat` - Create chat message
- `GET /api/chat/:userId/sessions` - Get chat sessions
- `DELETE /api/chat/:userId` - Clear chat history

## Database Schema

### Collections
- `moodEntries` - Daily mood tracking data
- `journalEntries` - Journal entries and prompts
- `assessmentResults` - Mental health assessment results
- `meditationSessions` - Meditation session records
- `chatMessages` - AI chatbot conversation history

## Development

### Project Structure
```
mental-health-simple/
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   └── utils/             # Utility functions
├── server/                # Backend Express app
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Data models and validation
│   └── routes/           # API routes
└── public/               # Static assets
```

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run server` - Start backend API server
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security Features

- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Request logging
- Error handling and boundaries
- Data validation on both client and server

## AI Chatbot Setup

1. **Install Ollama**
   ```bash
   # Visit https://ollama.ai for installation instructions
   ```

2. **Pull a model**
   ```bash
   ollama pull llama2
   # or
   ollama pull mistral
   ```

3. **Configure in the app**
   - Go to AI Chatbot page
   - Open settings
   - Set Ollama URL (default: http://localhost:11434)
   - Select your model

## Data Migration

The app includes a built-in migration tool:

1. Open the Home page
2. Find the "Data Migration" section
3. Click "Test Connection" to verify MongoDB
4. Click "Migrate to MongoDB" to transfer localStorage data
5. Optionally clear localStorage after successful migration

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running: `mongod --version`
- Check port 27017 is open
- Verify connection string in .env

**API Connection Issues**
- Ensure backend server is running: `npm run server`
- Check port 3001 is available
- Verify API health endpoint

**AI Chatbot Not Working**
- Ensure Ollama is running: `ollama serve`
- Check Ollama URL in settings
- Verify model is downloaded

**Build Issues**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
- Ensure all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the troubleshooting section
- Review the console logs for errors
- Ensure all services are running
- Check the network tab for API errors

## Roadmap

- [ ] User authentication and authorization
- [ ] Data encryption at rest
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and insights
- [ ] Integration with wearable devices
- [ ] Professional therapist dashboard
- [ ] Group therapy features
- [ ] Medication tracking
- [ ] Sleep pattern analysis
- [ ] Export data functionality
