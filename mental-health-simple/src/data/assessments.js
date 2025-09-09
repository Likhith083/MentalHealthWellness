// Industry-Standard Mental Health Assessments
// Based on validated clinical questionnaires and Labayh standards

export const assessments = [
  {
    id: 1,
    title: 'Depression Assessment (PHQ-9)',
    description: 'This assessment helps identify symptoms of depression using the Patient Health Questionnaire-9, a validated clinical tool.',
    duration: '3-5 min',
    questions: 9,
    category: 'Depression',
    color: '#fef2f2',
    iconColor: '#ef4444',
    disclaimer: 'This test is not a diagnostic tool and does not replace professional medical advice.',
    instructions: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    scoring: {
      scale: '0-3',
      interpretation: 'phq9'
    }
  },
  {
    id: 2,
    title: 'Anxiety Assessment (GAD-7)',
    description: 'This assessment helps identify symptoms of generalized anxiety disorder using the Generalized Anxiety Disorder 7-item scale.',
    duration: '3-5 min',
    questions: 7,
    category: 'Anxiety',
    color: '#f0fdf4',
    iconColor: '#22c55e',
    disclaimer: 'This test is not a diagnostic tool and does not replace professional medical advice.',
    instructions: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    scoring: {
      scale: '0-3',
      interpretation: 'gad7'
    }
  },
  {
    id: 3,
    title: 'Self-Esteem Assessment (RSE)',
    description: 'This assessment measures your self-esteem using the Rosenberg Self-Esteem Scale, a widely used psychological tool.',
    duration: '5-7 min',
    questions: 10,
    category: 'Self-Esteem',
    color: '#eff6ff',
    iconColor: '#2563eb',
    disclaimer: 'This assessment helps identify self-esteem patterns and is not a diagnostic tool.',
    instructions: 'Please indicate how strongly you agree or disagree with each statement.',
    scoring: {
      scale: '1-4',
      interpretation: 'rse'
    }
  },
  {
    id: 4,
    title: 'Social Anxiety Assessment (SPIN)',
    description: 'This assessment evaluates social anxiety and shyness using the Social Phobia Inventory.',
    duration: '3-5 min',
    questions: 14,
    category: 'Social Anxiety',
    color: '#faf5ff',
    iconColor: '#8b5cf6',
    disclaimer: 'This test helps identify social anxiety patterns and is not a diagnostic tool.',
    instructions: 'Please indicate how much each statement has bothered you in the past week.',
    scoring: {
      scale: '0-4',
      interpretation: 'spin'
    }
  },
  {
    id: 5,
    title: 'Obsessive-Compulsive Assessment (OCI-R)',
    description: 'This assessment evaluates obsessive-compulsive symptoms using the Obsessive-Compulsive Inventory-Revised.',
    duration: '5-7 min',
    questions: 10,
    category: 'OCD',
    color: '#fff7ed',
    iconColor: '#f97316',
    disclaimer: 'This test helps identify OCD patterns and is not a diagnostic tool.',
    instructions: 'Please indicate how much each statement has bothered you in the past month.',
    scoring: {
      scale: '0-4',
      interpretation: 'ocir'
    }
  },
  {
    id: 6,
    title: 'Burnout Assessment (MBI)',
    description: 'This assessment measures work-related burnout using the Maslach Burnout Inventory.',
    duration: '5-7 min',
    questions: 33,
    category: 'Burnout',
    color: '#fef3c7',
    iconColor: '#f59e0b',
    disclaimer: 'This assessment helps identify burnout patterns and is not a diagnostic tool.',
    instructions: 'Please indicate how often you have experienced each feeling.',
    scoring: {
      scale: '0-6',
      interpretation: 'mbi'
    }
  },
  {
    id: 7,
    title: 'Narcissistic Personality Assessment (NPI-16)',
    description: 'This assessment evaluates narcissistic personality traits using the Narcissistic Personality Inventory.',
    duration: '3-5 min',
    questions: 16,
    category: 'Personality',
    color: '#fce7f3',
    iconColor: '#ec4899',
    disclaimer: 'This assessment helps identify personality patterns and is not a diagnostic tool.',
    instructions: 'Please choose the statement that best describes you.',
    scoring: {
      scale: '0-1',
      interpretation: 'npi16'
    }
  }
]

// PHQ-9 Depression Questions
export const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
]

// GAD-7 Anxiety Questions
export const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
]

// Rosenberg Self-Esteem Scale Questions
export const rseQuestions = [
  "I feel that I am a person of worth, at least on an equal plane with others",
  "I feel that I have a number of good qualities",
  "All in all, I am inclined to feel that I am a failure",
  "I am able to do things as well as most other people",
  "I feel I do not have much to be proud of",
  "I take a positive attitude toward myself",
  "On the whole, I am satisfied with myself",
  "I wish I could have more respect for myself",
  "I certainly feel useless at times",
  "At times I think I am no good at all"
]

// Social Phobia Inventory (SPIN) Questions
export const spinQuestions = [
  "Parties or social activities frighten me",
  "I avoid talking to people I don't know well",
  "Being criticized scares me a lot",
  "Heart palpitations bother me when I am around people",
  "I am afraid of people in authority",
  "Trembling or shaking in front of others is distressing to me",
  "I avoid doing things or speaking to people for fear of embarrassment",
  "Sweating in front of others causes me distress",
  "I avoid going to parties",
  "I avoid activities in which I am the center of attention",
  "Talking to strangers terrifies me",
  "I avoid having to give speeches",
  "I would do anything to avoid being criticized",
  "Heart palpitations in social situations frighten me"
]

// Obsessive-Compulsive Inventory-Revised (OCI-R) Questions
export const ocirQuestions = [
  "I have saved up so many things that they get in the way",
  "I check things more often than necessary",
  "I get upset if objects are not arranged properly",
  "I feel compelled to count while I am doing things",
  "I find it difficult to touch an object when I know a stranger has touched it",
  "I find it difficult to control my own thoughts",
  "I collect things I don't need",
  "I repeatedly check doors, windows, drawers, etc.",
  "I get upset if others change the way I have arranged things",
  "I feel that I must repeat certain numbers"
]

// Maslach Burnout Inventory (MBI) Questions
export const mbiQuestions = [
  "I feel emotionally drained from my work",
  "I feel used up at the end of the workday",
  "I feel fatigued when I get up in the morning and have to face another day on the job",
  "I can easily understand how my recipients feel about things",
  "I feel I treat some recipients as if they were impersonal objects",
  "Working with people all day is really a strain for me",
  "I deal very effectively with the problems of my recipients",
  "I feel burned out from my work",
  "I feel I'm positively influencing other people's lives through my work",
  "I've become more callous toward people since I took this job",
  "I worry that this job is hardening me emotionally",
  "I feel very energetic",
  "I feel frustrated by my job",
  "I feel I'm working too hard on my job",
  "I don't really care what happens to some recipients",
  "Working directly with people puts too much stress on me",
  "I can easily create a relaxed atmosphere with my recipients",
  "I feel exhilarated after working closely with recipients",
  "I have accomplished many worthwhile things in this job",
  "I feel like I'm at the end of my rope",
  "In my work, I deal with emotional problems very calmly",
  "I feel recipients blame me for some of their problems",
  "I can easily understand how my recipients feel about things",
  "I feel I treat some recipients as if they were impersonal objects",
  "Working with people all day is really a strain for me",
  "I deal very effectively with the problems of my recipients",
  "I feel burned out from my work",
  "I feel I'm positively influencing other people's lives through my work",
  "I've become more callous toward people since I took this job",
  "I worry that this job is hardening me emotionally",
  "I feel very energetic",
  "I feel frustrated by my job",
  "I feel I'm working too hard on my job"
]

// Narcissistic Personality Inventory (NPI-16) Questions
export const npi16Questions = [
  {
    question: "I have a natural talent for influencing people",
    options: [
      "I have a natural talent for influencing people",
      "I am not good at influencing people"
    ]
  },
  {
    question: "Modesty doesn't become me",
    options: [
      "Modesty doesn't become me",
      "I am essentially a modest person"
    ]
  },
  {
    question: "I would do almost anything on a dare",
    options: [
      "I would do almost anything on a dare",
      "I tend to be a fairly cautious person"
    ]
  },
  {
    question: "When people compliment me I sometimes get embarrassed",
    options: [
      "When people compliment me I sometimes get embarrassed",
      "I know that I am good because everybody keeps telling me so"
    ]
  },
  {
    question: "The thought of ruling the world frightens the hell out of me",
    options: [
      "The thought of ruling the world frightens the hell out of me",
      "If I ruled the world it would be a better place"
    ]
  },
  {
    question: "I can usually talk my way out of anything",
    options: [
      "I can usually talk my way out of anything",
      "I try to accept the consequences of my behavior"
    ]
  },
  {
    question: "I prefer to blend in with the crowd",
    options: [
      "I prefer to blend in with the crowd",
      "I like to be the center of attention"
    ]
  },
  {
    question: "I will be a success",
    options: [
      "I will be a success",
      "I am not too concerned about success"
    ]
  },
  {
    question: "I am not sure if I would make a good leader",
    options: [
      "I am not sure if I would make a good leader",
      "I see myself as a good leader"
    ]
  },
  {
    question: "I am assertive",
    options: [
      "I am assertive",
      "I wish I were more assertive"
    ]
  },
  {
    question: "I like to have authority over other people",
    options: [
      "I like to have authority over other people",
      "I don't mind following orders"
    ]
  },
  {
    question: "I find it easy to manipulate people",
    options: [
      "I find it easy to manipulate people",
      "I don't like it when I find myself manipulating people"
    ]
  },
  {
    question: "I insist upon getting the respect that is due me",
    options: [
      "I insist upon getting the respect that is due me",
      "I usually get the respect that I deserve"
    ]
  },
  {
    question: "I don't particularly like to show off my body",
    options: [
      "I don't particularly like to show off my body",
      "I like to show off my body"
    ]
  },
  {
    question: "I can read people like a book",
    options: [
      "I can read people like a book",
      "People are sometimes hard to understand"
    ]
  },
  {
    question: "If I feel competent I am willing to take responsibility for making decisions",
    options: [
      "If I feel competent I am willing to take responsibility for making decisions",
      "I like to take responsibility for making decisions"
    ]
  }
]

// Scoring and Interpretation Functions
export const getScoreInterpretation = (score, assessmentType) => {
  switch (assessmentType) {
    case 'phq9':
      if (score <= 4) return { 
        level: 'Minimal Depression', 
        color: '#22c55e', 
        description: 'Minimal depression symptoms. Continue monitoring your mood.',
        recommendation: 'Maintain healthy lifestyle habits and consider regular check-ins.'
      }
      if (score <= 9) return { 
        level: 'Mild Depression', 
        color: '#fbbf24', 
        description: 'Mild depression symptoms. Consider self-care strategies.',
        recommendation: 'Consider talking to a healthcare provider or counselor about your symptoms.'
      }
      if (score <= 14) return { 
        level: 'Moderate Depression', 
        color: '#f97316', 
        description: 'Moderate depression symptoms. Professional help recommended.',
        recommendation: 'It is recommended to consult with a healthcare provider or mental health professional.'
      }
      if (score <= 19) return { 
        level: 'Moderately Severe Depression', 
        color: '#ef4444', 
        description: 'Moderately severe depression symptoms. Professional help strongly recommended.',
        recommendation: 'Please consider reaching out to a mental health professional or healthcare provider soon.'
      }
      return { 
        level: 'Severe Depression', 
        color: '#dc2626', 
        description: 'Severe depression symptoms. Immediate professional help recommended.',
        recommendation: 'Please consider reaching out to a mental health professional or healthcare provider immediately. If you are having thoughts of self-harm, please contact emergency services or a crisis hotline.'
      }

    case 'gad7':
      if (score <= 4) return { 
        level: 'Minimal Anxiety', 
        color: '#22c55e', 
        description: 'Minimal anxiety symptoms.',
        recommendation: 'Continue with current coping strategies.'
      }
      if (score <= 9) return { 
        level: 'Mild Anxiety', 
        color: '#fbbf24', 
        description: 'Mild anxiety symptoms.',
        recommendation: 'Consider stress management techniques and relaxation exercises.'
      }
      if (score <= 14) return { 
        level: 'Moderate Anxiety', 
        color: '#f97316', 
        description: 'Moderate anxiety symptoms.',
        recommendation: 'Consider consulting with a healthcare provider or mental health professional.'
      }
      return { 
        level: 'Severe Anxiety', 
        color: '#ef4444', 
        description: 'Severe anxiety symptoms.',
        recommendation: 'Please consider reaching out to a mental health professional or healthcare provider.'
      }

    case 'rse':
      if (score <= 15) return { 
        level: 'Low Self-Esteem', 
        color: '#ef4444', 
        description: 'Indicates low self-esteem.',
        recommendation: 'Consider working with a counselor or therapist to build self-esteem and self-confidence.'
      }
      if (score <= 25) return { 
        level: 'Normal Self-Esteem', 
        color: '#22c55e', 
        description: 'Indicates normal self-esteem levels.',
        recommendation: 'Continue practicing self-care and positive self-talk.'
      }
      return { 
        level: 'High Self-Esteem', 
        color: '#22c55e', 
        description: 'Indicates high self-esteem levels.',
        recommendation: 'Maintain your positive self-perception and continue building on your strengths.'
      }

    case 'spin':
      if (score <= 20) return { 
        level: 'Minimal Social Anxiety', 
        color: '#22c55e', 
        description: 'Minimal social anxiety symptoms.',
        recommendation: 'Continue with current social activities and confidence-building practices.'
      }
      if (score <= 30) return { 
        level: 'Mild Social Anxiety', 
        color: '#fbbf24', 
        description: 'Mild social anxiety symptoms.',
        recommendation: 'Consider gradual exposure to social situations and stress management techniques.'
      }
      if (score <= 40) return { 
        level: 'Moderate Social Anxiety', 
        color: '#f97316', 
        description: 'Moderate social anxiety symptoms.',
        recommendation: 'Consider consulting with a mental health professional for social anxiety management strategies.'
      }
      return { 
        level: 'Severe Social Anxiety', 
        color: '#ef4444', 
        description: 'Severe social anxiety symptoms.',
        recommendation: 'Please consider reaching out to a mental health professional for comprehensive treatment.'
      }

    case 'ocir':
      if (score <= 10) return { 
        level: 'Minimal OCD Symptoms', 
        color: '#22c55e', 
        description: 'Minimal obsessive-compulsive symptoms.',
        recommendation: 'Continue monitoring and maintain healthy coping strategies.'
      }
      if (score <= 20) return { 
        level: 'Mild OCD Symptoms', 
        color: '#fbbf24', 
        description: 'Mild obsessive-compulsive symptoms.',
        recommendation: 'Consider stress management techniques and mindfulness practices.'
      }
      if (score <= 30) return { 
        level: 'Moderate OCD Symptoms', 
        color: '#f97316', 
        description: 'Moderate obsessive-compulsive symptoms.',
        recommendation: 'Consider consulting with a mental health professional for OCD management strategies.'
      }
      return { 
        level: 'Severe OCD Symptoms', 
        color: '#ef4444', 
        description: 'Severe obsessive-compulsive symptoms.',
        recommendation: 'Please consider reaching out to a mental health professional for comprehensive OCD treatment.'
      }

    case 'mbi':
      if (score <= 50) return { 
        level: 'Low Burnout Risk', 
        color: '#22c55e', 
        description: 'Low risk of burnout.',
        recommendation: 'Continue with current work-life balance practices.'
      }
      if (score <= 75) return { 
        level: 'Moderate Burnout Risk', 
        color: '#fbbf24', 
        description: 'Moderate risk of burnout.',
        recommendation: 'Consider implementing stress management and work-life balance strategies.'
      }
      if (score <= 100) return { 
        level: 'High Burnout Risk', 
        color: '#f97316', 
        description: 'High risk of burnout.',
        recommendation: 'Consider consulting with a healthcare provider or counselor about workplace stress management.'
      }
      return { 
        level: 'Severe Burnout Risk', 
        color: '#ef4444', 
        description: 'Severe burnout risk.',
        recommendation: 'Please consider reaching out to a healthcare provider or mental health professional for burnout management.'
      }

    case 'npi16':
      if (score <= 4) return { 
        level: 'Low Narcissistic Traits', 
        color: '#22c55e', 
        description: 'Low levels of narcissistic personality traits.',
        recommendation: 'Continue practicing empathy and healthy relationship skills.'
      }
      if (score <= 8) return { 
        level: 'Moderate Narcissistic Traits', 
        color: '#fbbf24', 
        description: 'Moderate levels of narcissistic personality traits.',
        recommendation: 'Consider self-reflection and developing empathy skills.'
      }
      if (score <= 12) return { 
        level: 'High Narcissistic Traits', 
        color: '#f97316', 
        description: 'High levels of narcissistic personality traits.',
        recommendation: 'Consider consulting with a mental health professional for personality development.'
      }
      return { 
        level: 'Very High Narcissistic Traits', 
        color: '#ef4444', 
        description: 'Very high levels of narcissistic personality traits.',
        recommendation: 'Please consider reaching out to a mental health professional for comprehensive personality assessment and development.'
      }

    default:
      return { 
        level: 'Assessment Complete', 
        color: '#2563eb', 
        description: 'Assessment completed successfully.',
        recommendation: 'Review your results and consider discussing them with a healthcare provider if needed.'
      }
  }
}

// Get questions for specific assessment
export const getQuestionsForAssessment = (assessmentId) => {
  switch (assessmentId) {
    case 1: return phq9Questions
    case 2: return gad7Questions
    case 3: return rseQuestions
    case 4: return spinQuestions
    case 5: return ocirQuestions
    case 6: return mbiQuestions
    case 7: return npi16Questions
    default: return []
  }
}

// Get response options for specific assessment
export const getResponseOptions = (assessmentId) => {
  switch (assessmentId) {
    case 1: // PHQ-9
    case 2: // GAD-7
      return [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    case 3: // RSE
      return [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Agree' },
        { value: 4, label: 'Strongly Agree' }
      ]
    case 4: // SPIN
    case 5: // OCI-R
      return [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'A little bit' },
        { value: 2, label: 'Somewhat' },
        { value: 3, label: 'Very much' },
        { value: 4, label: 'Extremely' }
      ]
    case 6: // MBI
      return [
        { value: 0, label: 'Never' },
        { value: 1, label: 'A few times a year or less' },
        { value: 2, label: 'Once a month or less' },
        { value: 3, label: 'A few times a month' },
        { value: 4, label: 'Once a week' },
        { value: 5, label: 'A few times a week' },
        { value: 6, label: 'Every day' }
      ]
    case 7: // NPI-16
      return [
        { value: 0, label: 'Option A' },
        { value: 1, label: 'Option B' }
      ]
    default:
      return []
  }
}
