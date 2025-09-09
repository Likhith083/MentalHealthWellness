import { Brain } from 'lucide-react'

export default function Meditation() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#faf5ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={24} color="#8b5cf6" />
            </div>
            <h1 className="page-title">Meditation</h1>
          </div>
          <p className="page-subtitle">
            Access guided meditation sessions designed to reduce stress and improve mindfulness.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Brain size={64} color="#6b7280" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Meditation Library Coming Soon
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            We're curating a collection of guided meditation sessions, breathing exercises, 
            and mindfulness practices to support your mental wellness journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">Get Notified</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  )
}
