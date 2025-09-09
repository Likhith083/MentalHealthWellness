import { Heart, Shield, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div className="logo-icon">
                <Heart size={20} />
              </div>
              <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>Mindful</span>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '1rem', maxWidth: '300px' }}>
              Your personal mental health companion. Track your mood, journal your thoughts, 
              and find the support you need on your wellness journey.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <Shield size={16} />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/mood-tracking">Mood Tracking</a></li>
              <li><a href="/journaling">Journaling</a></li>
              <li><a href="/meditation">Meditation</a></li>
              <li><a href="/assessments">Assessments</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="/therapist-matching">Find a Therapist</a></li>
              <li><a href="/crisis-support">Crisis Support</a></li>
              <li><a href="/ai-chatbot">AI Chatbot</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              © 2024 Mindful. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <Mail size={16} />
                <span>support@mindful.app</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <Phone size={16} />
                <span>1-800-MINDFUL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
