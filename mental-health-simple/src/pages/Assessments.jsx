import { useState, useEffect } from 'react'
import { FileText, CheckCircle, ArrowRight, Clock, BarChart3, Download, Share, Star, AlertTriangle, Shield } from 'lucide-react'
import { 
  assessments, 
  getQuestionsForAssessment, 
  getResponseOptions, 
  getScoreInterpretation 
} from '../data/assessments.js'

const categories = ['All', 'Depression', 'Anxiety', 'Self-Esteem', 'Social Anxiety', 'OCD', 'Burnout', 'Personality']

export default function Assessments() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [assessmentHistory, setAssessmentHistory] = useState([])

  // Load assessment history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('assessmentHistory')
    if (saved) {
      setAssessmentHistory(JSON.parse(saved))
    }
  }, [])

  // Save assessment history to localStorage
  useEffect(() => {
    localStorage.setItem('assessmentHistory', JSON.stringify(assessmentHistory))
  }, [assessmentHistory])

  const filteredAssessments = selectedCategory === 'All' 
    ? assessments 
    : assessments.filter(assessment => assessment.category === selectedCategory)

  const handleStartAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers([])
    setIsCompleted(false)
  }

  const handleAnswer = (answer) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    if (currentQuestion < (selectedAssessment?.questions || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
      // Save assessment result
      const score = newAnswers.reduce((sum, answer) => sum + answer, 0)
      const result = {
        id: Date.now(),
        assessmentId: selectedAssessment.id,
        assessmentTitle: selectedAssessment.title,
        score: score,
        maxScore: selectedAssessment.questions * 3,
        date: new Date().toISOString(),
        answers: newAnswers
      }
      setAssessmentHistory(prev => [result, ...prev])
    }
  }

  const getScoreInterpretationForAssessment = (score, assessmentId) => {
    const assessmentType = assessments.find(a => a.id === assessmentId)?.scoring?.interpretation
    return getScoreInterpretation(score, assessmentType)
  }

  const getCurrentQuestions = () => {
    return getQuestionsForAssessment(selectedAssessment?.id)
  }

  const getCurrentResponseOptions = () => {
    return getResponseOptions(selectedAssessment?.id)
  }

  const getAssessmentStats = () => {
    const totalAssessments = assessmentHistory.length
    const recentAssessments = assessmentHistory.slice(0, 5)
    const avgScore = totalAssessments > 0 
      ? Math.round(assessmentHistory.reduce((sum, result) => sum + result.score, 0) / totalAssessments)
      : 0
    
    return { totalAssessments, recentAssessments, avgScore }
  }

  const stats = getAssessmentStats()

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={24} color="#22c55e" />
            </div>
            <h1 className="page-title">Mental Health Assessments</h1>
          </div>
          <p className="page-subtitle">
            Take evidence-based mental health assessments to track your progress over time.
          </p>
        </div>

        {!selectedAssessment ? (
          <div>
            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="btn"
                    style={{
                      backgroundColor: selectedCategory === category ? '#2563eb' : 'white',
                      color: selectedCategory === category ? 'white' : '#6b7280',
                      border: selectedCategory === category ? 'none' : '1px solid #e5e7eb',
                      fontSize: '0.875rem',
                      padding: '0.5rem 1rem'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="card" style={{ marginBottom: '2rem', backgroundColor: '#fef3c7', border: '1px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
                    Important Disclaimer
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0, lineHeight: '1.4' }}>
                    These assessments are based on validated clinical questionnaires but are not diagnostic tools or therapeutic tools. 
                    They do not replace the need for consulting a doctor or psychiatrist. If you are experiencing severe symptoms 
                    or having thoughts of self-harm, please seek immediate professional help.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            {stats.totalAssessments > 0 && (
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Your Assessment History</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2563eb' }}>{stats.totalAssessments}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Assessments</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>{stats.avgScore}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Average Score</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#8b5cf6' }}>
                      {new Date().toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Last Assessment</div>
                  </div>
                </div>
              </div>
            )}

            {/* Assessments Grid */}
            <div className="grid grid-2">
              {filteredAssessments.map((assessment) => (
                <div key={assessment.id} className="card" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  minHeight: '400px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ 
                      padding: '0.75rem', 
                      borderRadius: '0.5rem', 
                      backgroundColor: assessment.color,
                      color: assessment.iconColor,
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {assessment.category}
                    </div>
                    {assessment.completed && (
                      <CheckCircle size={20} color="#22c55e" />
                    )}
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    minHeight: '3rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {assessment.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280', 
                    marginBottom: '1rem', 
                    lineHeight: '1.4',
                    minHeight: '3rem',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}>
                    {assessment.description}
                  </p>

                  {assessment.disclaimer && (
                    <div style={{ 
                      padding: '0.5rem', 
                      backgroundColor: '#fef3c7', 
                      borderRadius: '0.375rem', 
                      marginBottom: '1rem',
                      fontSize: '0.75rem',
                      color: '#92400e',
                      minHeight: '2.5rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Shield size={12} style={{ marginRight: '0.25rem', display: 'inline' }} />
                      {assessment.disclaimer}
                    </div>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    fontSize: '0.75rem', 
                    color: '#6b7280', 
                    marginBottom: '1rem',
                    minHeight: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      <span>{assessment.duration}</span>
                    </div>
                    <span>{assessment.questions} questions</span>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <button
                      onClick={() => handleStartAssessment(assessment)}
                      className="btn btn-primary"
                      style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.5rem',
                        minHeight: '44px'
                      }}
                    >
                      {assessment.completed ? 'Retake Assessment' : 'Start Assessment'}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Results */}
            {stats.recentAssessments.length > 0 && (
              <div className="card" style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Results</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {stats.recentAssessments.map((result) => {
                    const assessment = assessments.find(a => a.title === result.assessmentTitle)
                    const interpretation = getScoreInterpretationForAssessment(result.score, assessment?.id || 1)
                    return (
                      <div key={result.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '0.75rem', 
                        backgroundColor: '#f9fafb', 
                        borderRadius: '0.5rem' 
                      }}>
                        <div>
                          <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{result.assessmentTitle}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {new Date(result.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: interpretation.color }}>
                            {result.score}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: interpretation.color }}>
                            {interpretation.level}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Crisis Support */}
            <div className="card" style={{ marginTop: '2rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <AlertTriangle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#dc2626' }}>
                    Need Immediate Help?
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#dc2626', marginBottom: '1rem' }}>
                    If you are experiencing a mental health crisis or having thoughts of self-harm, please reach out immediately:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                      <strong>National Suicide Prevention Lifeline:</strong> 988
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                      <strong>Crisis Text Line:</strong> Text HOME to 741741
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                      <strong>Emergency Services:</strong> 911
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Assessment Header */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {selectedAssessment.title}
                  </h2>
                  <p style={{ color: '#6b7280' }}>{selectedAssessment.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Question</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2563eb' }}>
                    {currentQuestion + 1} / {selectedAssessment.questions}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div>
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
                      backgroundColor: '#2563eb', 
                      width: `${((currentQuestion + 1) / selectedAssessment.questions) * 100}%`,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Assessment Questions */}
            {!isCompleted ? (
              <div className="card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  Question {currentQuestion + 1} of {selectedAssessment.questions}
                </h3>
                
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '1.125rem', color: '#374151', marginBottom: '1.5rem' }}>
                    {selectedAssessment.instructions}
                  </p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '500', color: '#111827', marginBottom: '2rem' }}>
                    "{getCurrentQuestions()[currentQuestion]}"
                  </p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {getCurrentResponseOptions().map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="btn"
                      style={{
                        padding: '1rem',
                        textAlign: 'left',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        color: '#374151'
                      }}
                    >
                      <span style={{ fontWeight: '500' }}>{option.label}</span>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{option.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center' }}>
                <CheckCircle size={64} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Assessment Complete!
                </h3>
                
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.5rem' }}>
                    {answers.reduce((sum, answer) => sum + answer, 0)}
                  </div>
                  <div style={{ color: '#6b7280' }}>Your Score</div>
                </div>

                {(() => {
                  const score = answers.reduce((sum, answer) => sum + answer, 0)
                  const interpretation = getScoreInterpretationForAssessment(score, selectedAssessment.id)
                  return (
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '600', 
                        color: interpretation.color,
                        marginBottom: '0.5rem'
                      }}>
                        {interpretation.level}
                      </div>
                      <div style={{ color: '#6b7280', marginBottom: '1rem' }}>{interpretation.description}</div>
                      <div style={{ 
                        padding: '1rem', 
                        backgroundColor: '#f0f9ff', 
                        borderRadius: '0.5rem',
                        border: '1px solid #bfdbfe',
                        fontSize: '0.875rem',
                        color: '#1e40af'
                      }}>
                        <strong>Recommendation:</strong> {interpretation.recommendation}
                      </div>
                    </div>
                  )
                })()}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedAssessment(null)}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <BarChart3 size={16} />
                    View All Assessments
                  </button>
                  <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={16} />
                    Download Results
                  </button>
                  <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Share size={16} />
                    Share with Provider
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}