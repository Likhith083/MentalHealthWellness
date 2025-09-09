import { useState } from 'react'
import { Brain, Play, Pause, Volume2, Clock, Star, Heart, Leaf } from 'lucide-react'

const meditationSessions = [
  {
    id: 1,
    title: 'Morning Mindfulness',
    description: 'Start your day with a 10-minute mindfulness practice to set a positive tone.',
    duration: '10 min',
    category: 'Mindfulness',
    difficulty: 'Beginner',
    rating: 4.8,
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: '🌅',
  },
  {
    id: 2,
    title: 'Stress Relief Breathing',
    description: 'Learn deep breathing techniques to quickly reduce stress and anxiety.',
    duration: '5 min',
    category: 'Breathing',
    difficulty: 'Beginner',
    rating: 4.9,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: '🫁',
  },
  {
    id: 3,
    title: 'Body Scan Relaxation',
    description: 'A guided body scan to release tension and promote deep relaxation.',
    duration: '20 min',
    category: 'Relaxation',
    difficulty: 'Intermediate',
    rating: 4.7,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: '🧘',
  },
  {
    id: 4,
    title: 'Sleep Preparation',
    description: 'Wind down with gentle meditation to prepare your mind for restful sleep.',
    duration: '15 min',
    category: 'Sleep',
    difficulty: 'Beginner',
    rating: 4.6,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: '🌙',
  },
  {
    id: 5,
    title: 'Loving-Kindness',
    description: 'Cultivate compassion and loving-kindness for yourself and others.',
    duration: '12 min',
    category: 'Compassion',
    difficulty: 'Intermediate',
    rating: 4.8,
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    icon: '💝',
  },
  {
    id: 6,
    title: 'Focus & Concentration',
    description: 'Improve your focus and mental clarity through concentration meditation.',
    duration: '18 min',
    category: 'Focus',
    difficulty: 'Advanced',
    rating: 4.5,
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: '🎯',
  },
]

const categories = ['All', 'Mindfulness', 'Breathing', 'Relaxation', 'Sleep', 'Compassion', 'Focus']

export default function Meditation() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSession, setSelectedSession] = useState<typeof meditationSessions[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const filteredSessions = selectedCategory === 'All' 
    ? meditationSessions 
    : meditationSessions.filter(session => session.category === selectedCategory)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSessionSelect = (session: typeof meditationSessions[0]) => {
    setSelectedSession(session)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Meditation
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Access guided meditation sessions designed to reduce stress and improve mindfulness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meditation Sessions */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-700 border border-neutral-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className={`card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                    selectedSession?.id === session.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => handleSessionSelect(session)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{session.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-neutral-900">{session.title}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-neutral-600">{session.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">{session.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-neutral-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{session.duration}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full ${session.color}`}>
                          {session.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Sidebar */}
          <div className="space-y-6">
            {/* Current Session Player */}
            {selectedSession ? (
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Now Playing
                </h3>
                <div className="text-center">
                  <div className="text-4xl mb-4">{selectedSession.icon}</div>
                  <h4 className="font-semibold text-neutral-900 mb-2">{selectedSession.title}</h4>
                  <p className="text-sm text-neutral-600 mb-4">{selectedSession.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentTime / 600) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                      <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                      <span>{selectedSession.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                      <Volume2 className="w-5 h-5 text-neutral-600" />
                    </button>
                    <button
                      onClick={handlePlay}
                      className="p-4 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-1" />
                      )}
                    </button>
                    <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                      <Heart className="w-5 h-5 text-neutral-600" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center">
                <div className="text-4xl mb-4">🧘</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Select a Session
                </h3>
                <p className="text-sm text-neutral-600">
                  Choose a meditation session to begin your mindfulness practice.
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Benefits of Meditation
              </h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li className="flex items-start space-x-2">
                  <Leaf className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Reduces stress and anxiety</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span>Improves emotional well-being</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Brain className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>Enhances focus and concentration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Promotes better sleep quality</span>
                </li>
              </ul>
            </div>

            {/* Quick Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Meditation Tips
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• Find a quiet, comfortable space</li>
                <li>• Start with shorter sessions</li>
                <li>• Focus on your breath</li>
                <li>• Don't judge wandering thoughts</li>
                <li>• Practice regularly for best results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
