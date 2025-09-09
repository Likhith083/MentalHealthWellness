import { Heart, Shield, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">
                Mindful
              </span>
            </div>
            <p className="text-neutral-600 mb-4 max-w-md">
              Your personal mental health companion. Track your mood, journal your thoughts, 
              and find the support you need on your wellness journey.
            </p>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/mood-tracking" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Mood Tracking
                </a>
              </li>
              <li>
                <a href="/journaling" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Journaling
                </a>
              </li>
              <li>
                <a href="/meditation" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Meditation
                </a>
              </li>
              <li>
                <a href="/assessments" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Assessments
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/therapist-matching" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Find a Therapist
                </a>
              </li>
              <li>
                <a href="/crisis-support" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Crisis Support
                </a>
              </li>
              <li>
                <a href="/ai-chatbot" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  AI Chatbot
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500">
              © 2024 Mindful. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-neutral-500">
                <Mail className="w-4 h-4" />
                <span>support@mindful.app</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-500">
                <Phone className="w-4 h-4" />
                <span>1-800-MINDFUL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
