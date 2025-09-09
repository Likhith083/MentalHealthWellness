import { Phone, AlertTriangle } from 'lucide-react'

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
            Get immediate help and resources when you need them most.
          </p>
        </div>

        {/* Emergency Alert */}
        <div style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}>
          <AlertTriangle size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.5rem' }}>
              In Immediate Danger?
            </h2>
            <p style={{ color: '#991b1b', marginBottom: '1rem' }}>
              If you or someone you know is in immediate danger of self-harm or suicide, 
              please call 911 or go to your nearest emergency room immediately.
            </p>
            <button 
              className="btn" 
              style={{ backgroundColor: '#dc2626', color: 'white' }}
              onClick={() => window.open('tel:911')}
            >
              <Phone size={16} style={{ marginRight: '0.5rem' }} />
              Call 911 Now
            </button>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              National Suicide Prevention Lifeline
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              24/7 crisis support for anyone in emotional distress or suicidal crisis.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2563eb' }}>988</span>
              <button 
                className="btn btn-primary"
                onClick={() => window.open('tel:988')}
              >
                <Phone size={16} style={{ marginRight: '0.5rem' }} />
                Call Now
              </button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              Crisis Text Line
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              Free, 24/7 crisis support via text message.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb' }}>Text HOME to 741741</span>
              <button 
                className="btn btn-outline"
                onClick={() => navigator.clipboard.writeText('741741')}
              >
                Copy Number
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
