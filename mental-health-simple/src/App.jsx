import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import JournalingAI from './pages/JournalingAI'
import Meditation from './pages/Meditation'
import Assessments from './pages/Assessments'
import Support from './pages/Support'
import Blogs from './pages/Blogs'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journaling" element={<JournalingAI />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/support" element={<Support />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App