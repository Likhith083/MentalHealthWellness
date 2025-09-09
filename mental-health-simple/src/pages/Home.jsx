import { Link } from 'react-router-dom'
import { 
  Heart, 
  BookOpen, 
  Brain, 
  FileText, 
  Users, 
  Phone, 
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock
} from 'lucide-react'
import DataMigration from '../components/DataMigration'

const features = [
  {
    name: 'Mood Tracking',
    description: 'Track your daily mood and emotional patterns to better understand your mental health journey.',
    href: '/mood-tracking',
    icon: Heart,
    color: '#fef2f2',
    iconColor: '#ef4444',
  },
  {
    name: 'Journaling',
    description: 'Express your thoughts and feelings through guided journaling prompts and free-form writing.',
    href: '/journaling',
    icon: BookOpen,
    color: '#eff6ff',
    iconColor: '#2563eb',
  },
  {
    name: 'Meditation',
    description: 'Access guided meditation sessions designed to reduce stress and improve mindfulness.',
    href: '/meditation',
    icon: Brain,
    color: '#faf5ff',
    iconColor: '#8b5cf6',
  },
  {
    name: 'Assessments',
    description: 'Take evidence-based mental health assessments to track your progress over time.',
    href: '/assessments',
    icon: FileText,
    color: '#f0fdf4',
    iconColor: '#22c55e',
  },
  {
    name: 'Find a Therapist',
    description: 'Connect with licensed mental health professionals who match your needs and preferences.',
    href: '/therapist-matching',
    icon: Users,
    color: '#f0f9ff',
    iconColor: '#0ea5e9',
  },
  {
    name: 'Crisis Support',
    description: 'Get immediate help and resources when you need them most.',
    href: '/crisis-support',
    icon: Phone,
    color: '#fef2f2',
    iconColor: '#ef4444',
  },
  {
    name: 'AI Chatbot',
    description: 'Chat with our AI assistant for immediate support and guidance (Coming Soon).',
    href: '/ai-chatbot',
    icon: MessageCircle,
    color: '#f9fafb',
    iconColor: '#6b7280',
  },
]

const benefits = [
  'Evidence-based mental health tools',
  'HIPAA compliant and secure',
  'Available 24/7',
  'Personalized recommendations',
  'Progress tracking and insights',
  'Professional therapist matching',
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Your Mental Health
            <span style={{ color: '#2563eb' }}> Journey Starts Here</span>
          </h1>
          <p className="hero-subtitle">
            Take control of your mental wellness with personalized tools, professional support, 
            and evidence-based resources designed to help you thrive.
          </p>
          <div className="hero-actions">
            <Link to="/mood-tracking" className="btn btn-primary">
              Start Your Journey
              <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link to="/assessments" className="btn btn-outline">
              Take Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page">
        <div className="container">
          <div className="page-header">
            <h2 className="page-title">Comprehensive Mental Health Tools</h2>
            <p className="page-subtitle">
              Everything you need to support your mental wellness in one secure, accessible platform.
            </p>
          </div>

          <div className="grid grid-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.name} to={feature.href} className="feature-card">
                  <div 
                    className="feature-icon" 
                    style={{ backgroundColor: feature.color }}
                  >
                    <Icon size={24} color={feature.iconColor} />
                  </div>
                  <h3 className="feature-title">{feature.name}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#2563eb', fontWeight: '500' }}>
                    Learn more
                    <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Data Migration Section */}
      <section className="page">
        <div className="container">
          <DataMigration />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="page" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 className="page-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Why Choose Mindful?
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
                We're committed to providing you with the highest quality mental health support, 
                backed by science and designed with your privacy and security in mind.
              </p>
              <ul style={{ listStyle: 'none' }}>
                {benefits.map((benefit, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <CheckCircle size={20} color="#22c55e" style={{ marginRight: '0.75rem' }} />
                    <span style={{ color: '#374151' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-2">
              <div className="card" style={{ textAlign: 'center' }}>
                <Shield size={48} color="#2563eb" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Secure & Private
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Your data is protected with enterprise-grade security and HIPAA compliance.
                </p>
              </div>
              <div className="card" style={{ textAlign: 'center' }}>
                <Clock size={48} color="#2563eb" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Available 24/7
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Access your tools and support whenever you need them, day or night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page" style={{ backgroundColor: '#2563eb', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            Ready to Start Your Mental Health Journey?
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#bfdbfe', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of people who are taking control of their mental wellness with Mindful.
          </p>
          <div className="hero-actions">
            <Link to="/mood-tracking" className="btn" style={{ backgroundColor: 'white', color: '#2563eb' }}>
              Get Started Today
            </Link>
            <Link to="/crisis-support" className="btn" style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}>
              Need Immediate Help?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
