import { Link, useLocation } from 'react-router-dom'
import { BarChart3, BookOpen, Brain, FileText, Users, Heart, PenTool } from 'lucide-react'
import Footer from './Footer'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Mental Health Hub', href: '/journaling', icon: BookOpen },
  { name: 'Mental Health Tools', href: '/meditation', icon: Brain },
  { name: 'Assessments', href: '/assessments', icon: FileText },
  { name: 'Blogs', href: '/blogs', icon: PenTool },
  { name: 'Support', href: '/support', icon: Users },
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
            <span className="logo-text">Mindful</span>
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
                    <Icon size={16} />
                    <span className="nav-text">{item.name}</span>
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
