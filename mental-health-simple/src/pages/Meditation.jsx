import { useState, useEffect } from 'react'
import { Brain, Play, Pause, Volume2, Clock, Star, Heart, Leaf, SkipBack, SkipForward } from 'lucide-react'

const meditationSessions = [
  {
    id: 1,
    title: 'Morning Mindfulness',
    description: 'Start your day with a 10-minute mindfulness practice to set a positive tone.',
    duration: 600, // 10 minutes in seconds
    category: 'Mindfulness',
    difficulty: 'Beginner',
    rating: 4.8,
    color: '#f0fdf4',
    iconColor: '#22c55e',
    icon: '🌅',
  },
  {
    id: 2,
    title: 'Stress Relief Breathing',
    description: 'Learn deep breathing techniques to quickly reduce stress and anxiety.',
    duration: 300, // 5 minutes
    category: 'Breathing',
    difficulty: 'Beginner',
    rating: 4.9,
    color: '#eff6ff',
    iconColor: '#2563eb',
    icon: '🫁',
  },
  {
    id: 3,
    title: 'Body Scan Relaxation',
    description: 'A guided body scan to release tension and promote deep relaxation.',
    duration: 1200, // 20 minutes
    category: 'Relaxation',
    difficulty: 'Intermediate',
    rating: 4.7,
    color: '#faf5ff',
    iconColor: '#8b5cf6',
    icon: '🧘',
  },
  {
    id: 4,
    title: 'Sleep Preparation',
    description: 'Wind down with gentle meditation to prepare your mind for restful sleep.',
    duration: 900, // 15 minutes
    category: 'Sleep',
    difficulty: 'Beginner',
    rating: 4.6,
    color: '#f0f9ff',
    iconColor: '#0ea5e9',
    icon: '🌙',
  },
  {
    id: 5,
    title: 'Loving-Kindness',
    description: 'Cultivate compassion and loving-kindness for yourself and others.',
    duration: 720, // 12 minutes
    category: 'Compassion',
    difficulty: 'Intermediate',
    rating: 4.8,
    color: '#fdf2f8',
    iconColor: '#ec4899',
    icon: '💝',
  },
  {
    id: 6,
    title: 'Focus & Concentration',
    description: 'Improve your focus and mental clarity through concentration meditation.',
    duration: 1080, // 18 minutes
    category: 'Focus',
    difficulty: 'Advanced',
    rating: 4.5,
    color: '#fff7ed',
    iconColor: '#f97316',
    icon: '🎯',
  },
]

const categories = ['All', 'Mindfulness', 'Breathing', 'Relaxation', 'Sleep', 'Compassion', 'Focus']

export default function Meditation() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSession, setSelectedSession] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [completedSessions, setCompletedSessions] = useState([])

  // Load completed sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedMeditationSessions')
    if (saved) {
      setCompletedSessions(JSON.parse(saved))
    }
  }, [])

  // Save completed sessions to localStorage
  useEffect(() => {
    localStorage.setItem('completedMeditationSessions', JSON.stringify(completedSessions))
  }, [completedSessions])

  const filteredSessions = selectedCategory === 'All' 
    ? meditationSessions 
    : meditationSessions.filter(session => session.category === selectedCategory)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSessionSelect = (session) => {
    setSelectedSession(session)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    if (!selectedSession) return 0
    return (currentTime / selectedSession.duration) * 100
  }

  // Simulate meditation progress
  useEffect(() => {
    let interval
    if (isPlaying && selectedSession) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= selectedSession.duration) {
            setIsPlaying(false)
            // Mark session as completed
            if (!completedSessions.includes(selectedSession.id)) {
              setCompletedSessions(prev => [...prev, selectedSession.id])
            }
            return selectedSession.duration
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, selectedSession, completedSessions])

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Meditation Sessions */}
          <div>
            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="btn"
                    style={{
                      backgroundColor: selectedCategory === category ? '#2563eb' : 'white',
                      color: selectedCategory === category ? 'white' : '#6b7280',
                      border: selectedCategory === category ? 'none' : '1px solid #e5e7eb',
                      fontSize: '0.875rem',
                      padding: '0.5rem 1rem'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-2">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: selectedSession?.id === session.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
                    backgroundColor: selectedSession?.id === session.id ? '#eff6ff' : 'white'
                  }}
                  onClick={() => handleSessionSelect(session)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{session.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontWeight: '600', fontSize: '1rem' }}>{session.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Star size={16} color="#fbbf24" fill="#fbbf24" />
                          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{session.rating}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                        {session.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} />
                          <span>{formatTime(session.duration)}</span>
                        </div>
                        <div style={{ 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '0.25rem', 
                          backgroundColor: session.color,
                          color: session.iconColor,
                          fontWeight: '500'
                        }}>
                          {session.difficulty}
                        </div>
                        {completedSessions.includes(session.id) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#22c55e' }}>
                            <Heart size={12} fill="#22c55e" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Current Session Player */}
            {selectedSession ? (
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Now Playing
                </h3>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selectedSession.icon}</div>
                  <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{selectedSession.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                    {selectedSession.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: '#e5e7eb', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          backgroundColor: '#2563eb', 
                          width: `${getProgress()}%`,
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontSize: '0.75rem', 
                      color: '#6b7280', 
                      marginTop: '0.5rem' 
                    }}>
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(selectedSession.duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button 
                      onClick={() => setCurrentTime(Math.max(0, currentTime - 30))}
                      className="btn btn-outline"
                      style={{ padding: '0.5rem' }}
                    >
                      <SkipBack size={20} />
                    </button>
                    <button
                      onClick={handlePlay}
                      className="btn btn-primary"
                      style={{ 
                        padding: '1rem', 
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '2px' }} />}
                    </button>
                    <button 
                      onClick={() => setCurrentTime(Math.min(selectedSession.duration, currentTime + 30))}
                      className="btn btn-outline"
                      style={{ padding: '0.5rem' }}
                    >
                      <SkipForward size={20} />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Volume2 size={16} color="#6b7280" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Select a Session
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Choose a meditation session to begin your mindfulness practice.
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Benefits of Meditation
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { icon: Leaf, text: 'Reduces stress and anxiety', color: '#22c55e' },
                  { icon: Heart, text: 'Improves emotional well-being', color: '#ec4899' },
                  { icon: Brain, text: 'Enhances focus and concentration', color: '#8b5cf6' },
                  { icon: Clock, text: 'Promotes better sleep quality', color: '#2563eb' },
                ].map((benefit, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <benefit.icon size={20} color={benefit.color} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Your Progress
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Sessions Completed</span>
                  <span style={{ fontWeight: '600', fontSize: '1.25rem' }}>{completedSessions.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Total Time</span>
                  <span style={{ fontWeight: '600' }}>
                    {formatTime(completedSessions.length * 600)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280' }}>Current Streak</span>
                  <span style={{ fontWeight: '600', color: '#22c55e' }}>3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}