import { useState, useEffect } from 'react'
import { Heart, Calendar, TrendingUp, BarChart3, Plus, Check } from 'lucide-react'
import apiService from '../services/api.js'

const moodOptions = [
  { id: 'very-happy', label: 'Very Happy', emoji: '😄', value: 5 },
  { id: 'happy', label: 'Happy', emoji: '😊', value: 4 },
  { id: 'neutral', label: 'Neutral', emoji: '😐', value: 3 },
  { id: 'sad', label: 'Sad', emoji: '😢', value: 2 },
  { id: 'very-sad', label: 'Very Sad', emoji: '😭', value: 1 },
]

const activities = [
  'Exercise', 'Sleep', 'Work', 'Socializing', 'Hobbies', 
  'Family time', 'Reading', 'Meditation', 'Cooking', 'Walking'
]

export default function MoodTracking() {
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedActivities, setSelectedActivities] = useState([])
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [moodEntries, setMoodEntries] = useState([])
  const [stats, setStats] = useState({ averageMood: 0, totalEntries: 0, moodDistribution: [] })
  const userId = 'anonymous' // In production, this would come from authentication

  // Load mood entries and stats on component mount
  useEffect(() => {
    loadMoodEntries()
    loadStats()
  }, [])

  const loadMoodEntries = async () => {
    try {
      const response = await apiService.getMoodEntries(userId, 10)
      setMoodEntries(response.data || [])
    } catch (error) {
      console.error('Error loading mood entries:', error)
    }
  }

  const loadStats = async () => {
    try {
      const response = await apiService.getMoodStats(userId, 7)
      setStats(response.data || { averageMood: 0, totalEntries: 0, moodDistribution: [] })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedMood) return

    setIsLoading(true)
    try {
      const selectedMoodData = moodOptions.find(mood => mood.id === selectedMood)
      const moodData = {
        userId,
        mood: selectedMoodData.value,
        activities: selectedActivities,
        notes: notes.trim(),
        date: new Date()
      }

      await apiService.createMoodEntry(moodData)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
      
      // Reset form
      setSelectedMood('')
      setSelectedActivities([])
      setNotes('')
      
      // Reload data
      loadMoodEntries()
      loadStats()
    } catch (error) {
      console.error('Error saving mood entry:', error)
      alert('Failed to save mood entry. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={24} color="#ef4444" />
            </div>
            <h1 className="page-title">Mood Tracking</h1>
          </div>
          <p className="page-subtitle">
            Track your daily mood and emotional patterns to better understand your mental health journey.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div style={{ 
            marginBottom: '2rem', 
            padding: '1rem', 
            backgroundColor: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Check size={20} color="#22c55e" />
            <span style={{ color: '#166534', fontWeight: '500' }}>
              Your mood has been recorded successfully!
            </span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Mood Entry Form */}
          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Mood Selection */}
              <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  How are you feeling today?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() => setSelectedMood(mood.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: selectedMood === mood.id ? '2px solid #2563eb' : '2px solid #e5e7eb',
                        backgroundColor: selectedMood === mood.id ? '#eff6ff' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{mood.emoji}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  What activities did you do today? (Optional)
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => handleActivityToggle(activity)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: selectedActivities.includes(activity) ? '1px solid #2563eb' : '1px solid #e5e7eb',
                        backgroundColor: selectedActivities.includes(activity) ? '#eff6ff' : 'white',
                        color: selectedActivities.includes(activity) ? '#2563eb' : '#374151',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  Additional notes (Optional)
                </h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How was your day? What's on your mind?"
                  className="textarea"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={!selectedMood || isLoading}
                  className="btn btn-primary"
                  style={{ 
                    opacity: (!selectedMood || isLoading) ? 0.5 : 1, 
                    cursor: (!selectedMood || isLoading) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div style={{ 
                        width: '16px', 
                        height: '16px', 
                        border: '2px solid white', 
                        borderTop: '2px solid transparent', 
                        borderRadius: '50%', 
                        animation: 'spin 1s linear infinite' 
                      }} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Record Mood
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Quick Stats */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                This Week
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Average Mood</span>
                  <span style={{ fontSize: '1.5rem' }}>
                    {stats.averageMood > 0 ? moodOptions.find(m => m.value === Math.round(stats.averageMood))?.emoji || '😐' : '😐'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Entries</span>
                  <span style={{ fontWeight: '600' }}>{stats.totalEntries}/7</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Average Score</span>
                  <span style={{ fontWeight: '600', color: '#22c55e' }}>
                    {stats.averageMood > 0 ? stats.averageMood.toFixed(1) : '0.0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Recent Entries
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {moodEntries.length === 0 ? (
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>
                    No entries yet. Start tracking your mood!
                  </p>
                ) : (
                  moodEntries.slice(0, 3).map((entry, index) => {
                    const moodEmoji = moodOptions.find(m => m.value === entry.mood)?.emoji || '😐'
                    const entryDate = new Date(entry.date)
                    const isToday = entryDate.toDateString() === new Date().toDateString()
                    const isYesterday = entryDate.toDateString() === new Date(Date.now() - 86400000).toDateString()
                    
                    let dateLabel = 'Today'
                    if (!isToday && !isYesterday) {
                      dateLabel = entryDate.toLocaleDateString()
                    } else if (isYesterday) {
                      dateLabel = 'Yesterday'
                    }

                    return (
                      <div key={entry._id || index} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '0.75rem', 
                        backgroundColor: '#f9fafb', 
                        borderRadius: '0.5rem' 
                      }}>
                        <div>
                          <div style={{ fontWeight: '500' }}>{dateLabel}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            {entry.activities?.join(', ') || 'No activities'}
                          </div>
                        </div>
                        <span style={{ fontSize: '1.5rem' }}>{moodEmoji}</span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                  <Calendar size={16} style={{ marginRight: '0.5rem' }} />
                  View Calendar
                </button>
                <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                  <TrendingUp size={16} style={{ marginRight: '0.5rem' }} />
                  View Trends
                </button>
                <button className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                  <BarChart3 size={16} style={{ marginRight: '0.5rem' }} />
                  View Insights
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
