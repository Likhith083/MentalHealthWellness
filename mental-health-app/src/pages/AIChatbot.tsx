import { useState } from 'react'
import { MessageCircle, Send, Bot, User, Clock, AlertCircle, Heart } from 'lucide-react'

const comingSoonFeatures = [
  'AI-powered mental health support',
  '24/7 availability for immediate help',
  'Personalized responses based on your mood data',
  'Crisis detection and escalation',
  'Integration with your journal entries',
  'Evidence-based therapeutic techniques',
  'Multilingual support',
  'Privacy-focused conversations',
]

const sampleConversations = [
  {
    id: 1,
    title: 'Feeling Anxious',
    preview: 'I\'ve been feeling really anxious lately and I\'m not sure how to cope...',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'Sleep Issues',
    preview: 'I\'m having trouble falling asleep and staying asleep. Any suggestions?',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    title: 'Work Stress',
    preview: 'Work has been really stressful and I feel overwhelmed...',
    timestamp: '3 days ago',
  },
]

export default function AIChatbot() {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setIsTyping(true)
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      setMessage('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              AI Chatbot
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Your AI mental health companion is coming soon. Get personalized support whenever you need it.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                Feature Coming Soon
              </h2>
              <p className="text-primary-800">
                We're working hard to bring you an AI-powered mental health chatbot that will provide 
                personalized support, crisis detection, and evidence-based therapeutic techniques.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface Preview */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Chat Preview
                </h2>
                <div className="flex items-center space-x-2 text-sm text-neutral-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Coming Soon</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 h-96 overflow-y-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="bg-neutral-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-neutral-700">
                      Hi! I'm your AI mental health companion. I'm here to listen and provide support. 
                      How are you feeling today?
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-primary-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      I've been feeling really anxious lately and I'm not sure how to cope.
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-neutral-600" />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="bg-neutral-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-neutral-700">
                      I understand that anxiety can be overwhelming. Let's work through this together. 
                      Can you tell me more about what's triggering your anxiety?
                    </p>
                  </div>
                </div>

                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="bg-neutral-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message... (Feature coming soon)"
                  className="input flex-1"
                  disabled
                />
                <button
                  type="submit"
                  disabled
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Coming Features
              </h3>
              <ul className="space-y-3">
                {comingSoonFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Conversations */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Sample Conversations
              </h3>
              <div className="space-y-3">
                {sampleConversations.map((conversation) => (
                  <div key={conversation.id} className="p-3 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-sm text-neutral-900 mb-1">
                      {conversation.title}
                    </div>
                    <div className="text-xs text-neutral-600 mb-2">
                      {conversation.preview}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>{conversation.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Resources */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Available Now
              </h3>
              <div className="space-y-3">
                <a href="/mood-tracking" className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="font-medium text-sm text-neutral-900">Mood Tracking</div>
                  <div className="text-xs text-neutral-600">Track your daily mood and patterns</div>
                </a>
                <a href="/journaling" className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="font-medium text-sm text-neutral-900">Journaling</div>
                  <div className="text-xs text-neutral-600">Express your thoughts and feelings</div>
                </a>
                <a href="/crisis-support" className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="font-medium text-sm text-neutral-900">Crisis Support</div>
                  <div className="text-xs text-neutral-600">Get immediate help when needed</div>
                </a>
              </div>
            </div>

            {/* Notify Me */}
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Notify Me
              </h3>
              <p className="text-sm text-primary-800 mb-4">
                Get notified when the AI chatbot becomes available.
              </p>
              <button className="w-full btn btn-primary">
                <MessageCircle className="w-4 h-4 mr-2" />
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
