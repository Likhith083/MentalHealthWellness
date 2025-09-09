import { Link, useLocation } from 'react-router-dom'
import { Heart, BookOpen, Brain, FileText, Users, Phone, MessageCircle } from 'lucide-react'
import Footer from './Footer'

const navigation = [
  { name: 'Home', href: '/', icon: Heart },
  { name: 'Mood Tracking', href: '/mood-tracking', icon: Heart },
  { name: 'Journaling', href: '/journaling', icon: BookOpen },
  { name: 'Meditation', href: '/meditation', icon: Brain },
  { name: 'Assessments', href: '/assessments', icon: FileText },
  { name: 'Find Therapist', href: '/therapist-matching', icon: Users },
  { name: 'Crisis Support', href: '/crisis-support', icon: Phone },
  { name: 'AI Chatbot', href: '/ai-chatbot', icon: MessageCircle },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <nav className="nav">
        <div className="container nav-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <Heart size={20} />
            </div>
            Mindful
          </Link>
          
          <ul className="nav-links">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} style={{ marginRight: '0.5rem' }} />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <main className="main">
        {children}
      </main>

      <Footer />
    </div>
  )
}
