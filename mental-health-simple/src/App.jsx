import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import MoodTracking from './pages/MoodTracking'
import Journaling from './pages/Journaling'
import Meditation from './pages/Meditation'
import Assessments from './pages/Assessments'
import TherapistMatching from './pages/TherapistMatching'
import CrisisSupport from './pages/CrisisSupport'
import AIChatbot from './pages/AIChatbot'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood-tracking" element={<MoodTracking />} />
          <Route path="/journaling" element={<Journaling />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/therapist-matching" element={<TherapistMatching />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
          <Route path="/ai-chatbot" element={<AIChatbot />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App