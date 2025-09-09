import { MessageCircle, Bot } from 'lucide-react'

export default function AIChatbot() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={24} color="#6b7280" />
            </div>
            <h1 className="page-title">AI Chatbot</h1>
          </div>
          <p className="page-subtitle">
            Your AI mental health companion is coming soon. Get personalized support whenever you need it.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#eff6ff', 
          border: '1px solid #bfdbfe', 
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ width: '3rem', height: '3rem', backgroundColor: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={24} color="#2563eb" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>
              Feature Coming Soon
            </h2>
            <p style={{ color: '#1e40af' }}>
              We're working hard to bring you an AI-powered mental health chatbot that will provide 
              personalized support, crisis detection, and evidence-based therapeutic techniques.
            </p>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Bot size={64} color="#6b7280" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            AI Mental Health Assistant
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Our AI chatbot will provide 24/7 mental health support, personalized recommendations, 
            and crisis intervention when you need it most.
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
