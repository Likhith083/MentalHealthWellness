import { Users } from 'lucide-react'

export default function TherapistMatching() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} color="#0ea5e9" />
            </div>
            <h1 className="page-title">Find a Therapist</h1>
          </div>
          <p className="page-subtitle">
            Connect with licensed mental health professionals who match your needs and preferences.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Users size={64} color="#6b7280" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Therapist Network Coming Soon
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            We're building a network of licensed mental health professionals with advanced 
            matching algorithms to help you find the right therapist for your needs.
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
