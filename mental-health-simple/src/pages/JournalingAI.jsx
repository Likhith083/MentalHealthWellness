import { useState, useEffect, useRef } from 'react'
import { 
  BookOpen, Save, Plus, Calendar, Search, Filter, Heart, Lightbulb, PenTool, Trash2, Edit3, Download, Tag, FileText, TrendingUp, BarChart3, Download as ExportIcon,
  MessageCircle, Send, Bot, User, Loader, Settings, AlertCircle, CheckCircle, RotateCcw, Shield, Brain, Database, Check
} from 'lucide-react'
import apiService from '../services/api'

// Journal Templates
const journalTemplates = [
  {
    id: 1,
    title: 'Gratitude Practice',
    description: 'Write about three things you\'re grateful for today and why they matter to you.',
    category: 'Gratitude',
    color: '#f0fdf4',
    iconColor: '#22c55e',
    prompts: [
      'What are three things that went well today?',
      'Who made a positive impact on your day?',
      'What small moments brought you joy?',
      'What are you looking forward to tomorrow?'
    ],
    moodIntegration: true,
  },
  {
    id: 2,
    title: 'Emotional Check-in',
    description: 'How are you feeling right now? What emotions are present, and what might be causing them?',
    category: 'Emotions',
    color: '#eff6ff',
    iconColor: '#2563eb',
    prompts: [
      'What emotions am I experiencing right now?',
      'On a scale of 1-10, how intense are these feelings?',
      'What might be triggering these emotions?',
      'How can I care for myself in this moment?'
    ],
    moodIntegration: true,
  },
  {
    id: 3,
    title: 'Daily Reflection',
    description: 'What was the highlight of your day? What challenged you, and how did you handle it?',
    category: 'Reflection',
    color: '#faf5ff',
    iconColor: '#8b5cf6',
    prompts: [
      'What was the best part of my day?',
      'What challenged me today and how did I respond?',
      'What did I learn about myself today?',
      'What would I do differently tomorrow?'
    ],
    moodIntegration: true,
  },
  {
    id: 4,
    title: 'Goal Progress',
    description: 'Reflect on your progress toward personal goals and what steps you can take next.',
    category: 'Goals',
    color: '#fef3c7',
    iconColor: '#f59e0b',
    prompts: [
      'What goals am I working toward?',
      'What progress did I make today?',
      'What obstacles am I facing?',
      'What will I do differently tomorrow?'
    ],
    moodIntegration: false,
  },
  {
    id: 5,
    title: 'Relationship Check-in',
    description: 'Reflect on your relationships and how you can nurture them.',
    category: 'Relationships',
    color: '#fdf2f8',
    iconColor: '#ec4899',
    prompts: [
      'How are my relationships doing?',
      'Who do I need to connect with?',
      'What relationship challenges am I facing?',
      'How can I be a better friend/partner/family member?'
    ],
    moodIntegration: true,
  }
]

const moodOptions = [
  { value: 1, label: 'Very Low', emoji: '😢', color: '#ef4444' },
  { value: 2, label: 'Low', emoji: '😔', color: '#f97316' },
  { value: 3, label: 'Neutral', emoji: '😐', color: '#eab308' },
  { value: 4, label: 'Good', emoji: '😊', color: '#22c55e' },
  { value: 5, label: 'Excellent', emoji: '😄', color: '#16a34a' }
]

// Mood Tracking Data
const moodTrackingOptions = [
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

// AI Assistant Constants
const MENTAL_HEALTH_SYSTEM_PROMPT = `You are a compassionate and professional mental health AI assistant. Your role is to provide supportive, evidence-based guidance while maintaining appropriate boundaries. 

Key guidelines:
- Always prioritize user safety and well-being
- Provide supportive, non-judgmental responses
- Suggest professional help when appropriate
- Use evidence-based mental health information
- Maintain confidentiality and respect
- Never provide medical diagnoses or replace professional therapy
- Encourage healthy coping strategies
- Be warm, empathetic, and understanding

Remember: You are here to support, not to replace professional mental health care.`

const QUICK_PROMPTS = [
  "I'm feeling anxious today",
  "Help me with stress management",
  "I'm having trouble sleeping",
  "I feel overwhelmed",
  "I need coping strategies",
  "I'm feeling lonely",
  "Help me with mindfulness",
  "I'm struggling with motivation"
]

export default function JournalingAI() {
  const [activeTab, setActiveTab] = useState('journaling') // 'journaling', 'ai', or 'mood'
  
  // Journaling state
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedMood, setSelectedMood] = useState(null)
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [journalEntries, setJournalEntries] = useState([])
  const [stats, setStats] = useState({
    totalEntries: 0,
    averageMood: 0,
    mostUsedTemplate: ''
  })
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('json')
  
  // Mood Tracking state
  const [selectedMoodTracking, setSelectedMoodTracking] = useState('')
  const [selectedActivities, setSelectedActivities] = useState([])
  const [moodNotes, setMoodNotes] = useState('')
  const [isMoodSubmitted, setIsMoodSubmitted] = useState(false)
  const [isMoodLoading, setIsMoodLoading] = useState(false)
  const [moodEntries, setMoodEntries] = useState([])
  const [moodStats, setMoodStats] = useState({ averageMood: 0, totalEntries: 0, moodDistribution: [] })
  
  // AI Assistant state
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434')
  const [selectedModel, setSelectedModel] = useState('llama2')
  const [availableModels, setAvailableModels] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState('')
  const [useJournalData, setUseJournalData] = useState(false)
  const [journalConsent, setJournalConsent] = useState(false)
  const messagesEndRef = useRef(null)
  
  const userId = 'anonymous'

  useEffect(() => {
    loadJournalEntries()
    loadStats()
    loadMoodEntries()
    loadMoodStats()
    checkOllamaConnection()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize AI with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: Date.now(),
        type: 'bot',
        content: "Hello! I'm your mental health AI assistant. I'm here to provide supportive guidance and help you with your mental wellness journey. How can I help you today?",
        timestamp: new Date()
      }])
    }
  }, [])

  // Journaling functions
  const loadJournalEntries = async () => {
    try {
      const response = await apiService.getJournalEntries(userId, 20)
      if (response.success) {
        setJournalEntries(response.data)
      }
    } catch (error) {
      console.error('Error loading journal entries:', error)
    }
  }

  const loadStats = async () => {
    try {
      const response = await apiService.getJournalStats(userId, 30)
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      console.error('Error loading journal stats:', error)
    }
  }

  const handleSave = async () => {
    if (!content.trim()) return

    try {
      setIsLoading(true)
      const journalData = {
        userId,
        title: title || selectedTemplate?.title || 'Untitled Entry',
        content,
        template: selectedTemplate,
        mood: selectedMood,
        moodEmoji: selectedMood ? moodOptions.find(m => m.value === selectedMood)?.emoji : null,
        tags,
        date: new Date()
      }

      const response = await apiService.createJournalEntry(journalData)
      if (response.success) {
        setContent('')
        setTitle('')
        setSelectedMood(null)
        setTags([])
        setSelectedTemplate(null)
        loadJournalEntries()
        loadStats()
      }
    } catch (error) {
      console.error('Error saving journal entry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Mood Tracking functions
  const loadMoodEntries = async () => {
    try {
      const response = await apiService.getMoodEntries(userId, 10)
      setMoodEntries(response.data || [])
    } catch (error) {
      console.error('Error loading mood entries:', error)
    }
  }

  const loadMoodStats = async () => {
    try {
      const response = await apiService.getMoodStats(userId, 7)
      setMoodStats(response.data || { averageMood: 0, totalEntries: 0, moodDistribution: [] })
    } catch (error) {
      console.error('Error loading mood stats:', error)
    }
  }

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  const handleMoodSubmit = async (e) => {
    e.preventDefault()
    if (!selectedMoodTracking) return

    setIsMoodLoading(true)
    try {
      const selectedMoodData = moodTrackingOptions.find(mood => mood.id === selectedMoodTracking)
      const moodData = {
        userId,
        mood: selectedMoodData.value,
        activities: selectedActivities,
        notes: moodNotes.trim(),
        date: new Date()
      }

      await apiService.createMoodEntry(moodData)
      setIsMoodSubmitted(true)
      setTimeout(() => setIsMoodSubmitted(false), 3000)
      
      // Reset form
      setSelectedMoodTracking('')
      setSelectedActivities([])
      setMoodNotes('')
      
      // Reload data
      loadMoodEntries()
      loadMoodStats()
    } catch (error) {
      console.error('Error saving mood entry:', error)
      alert('Failed to save mood entry. Please try again.')
    } finally {
      setIsMoodLoading(false)
    }
  }

  // AI Assistant functions
  const checkOllamaConnection = async () => {
    try {
      setError('')
      const response = await fetch(`${ollamaUrl}/api/tags`)
      if (response.ok) {
        const data = await response.json()
        setAvailableModels(data.models || [])
        setIsConnected(true)
        return true
      } else {
        throw new Error('Failed to connect to Ollama')
      }
    } catch (err) {
      setError(`Unable to connect to Ollama at ${ollamaUrl}. Please ensure Ollama is running and accessible.`)
      setIsConnected(false)
      return false
    }
  }

  const getJournalContext = async () => {
    if (!useJournalData || !journalConsent) return ''
    
    try {
      const [journalResponse, moodResponse] = await Promise.all([
        apiService.getJournalEntries(userId, 10),
        apiService.getMoodEntries(userId, 7)
      ])
      
      let context = ''
      
      if (journalResponse.success && journalResponse.data.length > 0) {
        const recentEntries = journalResponse.data.slice(0, 5).map(entry => ({
          date: entry.date,
          mood: entry.mood,
          title: entry.title,
          content: entry.content.substring(0, 200) + '...',
          tags: entry.tags
        }))
        
        context += `\n\nRecent Journal Context (for personalized guidance):
${recentEntries.map(entry => 
  `Date: ${new Date(entry.date).toLocaleDateString()}
Mood: ${entry.mood}/5
Title: ${entry.title}
Content: ${entry.content}
Tags: ${entry.tags.join(', ')}`
).join('\n\n')}`
      }
      
      if (moodResponse.data && moodResponse.data.length > 0) {
        const recentMoods = moodResponse.data.slice(0, 5).map(entry => ({
          date: entry.date,
          mood: entry.mood,
          activities: entry.activities,
          notes: entry.notes
        }))
        
        context += `\n\nRecent Mood Tracking (for emotional context):
${recentMoods.map(entry => 
  `Date: ${new Date(entry.date).toLocaleDateString()}
Mood: ${entry.mood}/5
Activities: ${entry.activities.join(', ')}
Notes: ${entry.notes}`
).join('\n\n')}`
      }
      
      return context
    } catch (error) {
      console.error('Error fetching context:', error)
    }
    return ''
  }

  const sendMessage = async (message) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsAILoading(true)
    setError('')

    try {
      const journalContext = await getJournalContext()
      const fullPrompt = `${MENTAL_HEALTH_SYSTEM_PROMPT}${journalContext}\n\nUser: ${message}\n\nAssistant:`
      
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: fullPrompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 500
          }
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response || 'I apologize, but I was unable to generate a response. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      setError(`Error communicating with AI: ${err.message}`)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I'm having trouble connecting right now. Please check your Ollama connection and try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsAILoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputMessage.trim() && !isAILoading) {
      sendMessage(inputMessage)
      setInputMessage('')
    }
  }

  const handleQuickPrompt = (prompt) => {
    if (!isAILoading) {
      sendMessage(prompt)
    }
  }

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      type: 'bot',
      content: "Hello! I'm your mental health AI assistant. I'm here to provide supportive guidance and help you with your mental wellness journey. How can I help you today?",
      timestamp: new Date()
    }])
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={24} color="#0ea5e9" />
            </div>
            <h1 className="page-title">Mental Health Hub</h1>
          </div>
          <p className="page-subtitle">
            Track your mood, express your thoughts through journaling, and get personalized AI support based on your data.
          </p>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setActiveTab('journaling')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'journaling' ? '#2563eb' : 'white',
                color: activeTab === 'journaling' ? 'white' : '#6b7280',
                border: activeTab === 'journaling' ? 'none' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <BookOpen size={16} />
              Journaling
            </button>
            <button
              onClick={() => setActiveTab('mood')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'mood' ? '#ef4444' : 'white',
                color: activeTab === 'mood' ? 'white' : '#6b7280',
                border: activeTab === 'mood' ? 'none' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Heart size={16} />
              Mood Tracking
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'ai' ? '#2563eb' : 'white',
                color: activeTab === 'ai' ? 'white' : '#6b7280',
                border: activeTab === 'ai' ? 'none' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <MessageCircle size={16} />
              AI Assistant
            </button>
          </div>
        </div>

        {/* Journaling Tab */}
        {activeTab === 'journaling' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Main Writing Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Quick Stats */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} color="#22c55e" />
                  Quick Stats
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2563eb' }}>{stats.totalEntries}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Entries</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e' }}>{stats.averageMood.toFixed(1)}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Avg Mood</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#8b5cf6' }}>{stats.mostUsedTemplate || 'None'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Top Template</div>
                  </div>
                </div>
              </div>

              {/* Writing Form */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PenTool size={20} color="#2563eb" />
                  Write Your Entry
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Entry title (optional)"
                    className="input"
                  />

                  {selectedTemplate && (
                    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {selectedTemplate.title} - Guiding Questions:
                      </h4>
                      <ul style={{ fontSize: '0.75rem', color: '#6b7280', listStyle: 'disc', paddingLeft: '1rem' }}>
                        {selectedTemplate.prompts.map((prompt, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{prompt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedTemplate?.moodIntegration && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        How are you feeling?
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {moodOptions.map((mood) => (
                          <button
                            key={mood.value}
                            onClick={() => setSelectedMood(mood.value)}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              border: selectedMood === mood.value ? `2px solid ${mood.color}` : '1px solid #e5e7eb',
                              backgroundColor: selectedMood === mood.value ? `${mood.color}20` : 'white',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontSize: '0.875rem',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span style={{ fontSize: '1.25rem' }}>{mood.emoji}</span>
                            <span>{mood.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                      Tags
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#eff6ff',
                            color: '#2563eb',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#2563eb',
                              fontSize: '0.75rem'
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag..."
                        className="input"
                        style={{ flex: 1 }}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      />
                      <button onClick={handleAddTag} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                        <Tag size={16} />
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className="textarea"
                    rows="8"
                  />

                  <button
                    onClick={handleSave}
                    disabled={!content.trim() || isLoading}
                    className="btn btn-primary"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem',
                      opacity: (!content.trim() || isLoading) ? 0.5 : 1
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Entry
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Journal Templates */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lightbulb size={20} color="#f59e0b" />
                  Journal Templates
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {journalTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: selectedTemplate?.id === template.id ? `2px solid ${template.iconColor}` : '1px solid #e5e7eb',
                        backgroundColor: selectedTemplate?.id === template.id ? `${template.iconColor}10` : 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ 
                          width: '1.5rem', 
                          height: '1.5rem', 
                          backgroundColor: template.color, 
                          borderRadius: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <BookOpen size={12} color={template.iconColor} />
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{template.title}</span>
                        {template.moodIntegration && (
                          <Heart size={12} color="#ef4444" />
                        )}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.4' }}>
                        {template.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Entries */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={20} color="#8b5cf6" />
                  Recent Entries
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {journalEntries.slice(0, 5).map((entry) => (
                    <div key={entry._id} style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#f9fafb', 
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600' }}>{entry.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.4', marginBottom: '0.5rem' }}>
                        {entry.content.substring(0, 100)}...
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {entry.moodEmoji && <span style={{ fontSize: '0.875rem' }}>{entry.moodEmoji}</span>}
                        {entry.tags && entry.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                            {entry.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} style={{ 
                                padding: '0.125rem 0.5rem', 
                                backgroundColor: '#eff6ff', 
                                color: '#2563eb', 
                                borderRadius: '0.25rem',
                                fontSize: '0.625rem'
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mood Tracking Tab */}
        {activeTab === 'mood' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Mood Entry Form */}
            <div>
              {/* Success Message */}
              {isMoodSubmitted && (
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

              <form onSubmit={handleMoodSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Mood Selection */}
                <div className="card">
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                    How are you feeling today?
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                    {moodTrackingOptions.map((mood) => (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setSelectedMoodTracking(mood.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          border: selectedMoodTracking === mood.id ? '2px solid #ef4444' : '2px solid #e5e7eb',
                          backgroundColor: selectedMoodTracking === mood.id ? '#fef2f2' : 'white',
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
                          border: selectedActivities.includes(activity) ? '1px solid #ef4444' : '1px solid #e5e7eb',
                          backgroundColor: selectedActivities.includes(activity) ? '#fef2f2' : 'white',
                          color: selectedActivities.includes(activity) ? '#ef4444' : '#374151',
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
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                    placeholder="How was your day? What's on your mind?"
                    className="textarea"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    disabled={!selectedMoodTracking || isMoodLoading}
                    className="btn btn-primary"
                    style={{ 
                      opacity: (!selectedMoodTracking || isMoodLoading) ? 0.5 : 1, 
                      cursor: (!selectedMoodTracking || isMoodLoading) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#ef4444'
                    }}
                  >
                    {isMoodLoading ? (
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
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average Mood</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ef4444' }}>
                      {moodStats.averageMood.toFixed(1)}/5
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Entries</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb' }}>
                      {moodStats.totalEntries}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Mood Entries */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Recent Entries
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {moodEntries.slice(0, 5).map((entry) => {
                    const moodData = moodTrackingOptions.find(m => m.value === entry.mood)
                    return (
                      <div key={entry._id} style={{ 
                        padding: '0.75rem', 
                        backgroundColor: '#f9fafb', 
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{moodData?.emoji}</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{moodData?.label}</span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        {entry.activities && entry.activities.length > 0 && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                              {entry.activities.slice(0, 3).map((activity, index) => (
                                <span key={index} style={{ 
                                  padding: '0.125rem 0.5rem', 
                                  backgroundColor: '#fef2f2', 
                                  color: '#ef4444', 
                                  borderRadius: '0.25rem',
                                  fontSize: '0.625rem'
                                }}>
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {entry.notes && (
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.4' }}>
                            {entry.notes.substring(0, 80)}...
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mood Insights */}
              <div className="card" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#dc2626' }}>
                  💡 Mood Insights
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#dc2626', lineHeight: '1.4' }}>
                  Track your mood daily to identify patterns and triggers. This data helps the AI provide more personalized support.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Chat Interface */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
              {/* Connection Status */}
              <div className="card" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isConnected ? (
                      <>
                        <CheckCircle size={16} color="#22c55e" />
                        <span style={{ color: '#22c55e', fontSize: '0.875rem', fontWeight: '500' }}>
                          Connected to Ollama
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} color="#ef4444" />
                        <span style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: '500' }}>
                          Not Connected
                        </span>
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={checkOllamaConnection}
                      className="btn btn-outline"
                      style={{ padding: '0.5rem', fontSize: '0.75rem' }}
                    >
                      Test Connection
                    </button>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="btn btn-outline"
                      style={{ padding: '0.5rem' }}
                    >
                      <Settings size={16} />
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div style={{ 
                    marginTop: '0.75rem', 
                    padding: '0.75rem', 
                    backgroundColor: '#fef2f2', 
                    border: '1px solid #fecaca', 
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#dc2626'
                  }}>
                    {error}
                  </div>
                )}
              </div>

              {/* Journal Data Integration Settings */}
              <div className="card" style={{ marginBottom: '1rem', backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Database size={16} color="#2563eb" />
                  Personalized AI Responses
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={useJournalData}
                      onChange={(e) => setUseJournalData(e.target.checked)}
                    />
                    <span style={{ fontSize: '0.875rem' }}>Use my journal entries for personalized responses</span>
                  </label>
                  {useJournalData && (
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        checked={journalConsent}
                        onChange={(e) => setJournalConsent(e.target.checked)}
                        required
                      />
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        I consent to using my journal data locally for AI responses. All data stays on my device and is not shared.
                      </span>
                    </label>
                  )}
                  {useJournalData && journalConsent && (
                    <div style={{ 
                      padding: '0.5rem', 
                      backgroundColor: '#dcfce7', 
                      border: '1px solid #bbf7d0', 
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      color: '#166534'
                    }}>
                      ✓ Your journal data will be used to provide more personalized and relevant AI responses.
                    </div>
                  )}
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="card" style={{ marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Ollama Settings</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Ollama URL
                      </label>
                      <input
                        type="text"
                        value={ollamaUrl}
                        onChange={(e) => setOllamaUrl(e.target.value)}
                        className="input"
                        placeholder="http://localhost:11434"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="input"
                      >
                        {availableModels.length > 0 ? (
                          availableModels.map((model) => (
                            <option key={model.name} value={model.name}>
                              {model.name}
                            </option>
                          ))
                        ) : (
                          <option value="llama2">llama2 (default)</option>
                        )}
                      </select>
                    </div>
                    <button
                      onClick={checkOllamaConnection}
                      className="btn btn-primary"
                      style={{ fontSize: '0.875rem' }}
                    >
                      Connect to Ollama
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <div style={{ 
                  flex: 1, 
                  overflowY: 'auto', 
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {message.type === 'bot' && (
                        <div style={{ 
                          width: '2rem', 
                          height: '2rem', 
                          backgroundColor: '#eff6ff', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Bot size={16} color="#2563eb" />
                        </div>
                      )}
                      <div style={{
                        maxWidth: '80%',
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        backgroundColor: message.type === 'user' ? '#2563eb' : '#f3f4f6',
                        color: message.type === 'user' ? 'white' : '#374151',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          opacity: 0.7, 
                          marginTop: '0.25rem',
                          textAlign: 'right'
                        }}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      {message.type === 'user' && (
                        <div style={{ 
                          width: '2rem', 
                          height: '2rem', 
                          backgroundColor: '#2563eb', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <User size={16} color="white" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isAILoading && (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        backgroundColor: '#eff6ff', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Bot size={16} color="#2563eb" />
                      </div>
                      <div style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <Loader size={16} className="animate-spin" />
                        Thinking...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="input"
                      style={{ flex: 1 }}
                      disabled={isAILoading || !isConnected}
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isAILoading || !isConnected}
                      className="btn btn-primary"
                      style={{ 
                        padding: '0.75rem',
                        opacity: (!inputMessage.trim() || isAILoading || !isConnected) ? 0.5 : 1
                      }}
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Quick Prompts */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Quick Prompts
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {QUICK_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      disabled={isAILoading || !isConnected}
                      className="btn btn-outline"
                      style={{ 
                        justifyContent: 'flex-start', 
                        fontSize: '0.875rem',
                        opacity: (isAILoading || !isConnected) ? 0.5 : 1
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Actions */}
              <div className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Chat Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={clearChat}
                    className="btn btn-outline"
                    style={{ justifyContent: 'flex-start', fontSize: '0.875rem' }}
                  >
                    <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
                    Clear Chat
                  </button>
                  <button
                    onClick={checkOllamaConnection}
                    className="btn btn-outline"
                    style={{ justifyContent: 'flex-start', fontSize: '0.875rem' }}
                  >
                    <CheckCircle size={16} style={{ marginRight: '0.5rem' }} />
                    Test Connection
                  </button>
                </div>
              </div>

              {/* AI Assistant Info */}
              <div className="card" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>
                  About This AI Assistant
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.4' }}>
                  This AI assistant is designed to provide supportive mental health guidance. 
                  It can use your journal entries to provide more personalized responses while keeping all data local and secure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
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
