import { useState } from 'react'
import { Heart, Calendar, TrendingUp, BarChart3, Plus, Check } from 'lucide-react'

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

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Mood entry:', { selectedMood, selectedActivities, notes })
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
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
                  disabled={!selectedMood}
                  className="btn btn-primary"
                  style={{ 
                    opacity: !selectedMood ? 0.5 : 1, 
                    cursor: !selectedMood ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Plus size={20} />
                  Record Mood
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
                  <span style={{ fontSize: '1.5rem' }}>😊</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Entries</span>
                  <span style={{ fontWeight: '600' }}>5/7</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Streak</span>
                  <span style={{ fontWeight: '600', color: '#22c55e' }}>3 days</span>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Recent Entries
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { date: 'Today', mood: '😊', activities: ['Exercise', 'Reading'] },
                  { date: 'Yesterday', mood: '😐', activities: ['Work', 'Cooking'] },
                  { date: '2 days ago', mood: '😄', activities: ['Socializing', 'Hobbies'] },
                ].map((entry, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '0.75rem', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '0.5rem' 
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{entry.date}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {entry.activities.join(', ')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.5rem' }}>{entry.mood}</span>
                  </div>
                ))}
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
    </div>
  )
}
