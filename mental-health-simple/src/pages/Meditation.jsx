import { useState, useEffect } from 'react'
import { 
  Brain, Play, Pause, Volume2, Clock, Star, Heart, Leaf, SkipBack, SkipForward,
  Wind, Moon, Target, RefreshCw, Quote, Zap, Coffee, BookOpen, Music, 
  Activity, Timer, CheckCircle, ArrowRight, ExternalLink
} from 'lucide-react'

// Breathing exercises data
const breathingExercises = [
  {
    id: 1,
    title: '4-7-8 Breathing',
    description: 'Calm your nervous system with this powerful relaxation technique',
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    duration: 300, // 5 minutes
    benefits: ['Reduces anxiety', 'Improves sleep', 'Calms the mind'],
    color: '#eff6ff',
    iconColor: '#2563eb',
    icon: '🫁',
  },
  {
    id: 2,
    title: 'Box Breathing',
    description: 'Military technique for focus and stress relief',
    pattern: { inhale: 4, hold: 4, exhale: 4, hold2: 4 },
    duration: 240, // 4 minutes
    benefits: ['Enhances focus', 'Reduces stress', 'Improves concentration'],
    color: '#f0fdf4',
    iconColor: '#22c55e',
    icon: '📦',
  },
  {
    id: 3,
    title: 'Deep Belly Breathing',
    description: 'Foundation breathing technique for relaxation',
    pattern: { inhale: 4, hold: 2, exhale: 6 },
    duration: 180, // 3 minutes
    benefits: ['Activates parasympathetic', 'Reduces tension', 'Promotes calm'],
    color: '#faf5ff',
    iconColor: '#8b5cf6',
    icon: '🌊',
  },
  {
    id: 4,
    title: 'Alternate Nostril',
    description: 'Balance your nervous system with this ancient technique',
    pattern: { inhale: 4, hold: 4, exhale: 4 },
    duration: 360, // 6 minutes
    benefits: ['Balances hemispheres', 'Reduces anxiety', 'Enhances clarity'],
    color: '#fdf2f8',
    iconColor: '#ec4899',
    icon: '👃',
  },
]

// Sleep tools data
const sleepTools = [
  {
    id: 1,
    title: 'Progressive Muscle Relaxation',
    description: 'Release tension from head to toe for better sleep',
    duration: 900, // 15 minutes
    type: 'guided',
    benefits: ['Reduces physical tension', 'Promotes deep sleep', 'Relaxes the body'],
    color: '#f0f9ff',
    iconColor: '#0ea5e9',
    icon: '🌙',
  },
  {
    id: 2,
    title: 'Body Scan Meditation',
    description: 'Mindful awareness of each body part for relaxation',
    duration: 1200, // 20 minutes
    type: 'guided',
    benefits: ['Increases body awareness', 'Reduces stress', 'Improves sleep quality'],
    color: '#fef3c7',
    iconColor: '#f59e0b',
    icon: '🧘',
  },
  {
    id: 3,
    title: 'White Noise Generator',
    description: 'Soothing sounds to mask distractions and promote sleep',
    duration: 0, // Continuous
    type: 'audio',
    benefits: ['Blocks external noise', 'Creates sleep environment', 'Promotes relaxation'],
    color: '#f3f4f6',
    iconColor: '#6b7280',
    icon: '🔊',
  },
  {
    id: 4,
    title: 'Sleep Story',
    description: 'Gentle narrative to guide you into peaceful sleep',
    duration: 1800, // 30 minutes
    type: 'story',
    benefits: ['Distracts from worries', 'Promotes relaxation', 'Guides to sleep'],
    color: '#fce7f3',
    iconColor: '#ec4899',
    icon: '📖',
  },
]

// Focus tools data
const focusTools = [
  {
    id: 1,
    title: 'Pomodoro Timer',
    description: '25-minute focused work sessions with breaks',
    duration: 1500, // 25 minutes
    type: 'timer',
    benefits: ['Improves focus', 'Prevents burnout', 'Increases productivity'],
    color: '#fef2f2',
    iconColor: '#ef4444',
    icon: '🍅',
  },
  {
    id: 2,
    title: 'Concentration Meditation',
    description: 'Focus on a single point to train your attention',
    duration: 600, // 10 minutes
    type: 'meditation',
    benefits: ['Enhances concentration', 'Reduces mind wandering', 'Improves focus'],
    color: '#f0fdf4',
    iconColor: '#22c55e',
    icon: '🎯',
  },
  {
    id: 3,
    title: 'Ambient Focus Sounds',
    description: 'Background sounds to enhance concentration',
    duration: 0, // Continuous
    type: 'audio',
    benefits: ['Blocks distractions', 'Enhances focus', 'Creates work environment'],
    color: '#eff6ff',
    iconColor: '#2563eb',
    icon: '🎵',
  },
  {
    id: 4,
    title: 'Mindful Work Breaks',
    description: 'Short mindfulness exercises between work sessions',
    duration: 300, // 5 minutes
    type: 'guided',
    benefits: ['Refreshes the mind', 'Reduces stress', 'Maintains energy'],
    color: '#faf5ff',
    iconColor: '#8b5cf6',
    icon: '☕',
  },
]

const toolCategories = ['Breathing', 'Sleep', 'Focus', 'Quotes']

export default function Meditation() {
  const [activeTab, setActiveTab] = useState('breathing')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [breathingPhase, setBreathingPhase] = useState('inhale') // inhale, hold, exhale, hold
  const [breathingCount, setBreathingCount] = useState(0)
  const [currentQuote, setCurrentQuote] = useState(null)
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const [completedExercises, setCompletedExercises] = useState([])
  
  // Sleep and Focus tools state
  const [selectedSleepTool, setSelectedSleepTool] = useState(null)
  const [selectedFocusTool, setSelectedFocusTool] = useState(null)
  const [isSleepActive, setIsSleepActive] = useState(false)
  const [isFocusActive, setIsFocusActive] = useState(false)
  const [sleepTime, setSleepTime] = useState(0)
  const [focusTime, setFocusTime] = useState(0)
  const [pomodoroPhase, setPomodoroPhase] = useState('work') // work, shortBreak, longBreak
  const [pomodoroSessions, setPomodoroSessions] = useState(0)

  // Load completed exercises from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedMentalHealthExercises')
    if (saved) {
      setCompletedExercises(JSON.parse(saved))
    }
  }, [])

  // Save completed exercises to localStorage
  useEffect(() => {
    localStorage.setItem('completedMentalHealthExercises', JSON.stringify(completedExercises))
  }, [completedExercises])

  // Load daily quote on component mount
  useEffect(() => {
    loadDailyQuote()
  }, [])

  const loadDailyQuote = async () => {
    setIsLoadingQuote(true)
    try {
      // Try backend API first
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quotes/daily`)
      const result = await response.json()
      
      if (result.success && result.data) {
        setCurrentQuote(result.data)
        setIsLoadingQuote(false)
        return
      }
    } catch (error) {
      console.log('Backend API not available, using fallback quote...')
    }
    
    // Use fallback quote if API fails
    setCurrentQuote({
      q: "The present moment is the only time over which we have dominion.",
      a: "Thích Nhất Hạnh",
      h: "<blockquote>&ldquo;The present moment is the only time over which we have dominion.&rdquo; &mdash; <footer>Thích Nhất Hạnh</footer></blockquote>"
    })
    
    setIsLoadingQuote(false)
  }

  const loadRandomQuote = async () => {
    setIsLoadingQuote(true)
    try {
      // Try backend API first
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quotes/random`)
      const result = await response.json()
      
      if (result.success && result.data) {
        setCurrentQuote(result.data)
        setIsLoadingQuote(false)
        return
      }
    } catch (error) {
      console.log('Backend API not available, using fallback quote...')
    }
    
    // Use fallback quote if API fails
    setCurrentQuote({
      q: "The only way to do great work is to love what you do.",
      a: "Steve Jobs",
      h: "<blockquote>&ldquo;The only way to do great work is to love what you do.&rdquo; &mdash; <footer>Steve Jobs</footer></blockquote>"
    })
    
    setIsLoadingQuote(false)
  }

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise)
    setIsActive(false)
    setCurrentTime(0)
    setBreathingCount(0)
    setBreathingPhase('inhale')
  }

  const handleStart = () => {
    setIsActive(!isActive)
  }

  const handleSleepToolSelect = (tool) => {
    setSelectedSleepTool(tool)
    setIsSleepActive(false)
    setSleepTime(0)
  }

  const handleFocusToolSelect = (tool) => {
    setSelectedFocusTool(tool)
    setIsFocusActive(false)
    setFocusTime(0)
    if (tool.id === 1) { // Pomodoro Timer
      setPomodoroPhase('work')
      setPomodoroSessions(0)
    }
  }

  const handleSleepStart = () => {
    setIsSleepActive(!isSleepActive)
  }

  const handleFocusStart = () => {
    setIsFocusActive(!isFocusActive)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    if (!selectedExercise) return 0
    return (currentTime / selectedExercise.duration) * 100
  }

  const getSleepProgress = () => {
    if (!selectedSleepTool || selectedSleepTool.duration === 0) return 0
    return (sleepTime / selectedSleepTool.duration) * 100
  }

  const getFocusProgress = () => {
    if (!selectedFocusTool) return 0
    
    if (selectedFocusTool.id === 1) { // Pomodoro Timer
      const workDuration = 25 * 60
      const shortBreakDuration = 5 * 60
      const longBreakDuration = 15 * 60
      
      let currentPhaseDuration
      if (pomodoroPhase === 'work') {
        currentPhaseDuration = workDuration
      } else if (pomodoroPhase === 'shortBreak') {
        currentPhaseDuration = shortBreakDuration
      } else {
        currentPhaseDuration = longBreakDuration
      }
      
      return (focusTime / currentPhaseDuration) * 100
    } else if (selectedFocusTool.duration > 0) {
      return (focusTime / selectedFocusTool.duration) * 100
    }
    
    return 0
  }

  const getPomodoroPhaseInfo = () => {
    if (selectedFocusTool?.id !== 1) return null
    
    const workDuration = 25 * 60
    const shortBreakDuration = 5 * 60
    const longBreakDuration = 15 * 60
    
    let currentPhaseDuration, phaseName, phaseColor
    if (pomodoroPhase === 'work') {
      currentPhaseDuration = workDuration
      phaseName = 'Focus Time'
      phaseColor = '#ef4444'
    } else if (pomodoroPhase === 'shortBreak') {
      currentPhaseDuration = shortBreakDuration
      phaseName = 'Short Break'
      phaseColor = '#22c55e'
    } else {
      currentPhaseDuration = longBreakDuration
      phaseName = 'Long Break'
      phaseColor = '#3b82f6'
    }
    
    return { currentPhaseDuration, phaseName, phaseColor }
  }

  // Breathing exercise logic
  useEffect(() => {
    let interval
    if (isActive && selectedExercise && selectedExercise.pattern) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= selectedExercise.duration) {
            setIsActive(false)
            // Mark exercise as completed
            if (!completedExercises.includes(selectedExercise.id)) {
              setCompletedExercises(prev => [...prev, selectedExercise.id])
            }
            return selectedExercise.duration
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, selectedExercise, completedExercises])

  // Sleep tools timer logic
  useEffect(() => {
    let interval
    if (isSleepActive && selectedSleepTool && selectedSleepTool.duration > 0) {
      interval = setInterval(() => {
        setSleepTime(prev => {
          const newTime = prev + 1
          if (newTime >= selectedSleepTool.duration) {
            setIsSleepActive(false)
            // Mark tool as completed
            if (!completedExercises.includes(selectedSleepTool.id)) {
              setCompletedExercises(prev => [...prev, selectedSleepTool.id])
            }
            return selectedSleepTool.duration
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSleepActive, selectedSleepTool, completedExercises])

  // Focus tools timer logic
  useEffect(() => {
    let interval
    if (isFocusActive && selectedFocusTool) {
      interval = setInterval(() => {
        setFocusTime(prev => {
          const newTime = prev + 1
          
          // Pomodoro Timer logic
          if (selectedFocusTool.id === 1) {
            const workDuration = 25 * 60 // 25 minutes
            const shortBreakDuration = 5 * 60 // 5 minutes
            const longBreakDuration = 15 * 60 // 15 minutes
            
            let currentPhaseDuration
            if (pomodoroPhase === 'work') {
              currentPhaseDuration = workDuration
            } else if (pomodoroPhase === 'shortBreak') {
              currentPhaseDuration = shortBreakDuration
            } else {
              currentPhaseDuration = longBreakDuration
            }
            
            if (newTime >= currentPhaseDuration) {
              // Phase completed
              if (pomodoroPhase === 'work') {
                const newSessions = pomodoroSessions + 1
                setPomodoroSessions(newSessions)
                if (newSessions % 4 === 0) {
                  setPomodoroPhase('longBreak')
                } else {
                  setPomodoroPhase('shortBreak')
                }
              } else {
                setPomodoroPhase('work')
              }
              return 0
            }
          } else if (selectedFocusTool.duration > 0) {
            // Regular timer
            if (newTime >= selectedFocusTool.duration) {
              setIsFocusActive(false)
              // Mark tool as completed
              if (!completedExercises.includes(selectedFocusTool.id)) {
                setCompletedExercises(prev => [...prev, selectedFocusTool.id])
              }
              return selectedFocusTool.duration
            }
          }
          
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isFocusActive, selectedFocusTool, pomodoroPhase, pomodoroSessions, completedExercises])

  // Breathing phase animation
  useEffect(() => {
    if (isActive && selectedExercise && selectedExercise.pattern) {
      const pattern = selectedExercise.pattern
      const totalCycle = pattern.inhale + pattern.hold + pattern.exhale + (pattern.hold2 || 0)
      const cycleTime = currentTime % totalCycle
      
      if (cycleTime < pattern.inhale) {
        setBreathingPhase('inhale')
      } else if (cycleTime < pattern.inhale + pattern.hold) {
        setBreathingPhase('hold')
      } else if (cycleTime < pattern.inhale + pattern.hold + pattern.exhale) {
        setBreathingPhase('exhale')
      } else {
        setBreathingPhase('hold2')
      }
    }
  }, [currentTime, selectedExercise, isActive])

  const getBreathingInstructions = () => {
    if (!selectedExercise || !selectedExercise.pattern) return ''
    
    const pattern = selectedExercise.pattern
    const totalCycle = pattern.inhale + pattern.hold + pattern.exhale + (pattern.hold2 || 0)
    const cycleTime = currentTime % totalCycle
    
    switch (breathingPhase) {
      case 'inhale':
        const inhaleRemaining = pattern.inhale - cycleTime
        return `Breathe in for ${inhaleRemaining} seconds`
      case 'hold':
        const holdRemaining = pattern.inhale + pattern.hold - cycleTime
        return `Hold for ${holdRemaining} seconds`
      case 'exhale':
        const exhaleRemaining = pattern.inhale + pattern.hold + pattern.exhale - cycleTime
        return `Breathe out for ${exhaleRemaining} seconds`
      case 'hold2':
        const hold2Remaining = totalCycle - cycleTime
        return `Hold for ${hold2Remaining} seconds`
      default:
        return 'Follow the breathing pattern'
    }
  }

  const getBreathingAnimation = () => {
    if (!isActive || !selectedExercise || !selectedExercise.pattern) {
      return {
        width: '120px',
        height: '120px',
        transition: 'all 0.3s ease-in-out'
      }
    }

    const pattern = selectedExercise.pattern
    const totalCycle = pattern.inhale + pattern.hold + pattern.exhale + (pattern.hold2 || 0)
    const cycleTime = currentTime % totalCycle
    
    const baseSize = 120
    const maxSize = 200
    const minSize = 80
    
    let size = baseSize
    let transitionDuration = '1s'
    
    if (cycleTime < pattern.inhale) {
      // During inhale: gradually grow from base to max
      const progress = cycleTime / pattern.inhale
      size = baseSize + (maxSize - baseSize) * progress
      transitionDuration = '0.5s'
    } else if (cycleTime < pattern.inhale + pattern.hold) {
      // During first hold: stay at max size
      size = maxSize
      transitionDuration = '0.3s'
    } else if (cycleTime < pattern.inhale + pattern.hold + pattern.exhale) {
      // During exhale: gradually shrink from max to min
      const exhaleProgress = (cycleTime - pattern.inhale - pattern.hold) / pattern.exhale
      size = maxSize - (maxSize - minSize) * exhaleProgress
      transitionDuration = '0.5s'
    } else {
      // During second hold: stay at min size
      size = minSize
      transitionDuration = '0.3s'
    }
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      transition: `all ${transitionDuration} ease-in-out`
    }
  }

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#faf5ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={24} color="#8b5cf6" />
            </div>
            <h1 className="page-title">Mental Health Tools</h1>
          </div>
          <p className="page-subtitle">
            Comprehensive mental wellness tools including breathing exercises, sleep aids, focus techniques, and daily inspiration.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {toolCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category.toLowerCase())}
                className="btn"
                style={{
                  backgroundColor: activeTab === category.toLowerCase() ? '#2563eb' : 'white',
                  color: activeTab === category.toLowerCase() ? 'white' : '#6b7280',
                  border: activeTab === category.toLowerCase() ? 'none' : '1px solid #e5e7eb',
                  fontSize: '0.875rem',
                  padding: '0.75rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {category === 'Breathing' && <Wind size={16} />}
                {category === 'Sleep' && <Moon size={16} />}
                {category === 'Focus' && <Target size={16} />}
                {category === 'Quotes' && <Quote size={16} />}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Breathing Exercises Tab */}
        {activeTab === 'breathing' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Exercises List */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wind size={24} color="#2563eb" />
                Breathing Exercises
              </h2>
              <div className="grid grid-1" style={{ gap: '1rem' }}>
                {breathingExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="card"
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: selectedExercise?.id === exercise.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
                      backgroundColor: selectedExercise?.id === exercise.id ? '#eff6ff' : 'white'
                    }}
                    onClick={() => handleExerciseSelect(exercise)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ fontSize: '2rem' }}>{exercise.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontWeight: '600', fontSize: '1rem' }}>{exercise.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={16} color="#6b7280" />
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{formatTime(exercise.duration)}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                          {exercise.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {exercise.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                backgroundColor: exercise.color,
                                color: exercise.iconColor,
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                        {completedExercises.includes(exercise.id) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', color: '#22c55e' }}>
                            <CheckCircle size={16} fill="#22c55e" />
                            <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breathing Exercise Player */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {selectedExercise ? (
                <div className="card">
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                    {selectedExercise.title}
                  </h3>
                  
                  {/* Breathing Animation */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    {/* Breathing Circle */}
                    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                      <div
                        style={{
                          ...getBreathingAnimation(),
                          borderRadius: '50%',
                          backgroundColor: selectedExercise.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 30px ${selectedExercise.iconColor}30`,
                          position: 'relative'
                        }}
                      >
                        <div style={{ fontSize: '2rem', color: 'white' }}>{selectedExercise.icon}</div>
                      </div>
                      
                      {/* Breathing Phase Indicator */}
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: breathingPhase === 'inhale' ? '#22c55e' : 
                                        breathingPhase === 'exhale' ? '#ef4444' : '#f59e0b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          color: 'white',
                          fontWeight: 'bold',
                          animation: breathingPhase === 'inhale' || breathingPhase === 'exhale' ? 'pulse 1s infinite' : 'none'
                        }}>
                          {breathingPhase === 'inhale' ? '↑' : 
                           breathingPhase === 'exhale' ? '↓' : 
                           breathingPhase === 'hold' || breathingPhase === 'hold2' ? '⏸' : ''}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: selectedExercise.iconColor }}>
                        {getBreathingInstructions()}
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                        {selectedExercise.description}
                      </p>
                      
                      {/* Breathing Pattern Display */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.5rem',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        <span>Pattern:</span>
                        <span style={{ fontWeight: '600', color: selectedExercise.iconColor }}>
                          {selectedExercise.pattern.inhale}-{selectedExercise.pattern.hold}-{selectedExercise.pattern.exhale}
                          {selectedExercise.pattern.hold2 ? `-${selectedExercise.pattern.hold2}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

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
                          backgroundColor: selectedExercise.iconColor, 
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
                      <span>{formatTime(selectedExercise.duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <button
                      onClick={handleStart}
                      className="btn btn-primary"
                      style={{ 
                        padding: '1rem 2rem', 
                        borderRadius: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: selectedExercise.iconColor
                      }}
                    >
                      {isActive ? <Pause size={20} /> : <Play size={20} />}
                      {isActive ? 'Pause' : 'Start'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🫁</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Select a Breathing Exercise
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Choose a breathing technique to begin your practice.
                  </p>
                </div>
              )}

              {/* Benefits */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Benefits of Breathing Exercises
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { icon: Heart, text: 'Reduces stress and anxiety', color: '#ec4899' },
                    { icon: Moon, text: 'Improves sleep quality', color: '#0ea5e9' },
                    { icon: Brain, text: 'Enhances focus and clarity', color: '#8b5cf6' },
                    { icon: Activity, text: 'Activates relaxation response', color: '#22c55e' },
                  ].map((benefit, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <benefit.icon size={20} color={benefit.color} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Sleep Tools Tab */}
        {activeTab === 'sleep' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Sleep Tools List */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Moon size={24} color="#0ea5e9" />
                Sleep Tools
              </h2>
              <div className="grid grid-1" style={{ gap: '1rem' }}>
                {sleepTools.map((tool) => (
                  <div 
                    key={tool.id} 
                    className="card" 
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.2s ease',
                      border: selectedSleepTool?.id === tool.id ? '2px solid #0ea5e9' : '1px solid #e5e7eb',
                      backgroundColor: selectedSleepTool?.id === tool.id ? '#f0f9ff' : 'white'
                    }}
                    onClick={() => handleSleepToolSelect(tool)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ fontSize: '2rem' }}>{tool.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontWeight: '600', fontSize: '1rem' }}>{tool.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={16} color="#6b7280" />
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                              {tool.duration === 0 ? 'Continuous' : formatTime(tool.duration)}
                            </span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                          {tool.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {tool.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                backgroundColor: tool.color,
                                color: tool.iconColor,
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                        {completedExercises.includes(tool.id) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', color: '#22c55e' }}>
                            <CheckCircle size={16} fill="#22c55e" />
                            <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Tool Player */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {selectedSleepTool ? (
                <div className="card">
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                    {selectedSleepTool.title}
                  </h3>
                  
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selectedSleepTool.icon}</div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: selectedSleepTool.iconColor }}>
                      {selectedSleepTool.description}
                    </h4>
                    
                    {selectedSleepTool.duration > 0 && (
                      <>
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
                                backgroundColor: selectedSleepTool.iconColor, 
                                width: `${getSleepProgress()}%`,
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
                            <span>{formatTime(sleepTime)}</span>
                            <span>{formatTime(selectedSleepTool.duration)}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                      <button
                        onClick={handleSleepStart}
                        className="btn btn-primary"
                        style={{ 
                          padding: '1rem 2rem', 
                          borderRadius: '2rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: selectedSleepTool.iconColor
                        }}
                      >
                        {isSleepActive ? <Pause size={20} /> : <Play size={20} />}
                        {isSleepActive ? 'Pause' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌙</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Select a Sleep Tool
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Choose a sleep tool to begin your relaxation practice.
                  </p>
                </div>
              )}

              {/* Sleep Tips */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Sleep Hygiene Tips
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Keep a consistent sleep schedule',
                    'Create a relaxing bedtime routine',
                    'Avoid screens 1 hour before bed',
                    'Keep your bedroom cool and dark',
                    'Limit caffeine after 2 PM',
                    'Exercise regularly but not before bed'
                  ].map((tip, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Focus Tools Tab */}
        {activeTab === 'focus' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Focus Tools List */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={24} color="#ef4444" />
                Focus Tools
              </h2>
              <div className="grid grid-1" style={{ gap: '1rem' }}>
                {focusTools.map((tool) => (
                  <div 
                    key={tool.id} 
                    className="card" 
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.2s ease',
                      border: selectedFocusTool?.id === tool.id ? '2px solid #ef4444' : '1px solid #e5e7eb',
                      backgroundColor: selectedFocusTool?.id === tool.id ? '#fef2f2' : 'white'
                    }}
                    onClick={() => handleFocusToolSelect(tool)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ fontSize: '2rem' }}>{tool.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontWeight: '600', fontSize: '1rem' }}>{tool.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={16} color="#6b7280" />
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                              {tool.duration === 0 ? 'Continuous' : formatTime(tool.duration)}
                            </span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                          {tool.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {tool.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                backgroundColor: tool.color,
                                color: tool.iconColor,
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                        {completedExercises.includes(tool.id) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', color: '#22c55e' }}>
                            <CheckCircle size={16} fill="#22c55e" />
                            <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Tool Player */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {selectedFocusTool ? (
                <div className="card">
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                    {selectedFocusTool.title}
                  </h3>
                  
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selectedFocusTool.icon}</div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: selectedFocusTool.iconColor }}>
                      {selectedFocusTool.description}
                    </h4>
                    
                    {/* Pomodoro Timer Special Display */}
                    {selectedFocusTool.id === 1 && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            backgroundColor: getPomodoroPhaseInfo()?.phaseColor || '#ef4444',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                          }}>
                            {getPomodoroPhaseInfo()?.phaseName || 'Focus Time'}
                          </div>
                          <div style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                          }}>
                            Session {pomodoroSessions + 1}
                          </div>
                        </div>
                      </div>
                    )}

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
                            backgroundColor: selectedFocusTool.iconColor, 
                            width: `${getFocusProgress()}%`,
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
                        <span>{formatTime(focusTime)}</span>
                        <span>
                          {selectedFocusTool.id === 1 ? 
                            formatTime(getPomodoroPhaseInfo()?.currentPhaseDuration || 0) : 
                            formatTime(selectedFocusTool.duration)
                          }
                        </span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                      <button
                        onClick={handleFocusStart}
                        className="btn btn-primary"
                        style={{ 
                          padding: '1rem 2rem', 
                          borderRadius: '2rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: selectedFocusTool.iconColor
                        }}
                      >
                        {isFocusActive ? <Pause size={20} /> : <Play size={20} />}
                        {isFocusActive ? 'Pause' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Select a Focus Tool
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Choose a focus tool to begin your productivity session.
                  </p>
                </div>
              )}

              {/* Focus Tips */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Focus Enhancement Tips
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Eliminate distractions from your workspace',
                    'Use the Pomodoro Technique for work sessions',
                    'Take regular breaks to maintain energy',
                    'Practice mindfulness to improve concentration',
                    'Set clear goals for each work session',
                    'Create a dedicated workspace'
                  ].map((tip, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Daily Quotes Tab */}
        {activeTab === 'quotes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Daily Quote */}
            <div className="card" style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Quote size={24} color="#8b5cf6" />
                Daily Inspiration
              </h2>
              
              {isLoadingQuote ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #e5e7eb',
                    borderTop: '4px solid #8b5cf6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <p style={{ color: '#6b7280' }}>Loading today's inspiration...</p>
                </div>
              ) : currentQuote ? (
                <div>
                  <div style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.6', color: '#374151' }}>
                    "{currentQuote.q}"
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#8b5cf6', marginBottom: '1.5rem' }}>
                    — {currentQuote.a}
                  </div>
                  <button
                    onClick={loadRandomQuote}
                    className="btn btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
                  >
                    <RefreshCw size={16} />
                    New Quote
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Unable to load quote. Please try again.
                  </p>
                  <button
                    onClick={loadDailyQuote}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
                  >
                    <RefreshCw size={16} />
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Quote Categories */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Quote Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { category: 'Motivation', icon: '💪', color: '#ef4444' },
                  { category: 'Mindfulness', icon: '🧘', color: '#8b5cf6' },
                  { category: 'Success', icon: '🏆', color: '#f59e0b' },
                  { category: 'Peace', icon: '☮️', color: '#22c55e' },
                  { category: 'Wisdom', icon: '🧠', color: '#2563eb' },
                  { category: 'Love', icon: '❤️', color: '#ec4899' }
                ].map((cat, index) => (
                  <button
                    key={index}
                    className="btn btn-outline"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>
                      <span>{cat.category}</span>
                    </div>
                    <ArrowRight size={16} color="#6b7280" />
                  </button>
                ))}
              </div>
            </div>

            {/* Attribution */}
            <div className="card" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#374151' }}>
                Quote Attribution
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
                Inspirational quotes provided by{' '}
                <a 
                  href="https://zenquotes.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}
                >
                  ZenQuotes API
                  <ExternalLink size={12} style={{ marginLeft: '0.25rem', display: 'inline' }} />
                </a>
                . Visit their website for more inspiring content and API access.
              </p>
            </div>
          </div>
        )}

        {/* CSS Animations */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              opacity: 1;
            }
            50% { 
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
        `}</style>
      </div>
    </div>
  )
}