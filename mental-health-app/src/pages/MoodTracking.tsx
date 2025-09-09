import { useState } from 'react'
import { Heart, Calendar, TrendingUp, BarChart3, Plus, Check } from 'lucide-react'

const moodOptions = [
  { id: 'very-happy', label: 'Very Happy', emoji: '😄', color: 'bg-green-100 text-green-800', value: 5 },
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-green-50 text-green-700', value: 4 },
  { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-yellow-50 text-yellow-700', value: 3 },
  { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-50 text-blue-700', value: 2 },
  { id: 'very-sad', label: 'Very Sad', emoji: '😭', color: 'bg-red-50 text-red-700', value: 1 },
]

const activities = [
  'Exercise',
  'Sleep',
  'Work',
  'Socializing',
  'Hobbies',
  'Family time',
  'Reading',
  'Meditation',
  'Cooking',
  'Walking',
]

export default function MoodTracking() {
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save to a database
    console.log('Mood entry:', { selectedMood, selectedActivities, notes })
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Mood Tracking
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Track your daily mood and emotional patterns to better understand your mental health journey.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-8 p-4 bg-success-50 border border-success-200 rounded-lg flex items-center space-x-3">
            <Check className="w-5 h-5 text-success-600" />
            <span className="text-success-800 font-medium">
              Your mood has been recorded successfully!
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Entry Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Mood Selection */}
              <div className="card">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  How are you feeling today?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMood === mood.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className="text-sm font-medium text-neutral-700">
                        {mood.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="card">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  What activities did you do today? (Optional)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => handleActivityToggle(activity)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedActivities.includes(activity)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 hover:border-primary-300 text-neutral-700'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="card">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!selectedMood}
                  className="btn btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Record Mood
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                This Week
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Average Mood</span>
                  <span className="text-2xl">😊</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Entries</span>
                  <span className="font-semibold">5/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Streak</span>
                  <span className="font-semibold text-success-600">3 days</span>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Recent Entries
              </h3>
              <div className="space-y-3">
                {[
                  { date: 'Today', mood: '😊', activities: ['Exercise', 'Reading'] },
                  { date: 'Yesterday', mood: '😐', activities: ['Work', 'Cooking'] },
                  { date: '2 days ago', mood: '😄', activities: ['Socializing', 'Hobbies'] },
                ].map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-900">{entry.date}</div>
                      <div className="text-sm text-neutral-600">
                        {entry.activities.join(', ')}
                      </div>
                    </div>
                    <span className="text-2xl">{entry.mood}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full btn btn-outline text-left justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </button>
                <button className="w-full btn btn-outline text-left justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Trends
                </button>
                <button className="w-full btn btn-outline text-left justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
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
