import { Link } from 'react-router-dom'
import { 
  Heart, 
  BookOpen, 
  Brain, 
  FileText, 
  Users, 
  Phone, 
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock
} from 'lucide-react'

const features = [
  {
    name: 'Mood Tracking',
    description: 'Track your daily mood and emotional patterns to better understand your mental health journey.',
    href: '/mood-tracking',
    icon: Heart,
    color: 'bg-pink-50 text-pink-600',
  },
  {
    name: 'Journaling',
    description: 'Express your thoughts and feelings through guided journaling prompts and free-form writing.',
    href: '/journaling',
    icon: BookOpen,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Meditation',
    description: 'Access guided meditation sessions designed to reduce stress and improve mindfulness.',
    href: '/meditation',
    icon: Brain,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    name: 'Assessments',
    description: 'Take evidence-based mental health assessments to track your progress over time.',
    href: '/assessments',
    icon: FileText,
    color: 'bg-green-50 text-green-600',
  },
  {
    name: 'Find a Therapist',
    description: 'Connect with licensed mental health professionals who match your needs and preferences.',
    href: '/therapist-matching',
    icon: Users,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    name: 'Crisis Support',
    description: 'Get immediate help and resources when you need them most.',
    href: '/crisis-support',
    icon: Phone,
    color: 'bg-red-50 text-red-600',
  },
  {
    name: 'AI Chatbot',
    description: 'Chat with our AI assistant for immediate support and guidance (Coming Soon).',
    href: '/ai-chatbot',
    icon: MessageCircle,
    color: 'bg-gray-50 text-gray-600',
  },
]

const benefits = [
  'Evidence-based mental health tools',
  'HIPAA compliant and secure',
  'Available 24/7',
  'Personalized recommendations',
  'Progress tracking and insights',
  'Professional therapist matching',
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Mental Health
              <span className="text-blue-600"> Journey Starts Here</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Take control of your mental wellness with personalized tools, professional support, 
              and evidence-based resources designed to help you thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/mood-tracking"
                className="btn btn-primary text-lg px-8 py-3"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/assessments"
                className="btn btn-outline text-lg px-8 py-3"
              >
                Take Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Health Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to support your mental wellness in one secure, accessible platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.name}
                  to={feature.href}
                  className="group card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {feature.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Mindful?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're committed to providing you with the highest quality mental health support, 
                backed by science and designed with your privacy and security in mind.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="card text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure & Private
                </h3>
                <p className="text-gray-600">
                  Your data is protected with enterprise-grade security and HIPAA compliance.
                </p>
              </div>
              <div className="card text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Available 24/7
                </h3>
                <p className="text-gray-600">
                  Access your tools and support whenever you need them, day or night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Mental Health Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who are taking control of their mental wellness with Mindful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mood-tracking"
              className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
            >
              Get Started Today
            </Link>
            <Link
              to="/crisis-support"
              className="btn border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
            >
              Need Immediate Help?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}