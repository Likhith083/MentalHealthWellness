import { FileText } from 'lucide-react'

export default function Assessments() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={24} color="#22c55e" />
            </div>
            <h1 className="page-title">Mental Health Assessments</h1>
          </div>
          <p className="page-subtitle">
            Take evidence-based mental health assessments to track your progress over time.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <FileText size={64} color="#6b7280" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Assessment Tools Coming Soon
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            We're developing validated mental health assessments including PHQ-9, GAD-7, 
            and other evidence-based tools to help you track your mental wellness.
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
