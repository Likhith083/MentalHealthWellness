// Assessment Result Schema
export const createAssessmentResult = (data) => {
  return {
    userId: data.userId || 'anonymous',
    assessmentId: data.assessmentId, // PHQ-9, GAD-7, etc.
    assessmentTitle: data.assessmentTitle,
    score: data.score,
    maxScore: data.maxScore,
    answers: data.answers || [], // array of answers
    interpretation: data.interpretation || null, // severity level
    date: data.date || new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export const validateAssessmentResult = (data) => {
  const errors = []
  
  if (!data.assessmentId || !data.assessmentTitle) {
    errors.push('Assessment ID and title are required')
  }
  
  if (typeof data.score !== 'number' || data.score < 0) {
    errors.push('Score must be a non-negative number')
  }
  
  if (typeof data.maxScore !== 'number' || data.maxScore <= 0) {
    errors.push('Max score must be a positive number')
  }
  
  if (data.score > data.maxScore) {
    errors.push('Score cannot exceed max score')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
