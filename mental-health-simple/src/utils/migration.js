import apiService from '../services/api.js'

// Migration utility to move data from localStorage to MongoDB
export class DataMigration {
  constructor() {
    this.userId = 'anonymous' // Default user ID for migration
  }

  // Check if data exists in localStorage
  hasLocalData() {
    const keys = [
      'moodEntries',
      'journalEntries', 
      'assessmentHistory',
      'completedMeditationSessions',
      'chatMessages'
    ]
    
    return keys.some(key => localStorage.getItem(key) !== null)
  }

  // Get all localStorage data
  getLocalData() {
    return {
      moodEntries: this.getLocalDataByKey('moodEntries'),
      journalEntries: this.getLocalDataByKey('journalEntries'),
      assessmentHistory: this.getLocalDataByKey('assessmentHistory'),
      completedMeditationSessions: this.getLocalDataByKey('completedMeditationSessions'),
      chatMessages: this.getLocalDataByKey('chatMessages')
    }
  }

  getLocalDataByKey(key) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error)
      return []
    }
  }

  // Migrate mood entries
  async migrateMoodEntries(moodEntries) {
    if (!moodEntries || moodEntries.length === 0) return

    console.log(`Migrating ${moodEntries.length} mood entries...`)
    
    for (const entry of moodEntries) {
      try {
        const moodData = {
          userId: this.userId,
          mood: entry.mood,
          activities: entry.activities || [],
          notes: entry.notes || '',
          date: new Date(entry.date || entry.timestamp || Date.now())
        }
        
        await apiService.createMoodEntry(moodData)
      } catch (error) {
        console.error('Error migrating mood entry:', error)
      }
    }
    
    console.log('✅ Mood entries migration completed')
  }

  // Migrate journal entries
  async migrateJournalEntries(journalEntries) {
    if (!journalEntries || journalEntries.length === 0) return

    console.log(`Migrating ${journalEntries.length} journal entries...`)
    
    for (const entry of journalEntries) {
      try {
        const journalData = {
          userId: this.userId,
          title: entry.title || 'Untitled Entry',
          content: entry.content,
          prompt: entry.prompt || null,
          mood: entry.mood || null,
          tags: entry.tags || [],
          isPrivate: entry.isPrivate !== false,
          date: new Date(entry.date || Date.now())
        }
        
        await apiService.createJournalEntry(journalData)
      } catch (error) {
        console.error('Error migrating journal entry:', error)
      }
    }
    
    console.log('✅ Journal entries migration completed')
  }

  // Migrate assessment results
  async migrateAssessmentResults(assessmentHistory) {
    if (!assessmentHistory || assessmentHistory.length === 0) return

    console.log(`Migrating ${assessmentHistory.length} assessment results...`)
    
    for (const result of assessmentHistory) {
      try {
        const assessmentData = {
          userId: this.userId,
          assessmentId: result.assessmentId || 'unknown',
          assessmentTitle: result.assessmentTitle || 'Assessment',
          score: result.score,
          maxScore: result.maxScore || result.score * 3, // Estimate if not provided
          answers: result.answers || [],
          interpretation: result.interpretation || null,
          date: new Date(result.date || Date.now())
        }
        
        await apiService.createAssessmentResult(assessmentData)
      } catch (error) {
        console.error('Error migrating assessment result:', error)
      }
    }
    
    console.log('✅ Assessment results migration completed')
  }

  // Migrate meditation sessions
  async migrateMeditationSessions(completedSessions) {
    if (!completedSessions || completedSessions.length === 0) return

    console.log(`Migrating ${completedSessions.length} meditation sessions...`)
    
    for (const sessionId of completedSessions) {
      try {
        const sessionData = {
          userId: this.userId,
          sessionId: sessionId,
          sessionTitle: 'Completed Session',
          duration: 600, // Default 10 minutes
          completedDuration: 600,
          category: 'General',
          difficulty: 'Beginner',
          rating: null,
          notes: '',
          date: new Date()
        }
        
        await apiService.createMeditationSession(sessionData)
      } catch (error) {
        console.error('Error migrating meditation session:', error)
      }
    }
    
    console.log('✅ Meditation sessions migration completed')
  }

  // Migrate chat messages
  async migrateChatMessages(chatMessages) {
    if (!chatMessages || chatMessages.length === 0) return

    console.log(`Migrating ${chatMessages.length} chat messages...`)
    
    for (const message of chatMessages) {
      try {
        const messageData = {
          userId: this.userId,
          messageId: message.id || Date.now().toString(),
          type: message.type || 'user',
          content: message.content,
          timestamp: new Date(message.timestamp || message.date || Date.now()),
          sessionId: message.sessionId || 'default',
          metadata: message.metadata || {}
        }
        
        await apiService.createChatMessage(messageData)
      } catch (error) {
        console.error('Error migrating chat message:', error)
      }
    }
    
    console.log('✅ Chat messages migration completed')
  }

  // Run complete migration
  async migrateAll() {
    console.log('🚀 Starting data migration from localStorage to MongoDB...')
    
    try {
      // Check if API is available
      await apiService.healthCheck()
      console.log('✅ API connection successful')
    } catch (error) {
      console.error('❌ API connection failed. Make sure the server is running.')
      throw error
    }

    if (!this.hasLocalData()) {
      console.log('ℹ️ No local data found to migrate')
      return
    }

    const localData = this.getLocalData()
    
    // Migrate each data type
    await this.migrateMoodEntries(localData.moodEntries)
    await this.migrateJournalEntries(localData.journalEntries)
    await this.migrateAssessmentResults(localData.assessmentHistory)
    await this.migrateMeditationSessions(localData.completedMeditationSessions)
    await this.migrateChatMessages(localData.chatMessages)
    
    console.log('🎉 Data migration completed successfully!')
    console.log('💡 You can now clear localStorage if desired')
  }

  // Clear localStorage after successful migration
  clearLocalStorage() {
    const keys = [
      'moodEntries',
      'journalEntries', 
      'assessmentHistory',
      'completedMeditationSessions',
      'chatMessages'
    ]
    
    keys.forEach(key => localStorage.removeItem(key))
    console.log('🗑️ localStorage cleared')
  }
}

// Export a singleton instance
export const dataMigration = new DataMigration()
