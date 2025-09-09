import { BookOpen } from 'lucide-react'

export default function Journaling() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={24} color="#2563eb" />
            </div>
            <h1 className="page-title">Journaling</h1>
          </div>
          <p className="page-subtitle">
            Express your thoughts and feelings through guided journaling prompts and free-form writing.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <BookOpen size={64} color="#6b7280" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Journaling Feature Coming Soon
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            We're working on bringing you a comprehensive journaling experience with guided prompts, 
            mood tracking integration, and privacy-focused writing tools.
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
