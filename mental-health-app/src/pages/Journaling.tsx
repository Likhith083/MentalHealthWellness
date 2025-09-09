import { useState } from 'react'
import { BookOpen, Save, Plus, Calendar, Search, Filter, Heart, Lightbulb, PenTool } from 'lucide-react'

const journalPrompts = [
  {
    id: 1,
    title: 'Gratitude Practice',
    description: 'Write about three things you\'re grateful for today and why they matter to you.',
    category: 'Gratitude',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    id: 2,
    title: 'Emotional Check-in',
    description: 'How are you feeling right now? What emotions are present, and what might be causing them?',
    category: 'Emotions',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 3,
    title: 'Daily Reflection',
    description: 'What was the highlight of your day? What challenged you, and how did you handle it?',
    category: 'Reflection',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 4,
    title: 'Future Self',
    description: 'Write a letter to your future self. What advice would you give them?',
    category: 'Future',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    id: 5,
    title: 'Stress Release',
    description: 'What\'s weighing on your mind? Write it all out without judgment.',
    category: 'Stress',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    id: 6,
    title: 'Self-Compassion',
    description: 'What would you say to a friend in your situation? Write those kind words to yourself.',
    category: 'Self-Care',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
  },
]

const recentEntries = [
  {
    id: 1,
    title: 'Gratitude Practice',
    date: '2024-01-09',
    preview: 'Today I\'m grateful for the warm sunshine, my supportive family, and the opportunity to learn new things...',
    mood: '😊',
  },
  {
    id: 2,
    title: 'Daily Reflection',
    date: '2024-01-08',
    preview: 'The highlight of my day was having a meaningful conversation with my colleague. It reminded me...',
    mood: '😌',
  },
  {
    id: 3,
    title: 'Emotional Check-in',
    date: '2024-01-07',
    preview: 'I\'m feeling a mix of excitement and nervousness about the upcoming presentation...',
    mood: '😐',
  },
]

export default function Journaling() {
  const [selectedPrompt, setSelectedPrompt] = useState<typeof journalPrompts[0] | null>(null)
  const [journalEntry, setJournalEntry] = useState('')
  const [entryTitle, setEntryTitle] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handlePromptSelect = (prompt: typeof journalPrompts[0]) => {
    setSelectedPrompt(prompt)
    setEntryTitle(prompt.title)
    setJournalEntry('')
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleNewEntry = () => {
    setSelectedPrompt(null)
    setEntryTitle('')
    setJournalEntry('')
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Journaling
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Express your thoughts and feelings through guided journaling prompts and free-form writing.
          </p>
        </div>

        {/* Success Message */}
        {isSaved && (
          <div className="mb-8 p-4 bg-success-50 border border-success-200 rounded-lg flex items-center space-x-3">
            <Heart className="w-5 h-5 text-success-600" />
            <span className="text-success-800 font-medium">
              Your journal entry has been saved successfully!
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Writing Area */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">
                  {selectedPrompt ? selectedPrompt.title : 'New Journal Entry'}
                </h2>
                <button
                  onClick={handleNewEntry}
                  className="btn btn-outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </button>
              </div>

              {selectedPrompt && (
                <div className={`p-4 rounded-lg border mb-6 ${selectedPrompt.color}`}>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">{selectedPrompt.title}</h3>
                      <p className="text-sm opacity-90">{selectedPrompt.description}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="entry-title" className="block text-sm font-medium text-neutral-700 mb-2">
                    Title
                  </label>
                  <input
                    id="entry-title"
                    type="text"
                    value={entryTitle}
                    onChange={(e) => setEntryTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="journal-content" className="block text-sm font-medium text-neutral-700 mb-2">
                    Your thoughts
                  </label>
                  <textarea
                    id="journal-content"
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="Start writing your thoughts here..."
                    className="textarea min-h-[400px]"
                    rows={20}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={!journalEntry.trim() || isSaving}
                    className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Entry
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Writing Prompts */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <PenTool className="w-5 h-5 mr-2" />
                Writing Prompts
              </h3>
              <div className="space-y-3">
                {journalPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handlePromptSelect(prompt)}
                    className={`w-full p-3 rounded-lg border text-left transition-all hover:shadow-sm ${
                      selectedPrompt?.id === prompt.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">{prompt.title}</div>
                    <div className="text-xs text-neutral-600 mb-2">{prompt.category}</div>
                    <div className="text-xs text-neutral-500 line-clamp-2">
                      {prompt.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Entries */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Entries
              </h3>
              <div className="space-y-3">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-sm text-neutral-900">{entry.title}</div>
                      <span className="text-lg">{entry.mood}</span>
                    </div>
                    <div className="text-xs text-neutral-500 mb-2">{entry.date}</div>
                    <div className="text-xs text-neutral-600 line-clamp-2">
                      {entry.preview}
                    </div>
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
                  <Search className="w-4 h-4 mr-2" />
                  Search Entries
                </button>
                <button className="w-full btn btn-outline text-left justify-start">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Date
                </button>
                <button className="w-full btn btn-outline text-left justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Calendar
                </button>
              </div>
            </div>

            {/* Writing Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Writing Tips
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• Write freely without worrying about grammar or structure</li>
                <li>• Be honest with yourself about your feelings</li>
                <li>• Use specific details to make your entries more meaningful</li>
                <li>• Don't judge your thoughts - just observe them</li>
                <li>• Regular journaling can help improve mental clarity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
