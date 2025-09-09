import { useState } from 'react'
import { FileText, CheckCircle, ArrowRight, Clock, BarChart3, Download, Share } from 'lucide-react'

const assessments = [
  {
    id: 1,
    title: 'PHQ-9 Depression Screening',
    description: 'A validated 9-question screening tool for depression severity.',
    duration: '5-10 min',
    questions: 9,
    category: 'Depression',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: true,
    score: 8,
    lastTaken: '2024-01-05',
  },
  {
    id: 2,
    title: 'GAD-7 Anxiety Assessment',
    description: '7-question scale to assess generalized anxiety disorder symptoms.',
    duration: '3-5 min',
    questions: 7,
    category: 'Anxiety',
    color: 'bg-green-50 text-green-700 border-green-200',
    completed: true,
    score: 5,
    lastTaken: '2024-01-03',
  },
  {
    id: 3,
    title: 'PSS-10 Stress Scale',
    description: '10-item scale measuring perceived stress levels.',
    duration: '5 min',
    questions: 10,
    category: 'Stress',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    completed: false,
  },
  {
    id: 4,
    title: 'SWLS Life Satisfaction',
    description: '5-question assessment of overall life satisfaction.',
    duration: '3 min',
    questions: 5,
    category: 'Well-being',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    completed: false,
  },
  {
    id: 5,
    title: 'Sleep Quality Index',
    description: 'Comprehensive assessment of sleep patterns and quality.',
    duration: '8-10 min',
    questions: 19,
    category: 'Sleep',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    completed: false,
  },
  {
    id: 6,
    title: 'Social Support Scale',
    description: 'Measures perceived social support from family and friends.',
    duration: '5 min',
    questions: 12,
    category: 'Social',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    completed: false,
  },
]

const categories = ['All', 'Depression', 'Anxiety', 'Stress', 'Well-being', 'Sleep', 'Social']

export default function Assessments() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedAssessment, setSelectedAssessment] = useState<typeof assessments[0] | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const filteredAssessments = selectedCategory === 'All' 
    ? assessments 
    : assessments.filter(assessment => assessment.category === selectedCategory)

  const handleStartAssessment = (assessment: typeof assessments[0]) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers([])
    setIsCompleted(false)
  }

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    if (currentQuestion < (selectedAssessment?.questions || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const getScoreInterpretation = (score: number, assessment: string) => {
    if (assessment === 'PHQ-9 Depression Screening') {
      if (score <= 4) return { level: 'Minimal', color: 'text-green-600' }
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-600' }
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-600' }
      if (score <= 19) return { level: 'Moderately Severe', color: 'text-red-600' }
      return { level: 'Severe', color: 'text-red-700' }
    }
    if (assessment === 'GAD-7 Anxiety Assessment') {
      if (score <= 4) return { level: 'Minimal', color: 'text-green-600' }
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-600' }
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-600' }
      return { level: 'Severe', color: 'text-red-600' }
    }
    return { level: 'Completed', color: 'text-blue-600' }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Mental Health Assessments
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Take evidence-based mental health assessments to track your progress over time.
          </p>
        </div>

        {!selectedAssessment ? (
          <div>
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

            {/* Assessments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssessments.map((assessment) => (
                <div key={assessment.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${assessment.color}`}>
                      {assessment.category}
                    </div>
                    {assessment.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {assessment.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-600 mb-4">
                    {assessment.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{assessment.duration}</span>
                    </div>
                    <span>{assessment.questions} questions</span>
                  </div>

                  {assessment.completed && (
                    <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="text-sm text-neutral-600 mb-1">Last Score</div>
                      <div className="text-2xl font-bold text-neutral-900">{assessment.score}</div>
                      <div className="text-xs text-neutral-500">{assessment.lastTaken}</div>
                    </div>
                  )}

                  <button
                    onClick={() => handleStartAssessment(assessment)}
                    className="w-full btn btn-primary"
                  >
                    {assessment.completed ? 'Retake Assessment' : 'Start Assessment'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Assessment Header */}
            <div className="card mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                    {selectedAssessment.title}
                  </h2>
                  <p className="text-neutral-600">{selectedAssessment.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-500">Question</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {currentQuestion + 1} / {selectedAssessment.questions}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / selectedAssessment.questions) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Assessment Questions */}
            {!isCompleted ? (
              <div className="card">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">
                  Question {currentQuestion + 1}
                </h3>
                
                <div className="space-y-4">
                  <p className="text-neutral-700 mb-6">
                    {selectedAssessment.title === 'PHQ-9 Depression Screening' && (
                      <>
                        Over the last 2 weeks, how often have you been bothered by: 
                        "Little interest or pleasure in doing things"
                      </>
                    )}
                    {selectedAssessment.title === 'GAD-7 Anxiety Assessment' && (
                      <>
                        Over the last 2 weeks, how often have you been bothered by: 
                        "Feeling nervous, anxious, or on edge"
                      </>
                    )}
                    {selectedAssessment.title === 'PSS-10 Stress Scale' && (
                      <>
                        In the last month, how often have you felt: 
                        "Unable to control the important things in your life"
                      </>
                    )}
                    {!['PHQ-9 Depression Screening', 'GAD-7 Anxiety Assessment', 'PSS-10 Stress Scale'].includes(selectedAssessment.title) && (
                      <>
                        This is a sample question for the {selectedAssessment.title}. 
                        In a real implementation, this would be the actual question text.
                      </>
                    )}
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      { value: 0, label: 'Not at all' },
                      { value: 1, label: 'Several days' },
                      { value: 2, label: 'More than half the days' },
                      { value: 3, label: 'Nearly every day' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full p-4 text-left border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-sm text-neutral-500">{option.value}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                  Assessment Complete!
                </h3>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {answers.reduce((sum, answer) => sum + answer, 0)}
                  </div>
                  <div className="text-neutral-600">Your Score</div>
                </div>

                <div className="mb-8">
                  <div className={`text-lg font-semibold ${getScoreInterpretation(answers.reduce((sum, answer) => sum + answer, 0), selectedAssessment.title).color}`}>
                    {getScoreInterpretation(answers.reduce((sum, answer) => sum + answer, 0), selectedAssessment.title).level}
                  </div>
                  <div className="text-neutral-600">Severity Level</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setSelectedAssessment(null)}
                    className="btn btn-primary"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View All Assessments
                  </button>
                  <button className="btn btn-outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Results
                  </button>
                  <button className="btn btn-outline">
                    <Share className="w-4 h-4 mr-2" />
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
