import { Component } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <div className="container">
            <div className="card" style={{ textAlign: 'center', maxWidth: '500px', margin: '2rem auto' }}>
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                backgroundColor: '#fef2f2', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <AlertCircle size={32} color="#ef4444" />
              </div>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                Something went wrong
              </h2>
              
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={this.handleRetry}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-outline"
                >
                  Refresh Page
                </button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details style={{ marginTop: '2rem', textAlign: 'left' }}>
                  <summary style={{ cursor: 'pointer', color: '#6b7280', marginBottom: '1rem' }}>
                    Error Details (Development)
                  </summary>
                  <pre style={{ 
                    backgroundColor: '#f3f4f6', 
                    padding: '1rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.75rem',
                    overflow: 'auto',
                    color: '#374151'
                  }}>
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
