import { useState } from 'react'
import { Phone, MessageCircle, Heart, AlertTriangle, Clock, Shield, Users, BookOpen } from 'lucide-react'

const crisisResources = [
  {
    id: 1,
    name: 'National Suicide Prevention Lifeline',
    number: '988',
    description: '24/7 crisis support for anyone in emotional distress or suicidal crisis.',
    type: 'Crisis Hotline',
    available: '24/7',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: Phone,
  },
  {
    id: 2,
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'Free, 24/7 crisis support via text message.',
    type: 'Text Support',
    available: '24/7',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: MessageCircle,
  },
  {
    id: 3,
    name: 'SAMHSA National Helpline',
    number: '1-800-662-4357',
    description: 'Free, confidential treatment referral and information service.',
    type: 'Treatment Referral',
    available: '24/7',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: Heart,
  },
  {
    id: 4,
    name: 'Veterans Crisis Line',
    number: '1-800-273-8255',
    description: 'Confidential support for veterans and their families.',
    type: 'Veterans Support',
    available: '24/7',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Shield,
  },
  {
    id: 5,
    name: 'National Domestic Violence Hotline',
    number: '1-800-799-7233',
    description: 'Support for anyone affected by domestic violence.',
    type: 'Domestic Violence',
    available: '24/7',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: Users,
  },
  {
    id: 6,
    name: 'National Sexual Assault Hotline',
    number: '1-800-656-4673',
    description: 'Confidential support for survivors of sexual assault.',
    type: 'Sexual Assault',
    available: '24/7',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    icon: Heart,
  },
]

const selfCareTips = [
  'Take deep, slow breaths and focus on your breathing',
  'Find a quiet, safe space where you can be alone',
  'Reach out to a trusted friend or family member',
  'Use grounding techniques like the 5-4-3-2-1 method',
  'Listen to calming music or sounds',
  'Practice progressive muscle relaxation',
  'Write down your thoughts and feelings',
  'Take a walk or get some fresh air',
  'Use positive self-talk and affirmations',
  'Remember that this feeling is temporary',
]

const emergencySteps = [
  {
    step: 1,
    title: 'Recognize the Crisis',
    description: 'Acknowledge that you\'re experiencing a mental health crisis and need immediate support.',
  },
  {
    step: 2,
    title: 'Ensure Safety',
    description: 'If you\'re having thoughts of self-harm, remove any means of harm and go to a safe place.',
  },
  {
    step: 3,
    title: 'Reach Out',
    description: 'Call a crisis hotline, text a crisis line, or contact a trusted person immediately.',
  },
  {
    step: 4,
    title: 'Seek Professional Help',
    description: 'If the crisis persists, go to your nearest emergency room or call 911.',
  },
]

export default function CrisisSupport() {
  const [selectedResource, setSelectedResource] = useState<typeof crisisResources[0] | null>(null)

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self')
  }

  const handleText = (number: string) => {
    // For text lines, we'll show the number to copy
    navigator.clipboard.writeText(number)
    alert(`Copied to clipboard: ${number}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Crisis Support
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Get immediate help and resources when you need them most. You are not alone.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                In Immediate Danger?
              </h2>
              <p className="text-red-800 mb-4">
                If you or someone you know is in immediate danger of self-harm or suicide, 
                please call 911 or go to your nearest emergency room immediately.
              </p>
              <button
                onClick={() => handleCall('911')}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 911 Now
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crisis Resources */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Crisis Support Resources
            </h2>
            <div className="space-y-4">
              {crisisResources.map((resource) => {
                const Icon = resource.icon
                return (
                  <div key={resource.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${resource.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900">{resource.name}</h3>
                            <p className="text-neutral-600">{resource.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-neutral-500">{resource.type}</div>
                            <div className="text-sm font-medium text-green-600">{resource.available}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary-600">{resource.number}</div>
                          <div className="flex space-x-2">
                            {resource.type === 'Text Support' ? (
                              <button
                                onClick={() => handleText(resource.number)}
                                className="btn btn-outline"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Copy Number
                              </button>
                            ) : (
                              <button
                                onClick={() => handleCall(resource.number)}
                                className="btn btn-primary"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Steps */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                What to Do in a Crisis
              </h3>
              <div className="space-y-4">
                {emergencySteps.map((step) => (
                  <div key={step.step} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-neutral-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Self-Care Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Self-Care Tips
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                {selfCareTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Resources */}
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Additional Resources
              </h3>
              <div className="space-y-3">
                <button className="w-full btn btn-outline text-left justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Crisis Planning Guide
                </button>
                <button className="w-full btn btn-outline text-left justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Support Groups
                </button>
                <button className="w-full btn btn-outline text-left justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Safety Planning
                </button>
              </div>
            </div>

            {/* Important Note */}
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Important Note
              </h3>
              <p className="text-sm text-blue-800">
                These resources are for crisis situations. For ongoing mental health support, 
                consider reaching out to a mental health professional or using our other tools 
                like mood tracking and journaling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
