import { Loader } from 'lucide-react'

const LoadingSpinner = ({ size = 24, text = 'Loading...', className = '' }) => {
  return (
    <div 
      className={`loading-spinner ${className}`}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '2rem'
      }}
    >
      <Loader 
        size={size} 
        className="animate-spin" 
        style={{ color: '#2563eb' }}
      />
      {text && (
        <p style={{ 
          color: '#6b7280', 
          fontSize: '0.875rem', 
          margin: 0 
        }}>
          {text}
        </p>
      )}
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
