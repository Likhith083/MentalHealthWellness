import { useState } from 'react'
import { Database, CheckCircle, AlertCircle, Download, Trash2, RefreshCw } from 'lucide-react'
import { dataMigration } from '../utils/migration.js'

export default function DataMigration() {
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationStatus, setMigrationStatus] = useState('')
  const [hasLocalData, setHasLocalData] = useState(dataMigration.hasLocalData())
  const [isApiConnected, setIsApiConnected] = useState(false)

  const checkApiConnection = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health')
      const data = await response.json()
      setIsApiConnected(data.success)
      setMigrationStatus(data.success ? 'API connected successfully!' : 'API connection failed')
    } catch (error) {
      setIsApiConnected(false)
      setMigrationStatus('API connection failed. Make sure the server is running.')
    }
  }

  const handleMigration = async () => {
    setIsMigrating(true)
    setMigrationStatus('Starting migration...')
    
    try {
      await dataMigration.migrateAll()
      setMigrationStatus('Migration completed successfully!')
      setHasLocalData(false)
    } catch (error) {
      setMigrationStatus(`Migration failed: ${error.message}`)
    } finally {
      setIsMigrating(false)
    }
  }

  const handleClearLocalStorage = () => {
    if (window.confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
      dataMigration.clearLocalStorage()
      setHasLocalData(false)
      setMigrationStatus('Local data cleared successfully!')
    }
  }

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <Database size={24} color="#2563eb" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Data Migration</h3>
      </div>
      
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Migrate your data from local storage to MongoDB for better persistence and backup.
      </p>

      {/* API Connection Status */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {isApiConnected ? (
            <CheckCircle size={16} color="#22c55e" />
          ) : (
            <AlertCircle size={16} color="#ef4444" />
          )}
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
            API Connection: {isApiConnected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <button
          onClick={checkApiConnection}
          className="btn btn-outline"
          style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
        >
          Test Connection
        </button>
      </div>

      {/* Local Data Status */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {hasLocalData ? (
            <Download size={16} color="#f59e0b" />
          ) : (
            <CheckCircle size={16} color="#22c55e" />
          )}
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
            Local Data: {hasLocalData ? 'Found' : 'No local data'}
          </span>
        </div>
      </div>

      {/* Migration Status */}
      {migrationStatus && (
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: migrationStatus.includes('failed') || migrationStatus.includes('error') ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${migrationStatus.includes('failed') || migrationStatus.includes('error') ? '#fecaca' : '#bbf7d0'}`,
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            color: migrationStatus.includes('failed') || migrationStatus.includes('error') ? '#dc2626' : '#166534',
            fontSize: '0.875rem'
          }}>
            {migrationStatus}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {hasLocalData && isApiConnected && (
          <button
            onClick={handleMigration}
            disabled={isMigrating}
            className="btn btn-primary"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              opacity: isMigrating ? 0.5 : 1
            }}
          >
            {isMigrating ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Migrating...
              </>
            ) : (
              <>
                <Database size={16} />
                Migrate to MongoDB
              </>
            )}
          </button>
        )}

        {hasLocalData && (
          <button
            onClick={handleClearLocalStorage}
            className="btn btn-outline"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: '#ef4444',
              borderColor: '#ef4444'
            }}
          >
            <Trash2 size={16} />
            Clear Local Data
          </button>
        )}

        {!hasLocalData && !isApiConnected && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f9fafb', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              No local data found and API not connected. Start using the app to create data!
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        backgroundColor: '#f0f9ff', 
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        color: '#1e40af'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
          Migration Instructions:
        </h4>
        <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>Make sure MongoDB is running on your system</li>
          <li>Start the backend server: <code>npm run server</code></li>
          <li>Test the API connection above</li>
          <li>Click "Migrate to MongoDB" to transfer your data</li>
          <li>Optionally clear local data after successful migration</li>
        </ol>
      </div>

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
