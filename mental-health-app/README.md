# Mindful - Mental Health Web Application

A comprehensive mental health web application built with React, TypeScript, and Tailwind CSS, designed to provide accessible mental health tools and resources.

## Features

### 🏠 Home Page
- Welcome section with feature overview
- Call-to-action buttons for key features
- Benefits and value proposition
- Modern, calming design

### 😊 Mood Tracking
- Daily mood logging with emoji selection
- Activity tracking
- Notes and reflection
- Progress visualization
- Weekly statistics

### 📝 Journaling
- Guided writing prompts
- Free-form journaling
- Recent entries history
- Writing tips and suggestions
- Category-based organization

### 🧘 Meditation
- Guided meditation sessions
- Multiple categories (mindfulness, breathing, relaxation, etc.)
- Session player with progress tracking
- Difficulty levels
- Benefits information

### 📊 Assessments
- Evidence-based mental health assessments
- PHQ-9 Depression Screening
- GAD-7 Anxiety Assessment
- PSS-10 Stress Scale
- Score interpretation and tracking

### 👥 Therapist Matching
- Search and filter licensed therapists
- Detailed therapist profiles
- Specialties and availability
- Contact and booking options
- Reviews and ratings

### 🆘 Crisis Support
- 24/7 crisis hotlines
- Emergency resources
- Self-care tips
- Crisis planning guide
- Immediate help contacts

### 🤖 AI Chatbot (Coming Soon)
- Placeholder for future AI integration
- Feature preview
- Notification signup

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## Design System

### Colors
- **Primary**: Calming blue tones (#0ea5e9)
- **Secondary**: Soft purple accents
- **Neutral**: Grayscale palette for text and backgrounds
- **Success**: Green for positive actions
- **Warning**: Orange for cautions
- **Danger**: Red for urgent/crisis situations

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Semibold with tight tracking
- **Body**: Regular weight with optimized line height

### Components
- Reusable button styles (primary, secondary, outline, ghost)
- Card components with consistent spacing
- Form inputs with focus states
- Responsive grid layouts

## Accessibility Features

- High contrast ratios for text readability
- Keyboard navigation support
- Screen reader friendly markup
- Focus indicators
- Semantic HTML structure
- ARIA labels where appropriate

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mental-health-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Navigation.tsx      # Navigation component
│   └── Footer.tsx          # Footer component
├── pages/
│   ├── Home.tsx            # Home page
│   ├── MoodTracking.tsx    # Mood tracking page
│   ├── Journaling.tsx      # Journaling page
│   ├── Meditation.tsx      # Meditation page
│   ├── Assessments.tsx     # Assessments page
│   ├── TherapistMatching.tsx # Therapist matching page
│   ├── CrisisSupport.tsx   # Crisis support page
│   └── AIChatbot.tsx       # AI chatbot page
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles and Tailwind
```

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication and profiles
- [ ] Data persistence
- [ ] AI chatbot implementation
- [ ] Mobile app version
- [ ] Advanced analytics and insights
- [ ] Therapist booking system
- [ ] Community features
- [ ] HIPAA compliance implementation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for informational and educational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions about medical conditions.

For mental health emergencies, please contact:
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Emergency Services: 911