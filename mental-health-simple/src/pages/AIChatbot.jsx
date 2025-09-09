import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, Bot, User, Loader, Settings, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react'

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

const MENTAL_HEALTH_RESOURCES = [
  {
    title: "Crisis Support",
    description: "If you're in immediate distress, please reach out to:",
    resources: [
      "National Suicide Prevention Lifeline: 988",
      "Crisis Text Line: Text HOME to 741741",
      "Emergency Services: 911"
    ]
  },
  {
    title: "Professional Help",
    description: "Consider reaching out to:",
    resources: [
      "Licensed therapist or counselor",
      "Your primary care physician",
      "Mental health professional in your area"
    ]
  },
  {
    title: "Self-Care Resources",
    description: "Helpful tools and techniques:",
    resources: [
      "Deep breathing exercises",
      "Mindfulness meditation",
      "Regular physical activity",
      "Maintaining a sleep schedule"
    ]
  }
]

export default function AIChatbot() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434')
  const [selectedModel, setSelectedModel] = useState('llama2')
  const [availableModels, setAvailableModels] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize with welcome message
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

  // Check Ollama connection and get available models
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

  // Send message to Ollama
  const sendMessage = async (message) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: `${MENTAL_HEALTH_SYSTEM_PROMPT}\n\nUser: ${message}\n\nAssistant:`,
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
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage)
      setInputMessage('')
    }
  }

  const handleQuickPrompt = (prompt) => {
    if (!isLoading) {
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
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f9fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={24} color="#6b7280" />
            </div>
            <h1 className="page-title">AI Mental Health Assistant</h1>
          </div>
          <p className="page-subtitle">
            Chat with our AI assistant for supportive guidance and mental wellness tips.
          </p>
        </div>

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
                {isLoading && (
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
                    disabled={isLoading || !isConnected}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading || !isConnected}
                    className="btn btn-primary"
                    style={{ 
                      padding: '0.75rem',
                      opacity: (!inputMessage.trim() || isLoading || !isConnected) ? 0.5 : 1
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
                    disabled={isLoading || !isConnected}
                    className="btn btn-outline"
                    style={{ 
                      justifyContent: 'flex-start', 
                      fontSize: '0.875rem',
                      opacity: (isLoading || !isConnected) ? 0.5 : 1
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

            {/* Mental Health Resources */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Mental Health Resources
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {MENTAL_HEALTH_RESOURCES.map((resource, index) => (
                  <div key={index}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                      {resource.title}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      {resource.description}
                    </p>
                    <ul style={{ listStyle: 'none', fontSize: '0.75rem', color: '#6b7280' }}>
                      {resource.resources.map((item, itemIndex) => (
                        <li key={itemIndex} style={{ marginBottom: '0.25rem' }}>
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Info */}
            <div className="card" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>
                About This AI Assistant
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.4' }}>
                This AI assistant is designed to provide supportive mental health guidance. 
                It's not a replacement for professional therapy, but can offer helpful 
                coping strategies and emotional support.
              </p>
            </div>
          </div>
        </div>
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