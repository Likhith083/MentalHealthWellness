import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Heart, 
  BookOpen, 
  Brain, 
  FileText, 
  Target,
  Award,
  Clock,
  Activity,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  AlertCircle,
  Star,
  Users,
  MessageCircle,
  Phone,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react'
import { Link } from 'react-router-dom'
import apiService from '../services/api'

// Goal management constants
const goalCategories = [
  { id: 'mood', name: 'Mood & Emotions', color: '#ef4444', icon: '😊' },
  { id: 'journaling', name: 'Journaling', color: '#2563eb', icon: '📝' },
  { id: 'meditation', name: 'Meditation', color: '#8b5cf6', icon: '🧘' },
  { id: 'exercise', name: 'Physical Health', color: '#22c55e', icon: '💪' },
  { id: 'social', name: 'Social Connections', color: '#f97316', icon: '👥' },
  { id: 'learning', name: 'Learning & Growth', color: '#06b6d4', icon: '📚' },
  { id: 'sleep', name: 'Sleep & Rest', color: '#6366f1', icon: '😴' },
  { id: 'other', name: 'Other', color: '#6b7280', icon: '🎯' }
]

const goalTypes = [
  { id: 'daily', name: 'Daily', description: 'Complete every day' },
  { id: 'weekly', name: 'Weekly', description: 'Complete X times per week' },
  { id: 'monthly', name: 'Monthly', description: 'Complete by end of month' },
  { id: 'one-time', name: 'One-time', description: 'Complete once by deadline' }
]

const priorityLevels = [
  { id: 'low', name: 'Low', color: '#22c55e' },
  { id: 'medium', name: 'Medium', color: '#eab308' },
  { id: 'high', name: 'High', color: '#ef4444' }
]

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' or 'goals'
  const [dashboardData, setDashboardData] = useState({
    mood: {
      current: 3,
      average: 3.2,
      trend: 'up',
      entries: [],
      streak: 0
    },
    journal: {
      totalEntries: 0,
      thisWeek: 0,
      lastEntry: null,
      averageMood: 0,
      mostUsedTemplate: ''
    },
    meditation: {
      totalSessions: 0,
      totalTime: 0,
      streak: 0,
      thisWeek: 0,
      lastSession: null
    },
    assessments: {
      totalCompleted: 0,
      recentResults: [],
      averageScore: 0,
      lastAssessment: null
    },
    goals: {
      active: 0,
      completed: 0,
      overdue: 0,
      recent: []
    },
    insights: {
      moodPattern: '',
      recommendations: [],
      achievements: [],
      weeklyProgress: 0
    }
  })
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [showInsights, setShowInsights] = useState(false)
  
  // Goal management state
  const [goals, setGoals] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [goalStats, setGoalStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    overdue: 0,
    completionRate: 0
  })
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'mood',
    type: 'daily',
    priority: 'medium',
    targetValue: 1,
    currentValue: 0,
    dueDate: '',
    isActive: true,
    reminder: false,
    reminderTime: '09:00'
  })
  
  const userId = 'anonymous' // In production, this would come from authentication

  useEffect(() => {
    loadDashboardData()
    loadGoals()
  }, [selectedTimeframe])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Load all dashboard data in parallel
      const [moodData, journalData, meditationData, assessmentData] = await Promise.all([
        loadMoodData(),
        loadJournalData(),
        loadMeditationData(),
        loadAssessmentData()
      ])

      setDashboardData({
        mood: moodData,
        journal: journalData,
        meditation: meditationData,
        assessments: assessmentData,
        goals: {
          active: 3,
          completed: 2,
          overdue: 1,
          recent: [
            { id: 1, title: 'Practice daily meditation', progress: 80, dueDate: '2024-01-15' },
            { id: 2, title: 'Write in journal 3x per week', progress: 100, dueDate: '2024-01-10' },
            { id: 3, title: 'Complete stress assessment', progress: 0, dueDate: '2024-01-20' }
          ]
        },
        insights: generateInsights(moodData, journalData, meditationData, assessmentData)
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMoodData = async () => {
    try {
      const [entriesResponse, statsResponse] = await Promise.all([
        apiService.getMoodEntries(userId, 30),
        apiService.getMoodStats(userId, 30)
      ])

      const entries = entriesResponse.success ? entriesResponse.data : []
      const stats = statsResponse.success ? statsResponse.data : { averageMood: 3, totalEntries: 0 }

      return {
        current: entries[0]?.mood || 3,
        average: stats.averageMood || 3,
        trend: calculateTrend(entries.slice(0, 7)),
        entries: entries.slice(0, 7),
        streak: calculateStreak(entries)
      }
    } catch (error) {
      console.error('Error loading mood data:', error)
      return { current: 3, average: 3, trend: 'stable', entries: [], streak: 0 }
    }
  }

  const loadJournalData = async () => {
    try {
      const [entriesResponse, statsResponse] = await Promise.all([
        apiService.getJournalEntries(userId, 10),
        apiService.getJournalStats(userId, 30)
      ])

      const entries = entriesResponse.success ? entriesResponse.data : []
      const stats = statsResponse.success ? statsResponse.data : { totalEntries: 0, averageMood: 0, mostUsedTemplate: '' }

      return {
        totalEntries: stats.totalEntries || 0,
        thisWeek: entries.filter(entry => 
          new Date(entry.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length,
        lastEntry: entries[0] || null,
        averageMood: stats.averageMood || 0,
        mostUsedTemplate: stats.mostUsedTemplate || ''
      }
    } catch (error) {
      console.error('Error loading journal data:', error)
      return { totalEntries: 0, thisWeek: 0, lastEntry: null, averageMood: 0, mostUsedTemplate: '' }
    }
  }

  const loadMeditationData = async () => {
    try {
      const [sessionsResponse, statsResponse] = await Promise.all([
        apiService.getMeditationSessions(userId, 10),
        apiService.getMeditationStats(userId, 30)
      ])

      const sessions = sessionsResponse.success ? sessionsResponse.data : []
      const stats = statsResponse.success ? statsResponse.data : { totalSessions: 0, totalTime: 0, streak: 0 }

      return {
        totalSessions: stats.totalSessions || 0,
        totalTime: stats.totalTime || 0,
        streak: stats.streak || 0,
        thisWeek: sessions.filter(session => 
          new Date(session.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length,
        lastSession: sessions[0] || null
      }
    } catch (error) {
      console.error('Error loading meditation data:', error)
      return { totalSessions: 0, totalTime: 0, streak: 0, thisWeek: 0, lastSession: null }
    }
  }

  const loadAssessmentData = async () => {
    try {
      const [resultsResponse, statsResponse] = await Promise.all([
        apiService.getAssessmentResults(userId, 10),
        apiService.getAssessmentStats(userId, 30)
      ])

      const results = resultsResponse.success ? resultsResponse.data : []
      const stats = statsResponse.success ? statsResponse.data : { totalCompleted: 0, averageScore: 0 }

      return {
        totalCompleted: stats.totalCompleted || 0,
        recentResults: results.slice(0, 3),
        averageScore: stats.averageScore || 0,
        lastAssessment: results[0] || null
      }
    } catch (error) {
      console.error('Error loading assessment data:', error)
      return { totalCompleted: 0, recentResults: [], averageScore: 0, lastAssessment: null }
    }
  }

  const calculateTrend = (entries) => {
    if (entries.length < 2) return 'stable'
    const recent = entries.slice(0, 3).reduce((sum, entry) => sum + entry.mood, 0) / 3
    const older = entries.slice(3, 6).reduce((sum, entry) => sum + entry.mood, 0) / 3
    if (recent > older + 0.5) return 'up'
    if (recent < older - 0.5) return 'down'
    return 'stable'
  }

  const calculateStreak = (entries) => {
    if (entries.length === 0) return 0
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let i = 0; i < entries.length; i++) {
      const entryDate = new Date(entries[i].date)
      entryDate.setHours(0, 0, 0, 0)
      const daysDiff = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === i) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const generateInsights = (mood, journal, meditation, assessments) => {
    const insights = {
      moodPattern: '',
      recommendations: [],
      achievements: [],
      weeklyProgress: 0
    }

    // Mood pattern analysis
    if (mood.trend === 'up') {
      insights.moodPattern = 'Your mood has been improving recently!'
    } else if (mood.trend === 'down') {
      insights.moodPattern = 'Your mood has been declining. Consider reaching out for support.'
    } else {
      insights.moodPattern = 'Your mood has been stable recently.'
    }

    // Generate recommendations
    if (mood.average < 3) {
      insights.recommendations.push('Consider trying a meditation session to boost your mood')
    }
    if (journal.thisWeek < 3) {
      insights.recommendations.push('Try journaling more frequently to process your thoughts')
    }
    if (meditation.streak === 0) {
      insights.recommendations.push('Start a meditation practice to build mindfulness')
    }
    if (assessments.totalCompleted === 0) {
      insights.recommendations.push('Take a mental health assessment to track your progress')
    }

    // Generate achievements
    if (mood.streak >= 7) {
      insights.achievements.push({ title: 'Mood Tracking Master', description: '7-day mood tracking streak!', icon: Award })
    }
    if (journal.totalEntries >= 10) {
      insights.achievements.push({ title: 'Journaling Enthusiast', description: '10+ journal entries completed', icon: BookOpen })
    }
    if (meditation.streak >= 5) {
      insights.achievements.push({ title: 'Meditation Pro', description: '5-day meditation streak!', icon: Brain })
    }

    // Calculate weekly progress
    const totalActivities = mood.entries.length + journal.thisWeek + meditation.thisWeek + assessments.recentResults.length
    insights.weeklyProgress = Math.min(100, (totalActivities / 20) * 100)

    return insights
  }

  // Goal management functions
  const loadGoals = async () => {
    try {
      // In a real implementation, this would call the API
      // const response = await apiService.getGoals(userId)
      // For now, we'll use mock data
      const mockGoals = [
        {
          id: 1,
          title: 'Practice daily meditation',
          description: 'Meditate for at least 10 minutes every day',
          category: 'meditation',
          type: 'daily',
          priority: 'high',
          targetValue: 1,
          currentValue: 0,
          dueDate: '2024-02-01',
          isActive: true,
          reminder: true,
          reminderTime: '08:00',
          createdAt: new Date().toISOString(),
          progress: 0,
          status: 'active'
        },
        {
          id: 2,
          title: 'Write in journal 3x per week',
          description: 'Write at least 3 journal entries per week',
          category: 'journaling',
          type: 'weekly',
          priority: 'medium',
          targetValue: 3,
          currentValue: 2,
          dueDate: '2024-01-31',
          isActive: true,
          reminder: false,
          reminderTime: '20:00',
          createdAt: new Date().toISOString(),
          progress: 67,
          status: 'active'
        },
        {
          id: 3,
          title: 'Complete stress assessment',
          description: 'Take the stress assessment to track progress',
          category: 'mood',
          type: 'one-time',
          priority: 'low',
          targetValue: 1,
          currentValue: 1,
          dueDate: '2024-01-15',
          isActive: false,
          reminder: false,
          reminderTime: '10:00',
          createdAt: new Date().toISOString(),
          progress: 100,
          status: 'completed'
        }
      ]
      setGoals(mockGoals)
      calculateGoalStats(mockGoals)
    } catch (error) {
      console.error('Error loading goals:', error)
    }
  }

  const calculateGoalStats = (goalsList) => {
    const total = goalsList.length
    const active = goalsList.filter(goal => goal.status === 'active').length
    const completed = goalsList.filter(goal => goal.status === 'completed').length
    const overdue = goalsList.filter(goal => 
      goal.status === 'active' && 
      goal.dueDate && 
      new Date(goal.dueDate) < new Date()
    ).length
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    setGoalStats({ total, active, completed, overdue, completionRate })
  }

  const handleCreateGoal = async () => {
    try {
      const goalData = {
        ...newGoal,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        progress: 0,
        status: 'active'
      }

      // In a real implementation, this would call the API
      // await apiService.createGoal(goalData)
      
      setGoals(prev => [goalData, ...prev])
      calculateGoalStats([goalData, ...goals])
      setShowCreateModal(false)
      resetGoalForm()
    } catch (error) {
      console.error('Error creating goal:', error)
    }
  }

  const handleUpdateGoal = async (goalId, updates) => {
    try {
      // In a real implementation, this would call the API
      // await apiService.updateGoal(goalId, updates)
      
      setGoals(prev => prev.map(goal => 
        goal.id === goalId ? { ...goal, ...updates } : goal
      ))
      calculateGoalStats(goals.map(goal => 
        goal.id === goalId ? { ...goal, ...updates } : goal
      ))
      setEditingGoal(null)
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        // In a real implementation, this would call the API
        // await apiService.deleteGoal(goalId)
        
        setGoals(prev => prev.filter(goal => goal.id !== goalId))
        calculateGoalStats(goals.filter(goal => goal.id !== goalId))
      } catch (error) {
        console.error('Error deleting goal:', error)
      }
    }
  }

  const handleProgressUpdate = (goalId, increment = 1) => {
    const goal = goals.find(g => g.id === goalId)
    if (!goal) return

    const newValue = Math.min(goal.currentValue + increment, goal.targetValue)
    const newProgress = Math.round((newValue / goal.targetValue) * 100)
    const newStatus = newProgress >= 100 ? 'completed' : goal.status

    handleUpdateGoal(goalId, {
      currentValue: newValue,
      progress: newProgress,
      status: newStatus
    })
  }

  const resetGoalForm = () => {
    setNewGoal({
      title: '',
      description: '',
      category: 'mood',
      type: 'daily',
      priority: 'medium',
      targetValue: 1,
      currentValue: 0,
      dueDate: '',
      isActive: true,
      reminder: false,
      reminderTime: '09:00'
    })
  }

  const getCategoryInfo = (categoryId) => {
    return goalCategories.find(cat => cat.id === categoryId) || goalCategories[0]
  }

  const getPriorityColor = (priority) => {
    const priorityInfo = priorityLevels.find(p => p.id === priority)
    return priorityInfo ? priorityInfo.color : '#6b7280'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} color="#22c55e" />
      case 'overdue': return <AlertCircle size={16} color="#ef4444" />
      default: return <Clock size={16} color="#6b7280" />
    }
  }

  const isOverdue = (dueDate) => {
    return dueDate && new Date(dueDate) < new Date()
  }

  const filteredGoals = goals.filter(goal => {
    const matchesCategory = selectedCategory === 'All' || goal.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || goal.status === selectedStatus
    const matchesSearch = searchQuery === '' || 
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesStatus && matchesSearch
  })

  const getMoodEmoji = (mood) => {
    const emojis = ['😢', '😔', '😐', '😊', '😄']
    return emojis[Math.round(mood) - 1] || '😐'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp size={16} color="#22c55e" />
      case 'down': return <ArrowDown size={16} color="#ef4444" />
      default: return <Minus size={16} color="#6b7280" />
    }
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  if (isLoading) {
    return (
      <div className="page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              border: '3px solid #e5e7eb', 
              borderTop: '3px solid #2563eb', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p style={{ color: '#6b7280' }}>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={24} color="#0ea5e9" />
            </div>
            <h1 className="page-title">Dashboard & Goals</h1>
          </div>
          <p className="page-subtitle">
            Your mental health overview, progress tracking, and goal management hub.
          </p>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'overview' ? '#2563eb' : 'white',
                color: activeTab === 'overview' ? 'white' : '#6b7280',
                border: activeTab === 'overview' ? 'none' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <BarChart3 size={16} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('goals')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'goals' ? '#2563eb' : 'white',
                color: activeTab === 'goals' ? 'white' : '#6b7280',
                border: activeTab === 'goals' ? 'none' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Target size={16} />
              Goals
            </button>
          </div>
          
          {/* Timeframe Selector (only for overview tab) */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {['week', 'month', 'year'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="btn"
                  style={{
                    backgroundColor: selectedTimeframe === timeframe ? '#2563eb' : 'white',
                    color: selectedTimeframe === timeframe ? 'white' : '#6b7280',
                    border: selectedTimeframe === timeframe ? 'none' : '1px solid #e5e7eb',
                    textTransform: 'capitalize'
                  }}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem', 
              marginBottom: '2rem' 
            }}>
              <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                  {getMoodEmoji(dashboardData.mood.current)}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {dashboardData.mood.current}/5
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Current Mood</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                  {getTrendIcon(dashboardData.mood.trend)}
                  <span style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                    {dashboardData.mood.trend}
                  </span>
                </div>
              </div>

              <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📝</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {dashboardData.journal.thisWeek}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Journal Entries This Week</div>
              </div>

              <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🧘</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {dashboardData.meditation.streak}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Meditation Streak (Days)</div>
              </div>

              <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {dashboardData.goals.completed}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Goals Completed</div>
              </div>
            </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Mood Tracking */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={20} color="#ef4444" />
                Mood Tracking
              </h3>
              <Link to="/mood-tracking" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                View All
              </Link>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average Mood</span>
                <span style={{ fontWeight: '600' }}>{dashboardData.mood.average.toFixed(1)}/5</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#e5e7eb', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(dashboardData.mood.average / 5) * 100}%`, 
                  height: '100%', 
                  backgroundColor: '#ef4444',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Current Streak</span>
              <span style={{ fontWeight: '600', color: '#22c55e' }}>{dashboardData.mood.streak} days</span>
            </div>

            {dashboardData.mood.entries.length > 0 && (
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Recent Entries</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {dashboardData.mood.entries.slice(0, 7).map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        backgroundColor: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem'
                      }}
                      title={`${new Date(entry.date).toLocaleDateString()}: ${entry.mood}/5`}
                    >
                      {getMoodEmoji(entry.mood)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Journal Overview */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} color="#2563eb" />
                Journal Overview
              </h3>
              <Link to="/journaling" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                View All
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Entries</span>
                <span style={{ fontWeight: '600' }}>{dashboardData.journal.totalEntries}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>This Week</span>
                <span style={{ fontWeight: '600' }}>{dashboardData.journal.thisWeek}</span>
              </div>
              {dashboardData.journal.mostUsedTemplate && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Top Template</span>
                  <span style={{ fontWeight: '600', fontSize: '0.75rem' }}>{dashboardData.journal.mostUsedTemplate}</span>
                </div>
              )}
              {dashboardData.journal.lastEntry && (
                <div style={{ 
                  padding: '0.75rem', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem'
                }}>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    Latest Entry: {dashboardData.journal.lastEntry.title}
                  </div>
                  <div style={{ color: '#6b7280' }}>
                    {new Date(dashboardData.journal.lastEntry.date).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Meditation Progress */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Brain size={20} color="#8b5cf6" />
                Meditation Progress
              </h3>
              <Link to="/meditation" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                View All
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Sessions</span>
                <span style={{ fontWeight: '600' }}>{dashboardData.meditation.totalSessions}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Time</span>
                <span style={{ fontWeight: '600' }}>{formatTime(dashboardData.meditation.totalTime)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Current Streak</span>
                <span style={{ fontWeight: '600', color: '#22c55e' }}>{dashboardData.meditation.streak} days</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>This Week</span>
                <span style={{ fontWeight: '600' }}>{dashboardData.meditation.thisWeek} sessions</span>
              </div>
            </div>
          </div>

          {/* Goals & Achievements */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={20} color="#f97316" />
                Goals & Achievements
              </h3>
              <Link to="/goals" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                Manage
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Goals</span>
                <span style={{ fontWeight: '600' }}>{dashboardData.goals.active}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed</span>
                <span style={{ fontWeight: '600', color: '#22c55e' }}>{dashboardData.goals.completed}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Overdue</span>
                <span style={{ fontWeight: '600', color: '#ef4444' }}>{dashboardData.goals.overdue}</span>
              </div>
              
              {dashboardData.goals.recent.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>Recent Goals</div>
                  {dashboardData.goals.recent.slice(0, 2).map((goal) => (
                    <div key={goal.id} style={{ 
                      padding: '0.5rem', 
                      backgroundColor: '#f9fafb', 
                      borderRadius: '0.375rem',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                        {goal.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ 
                          flex: 1, 
                          height: '4px', 
                          backgroundColor: '#e5e7eb', 
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            width: `${goal.progress}%`, 
                            height: '100%', 
                            backgroundColor: goal.progress === 100 ? '#22c55e' : '#2563eb'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.625rem', color: '#6b7280' }}>
                          {goal.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Insights & Recommendations */}
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} color="#eab308" />
                Insights & Recommendations
              </h3>
              <button 
                onClick={() => setShowInsights(!showInsights)}
                className="btn btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
              >
                {showInsights ? 'Hide' : 'Show'} Details
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Mood Pattern</div>
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: '#f0f9ff', 
                borderRadius: '0.5rem',
                border: '1px solid #bfdbfe'
              }}>
                {dashboardData.insights.moodPattern}
              </div>
            </div>

            {showInsights && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {/* Recommendations */}
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Recommendations</div>
                  {dashboardData.insights.recommendations.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {dashboardData.insights.recommendations.map((rec, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '0.5rem',
                          padding: '0.5rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '0.375rem'
                        }}>
                          <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{rec}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontStyle: 'italic' }}>
                      Keep up the great work! No specific recommendations at this time.
                    </div>
                  )}
                </div>

                {/* Achievements */}
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Recent Achievements</div>
                  {dashboardData.insights.achievements.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {dashboardData.insights.achievements.map((achievement, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          padding: '0.5rem',
                          backgroundColor: '#fef3c7',
                          borderRadius: '0.375rem'
                        }}>
                          <achievement.icon size={16} color="#f59e0b" />
                          <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '500' }}>{achievement.title}</div>
                            <div style={{ fontSize: '0.625rem', color: '#6b7280' }}>{achievement.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontStyle: 'italic' }}>
                      Complete activities to unlock achievements!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

            {/* Quick Actions */}
            <div className="card" style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={20} color="#2563eb" />
                Quick Actions
              </h3>
              <div className="grid grid-4">
                <Link to="/mood-tracking" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Heart size={16} />
                  Track Mood
                </Link>
                <Link to="/journaling" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <BookOpen size={16} />
                  Write Journal
                </Link>
                <Link to="/meditation" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Brain size={16} />
                  Meditate
                </Link>
                <Link to="/assessments" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <FileText size={16} />
                  Take Assessment
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Goals Tab Content */}
        {activeTab === 'goals' && (
          <>
            {/* Goal Stats Overview */}
            <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {goalStats.total}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Goals</div>
              </div>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {goalStats.active}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Goals</div>
              </div>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {goalStats.completed}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed</div>
              </div>
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {goalStats.completionRate}%
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Success Rate</div>
              </div>
            </div>

            {/* Goal Controls */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="text"
                      placeholder="Search goals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input"
                      style={{ paddingLeft: '2.5rem', width: '200px' }}
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input"
                    style={{ width: '150px' }}
                  >
                    <option value="All">All Categories</option>
                    {goalCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="input"
                    style={{ width: '120px' }}
                  >
                    <option value="All">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Plus size={16} />
                  New Goal
                </button>
              </div>
            </div>

            {/* Goals List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredGoals.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    No goals found
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                    {searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All' 
                      ? 'Try adjusting your filters to see more goals.'
                      : 'Create your first goal to start tracking your mental health journey.'
                    }
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
                  >
                    <Plus size={16} />
                    Create Your First Goal
                  </button>
                </div>
              ) : (
                filteredGoals.map((goal) => {
                  const categoryInfo = getCategoryInfo(goal.category)
                  const priorityColor = getPriorityColor(goal.priority)
                  const isOverdueGoal = isOverdue(goal.dueDate)
                  
                  return (
                    <div key={goal.id} className="card">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        {/* Category Icon */}
                        <div style={{ 
                          width: '3rem', 
                          height: '3rem', 
                          backgroundColor: `${categoryInfo.color}20`, 
                          borderRadius: '0.75rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          flexShrink: 0
                        }}>
                          {categoryInfo.icon}
                        </div>

                        {/* Goal Content */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div>
                              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                {goal.title}
                              </h3>
                              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                {goal.description}
                              </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {getStatusIcon(goal.status)}
                              <div style={{ 
                                padding: '0.25rem 0.75rem', 
                                backgroundColor: `${priorityColor}20`, 
                                color: priorityColor,
                                borderRadius: '1rem',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}>
                                {goal.priority}
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                {goal.currentValue} / {goal.targetValue} {goal.type === 'daily' ? 'times' : goal.type === 'weekly' ? 'times this week' : 'completed'}
                              </span>
                              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280' }}>
                                {goal.progress}%
                              </span>
                            </div>
                            <div style={{ 
                              width: '100%', 
                              height: '8px', 
                              backgroundColor: '#e5e7eb', 
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div style={{ 
                                width: `${goal.progress}%`, 
                                height: '100%', 
                                backgroundColor: goal.progress === 100 ? '#22c55e' : categoryInfo.color,
                                borderRadius: '4px',
                                transition: 'width 0.3s ease'
                              }} />
                            </div>
                          </div>

                          {/* Goal Details */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Calendar size={12} />
                              <span>{goal.type}</span>
                            </div>
                            {goal.dueDate && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={12} />
                                <span style={{ color: isOverdueGoal ? '#ef4444' : '#6b7280' }}>
                                  Due: {new Date(goal.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {goal.reminder && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <AlertCircle size={12} />
                                <span>Reminder: {goal.reminderTime}</span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {goal.status === 'active' && goal.progress < 100 && (
                              <button
                                onClick={() => handleProgressUpdate(goal.id)}
                                className="btn btn-primary"
                                style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                              >
                                +1 Progress
                              </button>
                            )}
                            <button
                              onClick={() => setEditingGoal(goal)}
                              className="btn btn-outline"
                              style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                            >
                              <Edit3 size={12} style={{ marginRight: '0.25rem' }} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteGoal(goal.id)}
                              className="btn btn-outline"
                              style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', color: '#ef4444', borderColor: '#ef4444' }}
                            >
                              <Trash2 size={12} style={{ marginRight: '0.25rem' }} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </>
        )}

        {/* Create/Edit Goal Modal */}
        {(showCreateModal || editingGoal) && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingGoal(null)
                    resetGoalForm()
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  <X size={24} color="#6b7280" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                if (editingGoal) {
                  handleUpdateGoal(editingGoal.id, newGoal)
                } else {
                  handleCreateGoal()
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    className="input"
                    placeholder="e.g., Practice daily meditation"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    className="textarea"
                    rows="3"
                    placeholder="Describe your goal in more detail..."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                      Category *
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                      className="input"
                      required
                    >
                      {goalCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                      Type *
                    </label>
                    <select
                      value={newGoal.type}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value }))}
                      className="input"
                      required
                    >
                      {goalTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                      Priority
                    </label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value }))}
                      className="input"
                    >
                      {priorityLevels.map(level => (
                        <option key={level.id} value={level.id}>{level.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                      Target Value
                    </label>
                    <input
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: parseInt(e.target.value) || 1 }))}
                      className="input"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="input"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={newGoal.reminder}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, reminder: e.target.checked }))}
                    />
                    <span style={{ fontSize: '0.875rem' }}>Set reminder</span>
                  </label>
                  {newGoal.reminder && (
                    <input
                      type="time"
                      value={newGoal.reminderTime}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, reminderTime: e.target.value }))}
                      className="input"
                      style={{ width: '120px' }}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false)
                      setEditingGoal(null)
                      resetGoalForm()
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Save size={16} />
                    {editingGoal ? 'Update Goal' : 'Create Goal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
