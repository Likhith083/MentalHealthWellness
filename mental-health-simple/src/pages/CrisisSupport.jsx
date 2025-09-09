import { Phone, MessageCircle, Heart, AlertTriangle, Clock, Shield, Users, BookOpen, Brain, Home, ExternalLink } from 'lucide-react'

const crisisResources = [
  {
    title: 'National Suicide Prevention Lifeline',
    number: '988',
    description: 'Available 24/7 for crisis support and suicide prevention',
    icon: Phone,
    color: '#ef4444',
    action: 'Call Now',
    href: 'tel:988',
    priority: 'high'
  },
  {
    title: 'Crisis Text Line',
    number: '741741',
    description: 'Text HOME to 741741 for 24/7 crisis support',
    icon: MessageCircle,
    color: '#2563eb',
    action: 'Copy Text',
    onClick: () => navigator.clipboard.writeText('HOME'),
    priority: 'high'
  },
  {
    title: 'Emergency Services',
    number: '911',
    description: 'For immediate life-threatening emergencies',
    icon: AlertTriangle,
    color: '#f59e0b',
    action: 'Call 911',
    href: 'tel:911',
    priority: 'emergency'
  }
]

const selfCareTips = [
  {
    title: 'Grounding Techniques',
    description: 'Use the 5-4-3-2-1 technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
    icon: Shield
  },
  {
    title: 'Deep Breathing',
    description: 'Try the 4-7-8 breathing technique: Inhale for 4 counts, hold for 7, exhale for 8.',
    icon: Heart
  },
  {
    title: 'Reach Out',
    description: 'Contact a trusted friend, family member, or mental health professional.',
    icon: Users
  },
  {
    title: 'Safe Space',
    description: 'Go to a quiet, comfortable place where you feel safe and secure.',
    icon: Home
  }
]

const additionalResources = [
  {
    title: 'SAMHSA National Helpline',
    number: '1-800-662-4357',
    description: 'Substance abuse and mental health services',
    href: 'tel:1-800-662-4357'
  },
  {
    title: 'National Alliance on Mental Illness (NAMI)',
    number: '1-800-950-6264',
    description: 'Mental health support and resources',
    href: 'tel:1-800-950-6264'
  },
  {
    title: 'Veterans Crisis Line',
    number: '1-800-273-8255',
    description: 'Crisis support for veterans and their families',
    href: 'tel:1-800-273-8255'
  },
  {
    title: 'LGBTQ+ Crisis Support',
    number: '1-866-488-7386',
    description: 'The Trevor Project for LGBTQ+ youth',
    href: 'tel:1-866-488-7386'
  }
]

export default function CrisisSupport() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={24} color="#ef4444" />
            </div>
            <h1 className="page-title">Crisis Support</h1>
          </div>
          <p className="page-subtitle">
            If you're experiencing a mental health crisis, help is available 24/7. You are not alone.
          </p>
        </div>

        {/* Emergency Resources */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
            Immediate Help
          </h2>
          <div className="grid grid-2">
            {crisisResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <div 
                  key={index} 
                  className="card" 
                  style={{ 
                    textAlign: 'center', 
                    border: `2px solid ${resource.color}`,
                    backgroundColor: resource.priority === 'emergency' ? '#fef2f2' : 'white'
                  }}
                >
                  <Icon size={48} color={resource.color} style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {resource.title}
                  </h3>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: resource.color, marginBottom: '1rem' }}>
                    {resource.number}
                  </div>
                  <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    {resource.description}
                  </p>
                  {resource.href ? (
                    <a 
                      href={resource.href} 
                      className="btn" 
                      style={{ 
                        backgroundColor: resource.color, 
                        color: 'white', 
                        fontSize: '1rem', 
                        padding: '0.75rem 1.5rem',
                        textDecoration: 'none'
                      }}
                    >
                      {resource.action}
                    </a>
                  ) : (
                    <button 
                      onClick={resource.onClick}
                      className="btn" 
                      style={{ 
                        backgroundColor: resource.color, 
                        color: 'white', 
                        fontSize: '1rem', 
                        padding: '0.75rem 1.5rem'
                      }}
                    >
                      {resource.action}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Self-Care Tips */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
            Immediate Self-Care
          </h2>
          <div className="grid grid-2">
            {selfCareTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <div key={index} className="card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      backgroundColor: '#eff6ff', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} color="#2563eb" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {tip.title}
                      </h3>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.4' }}>
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
            Additional Resources
          </h2>
          <div className="grid grid-2">
            {additionalResources.map((resource, index) => (
              <div key={index} className="card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {resource.title}
                    </h3>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.5rem' }}>
                      {resource.number}
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      {resource.description}
                    </p>
                    <a 
                      href={resource.href} 
                      className="btn btn-outline"
                      style={{ fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      Call Now
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="card" style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', textAlign: 'center' }}>
          <AlertTriangle size={32} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
            Important Notice
          </h3>
          <p style={{ color: '#92400e', fontSize: '0.875rem', lineHeight: '1.4', maxWidth: '600px', margin: '0 auto' }}>
            If you are having thoughts of suicide, please reach out for help immediately. 
            These feelings are temporary and help is available. You are valued and your life matters.
          </p>
        </div>

        {/* Quick Access to App Features */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
            Use Our Tools
          </h2>
          <div className="grid grid-3">
            <a href="/mood-tracking" className="feature-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Heart size={24} color="#ef4444" />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Mood Tracking</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Track your emotional patterns</p>
                </div>
              </div>
            </a>
            <a href="/journaling" className="feature-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BookOpen size={24} color="#2563eb" />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Journaling</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Express your thoughts safely</p>
                </div>
              </div>
            </a>
            <a href="/meditation" className="feature-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Brain size={24} color="#8b5cf6" />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Meditation</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Find calm and peace</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}