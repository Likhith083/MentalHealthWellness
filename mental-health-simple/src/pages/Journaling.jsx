import { useState, useEffect } from 'react'
import { BookOpen, Save, Plus, Calendar, Search, Filter, Heart, Lightbulb, PenTool, Trash2, Edit3 } from 'lucide-react'

const journalPrompts = [
  {
    id: 1,
    title: 'Gratitude Practice',
    description: 'Write about three things you\'re grateful for today and why they matter to you.',
    category: 'Gratitude',
    color: '#f0fdf4',
    iconColor: '#22c55e',
  },
  {
    id: 2,
    title: 'Emotional Check-in',
    description: 'How are you feeling right now? What emotions are present, and what might be causing them?',
    category: 'Emotions',
    color: '#eff6ff',
    iconColor: '#2563eb',
  },
  {
    id: 3,
    title: 'Daily Reflection',
    description: 'What was the highlight of your day? What challenged you, and how did you handle it?',
    category: 'Reflection',
    color: '#faf5ff',
    iconColor: '#8b5cf6',
  },
  {
    id: 4,
    title: 'Future Self',
    description: 'Write a letter to your future self. What advice would you give them?',
    category: 'Future',
    color: '#fff7ed',
    iconColor: '#f97316',
  },
  {
    id: 5,
    title: 'Stress Release',
    description: 'What\'s weighing on your mind? Write it all out without judgment.',
    category: 'Stress',
    color: '#fef2f2',
    iconColor: '#ef4444',
  },
  {
    id: 6,
    title: 'Self-Compassion',
    description: 'What would you say to a friend in your situation? Write those kind words to yourself.',
    category: 'Self-Care',
    color: '#fdf2f8',
    iconColor: '#ec4899',
  },
]

const categories = ['All', 'Gratitude', 'Emotions', 'Reflection', 'Future', 'Stress', 'Self-Care']

export default function Journaling() {
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [journalEntry, setJournalEntry] = useState('')
  const [entryTitle, setEntryTitle] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [entries, setEntries] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingEntry, setEditingEntry] = useState(null)

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries))
  }, [entries])

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt)
    setEntryTitle(prompt.title)
    setJournalEntry('')
    setEditingEntry(null)
  }

  const handleSave = async () => {
    if (!journalEntry.trim()) return

    setIsSaving(true)
    
    const newEntry = {
      id: editingEntry ? editingEntry.id : Date.now(),
      title: entryTitle || 'Untitled Entry',
      content: journalEntry,
      prompt: selectedPrompt,
      date: new Date().toISOString(),
      mood: '😊', // Could be enhanced with mood selection
    }

    if (editingEntry) {
      setEntries(prev => prev.map(entry => entry.id === editingEntry.id ? newEntry : entry))
    } else {
      setEntries(prev => [newEntry, ...prev])
    }

    // Simulate saving delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
    
    // Reset form
    setSelectedPrompt(null)
    setEntryTitle('')
    setJournalEntry('')
    setEditingEntry(null)
  }

  const handleNewEntry = () => {
    setSelectedPrompt(null)
    setEntryTitle('')
    setJournalEntry('')
    setEditingEntry(null)
  }

  const handleEditEntry = (entry) => {
    setEditingEntry(entry)
    setEntryTitle(entry.title)
    setJournalEntry(entry.content)
    setSelectedPrompt(entry.prompt)
  }

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(prev => prev.filter(entry => entry.id !== entryId))
    }
  }

  const filteredEntries = entries.filter(entry => {
    const matchesCategory = selectedCategory === 'All' || entry.prompt?.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={24} color="#2563eb" />
            </div>
            <h1 className="page-title">Journaling</h1>
          </div>
          <p className="page-subtitle">
            Express your thoughts and feelings through guided journaling prompts and free-form writing.
          </p>
        </div>

        {/* Success Message */}
        {isSaved && (
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
            <Heart size={20} color="#22c55e" />
            <span style={{ color: '#166534', fontWeight: '500' }}>
              Your journal entry has been saved successfully!
            </span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Main Writing Area */}
          <div>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {selectedPrompt ? selectedPrompt.title : 'New Journal Entry'}
                </h2>
                <button onClick={handleNewEntry} className="btn btn-outline">
                  <Plus size={16} style={{ marginRight: '0.5rem' }} />
                  New Entry
                </button>
              </div>

              {selectedPrompt && (
                <div style={{ 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  backgroundColor: selectedPrompt.color,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <Lightbulb size={20} color={selectedPrompt.iconColor} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                  <div>
                    <h3 style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{selectedPrompt.title}</h3>
                    <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>{selectedPrompt.description}</p>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={entryTitle}
                    onChange={(e) => setEntryTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Your thoughts
                  </label>
                  <textarea
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="Start writing your thoughts here..."
                    className="textarea"
                    rows={15}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    onClick={handleSave}
                    disabled={!journalEntry.trim() || isSaving}
                    className="btn btn-primary"
                    style={{ 
                      opacity: !journalEntry.trim() ? 0.5 : 1, 
                      cursor: !journalEntry.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {isSaving ? (
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
                        <Save size={16} />
                        {editingEntry ? 'Update Entry' : 'Save Entry'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Writing Prompts */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PenTool size={20} />
                Writing Prompts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {journalPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handlePromptSelect(prompt)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: selectedPrompt?.id === prompt.id ? '1px solid #2563eb' : '1px solid #e5e7eb',
                      backgroundColor: selectedPrompt?.id === prompt.id ? '#eff6ff' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontWeight: '500', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{prompt.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>{prompt.category}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.4' }}>
                      {prompt.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Search & Filter
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} />
                Recent Entries ({filteredEntries.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
                {filteredEntries.length === 0 ? (
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>
                    No entries yet. Start writing your first entry!
                  </p>
                ) : (
                  filteredEntries.map((entry) => (
                    <div key={entry.id} style={{ 
                      padding: '0.75rem', 
                      backgroundColor: '#f9fafb', 
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{entry.title}</div>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditEntry(entry)
                            }}
                            style={{ padding: '0.25rem', borderRadius: '0.25rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                          >
                            <Edit3 size={14} color="#6b7280" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteEntry(entry.id)
                            }}
                            style={{ padding: '0.25rem', borderRadius: '0.25rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} color="#ef4444" />
                          </button>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {entry.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Writing Tips */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                Writing Tips
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Write freely without worrying about grammar or structure',
                  'Be honest with yourself about your feelings',
                  'Use specific details to make your entries more meaningful',
                  'Don\'t judge your thoughts - just observe them',
                  'Regular journaling can help improve mental clarity'
                ].map((tip, index) => (
                  <li key={index} style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: '#22c55e', marginTop: '0.125rem' }}>•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}