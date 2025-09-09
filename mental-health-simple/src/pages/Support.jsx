import { useState } from 'react'
import { 
  Users, 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Phone, 
  Video, 
  Filter, 
  Search, 
  Heart, 
  Plus, 
  UserPlus, 
  X, 
  CheckCircle, 
  AlertCircle,
  AlertTriangle,
  Shield,
  Home,
  ExternalLink,
  BookOpen,
  Brain
} from 'lucide-react'

// Crisis Resources
const crisisResources = [
  {
    title: 'National Suicide Prevention Lifeline',
    number: '988',
    description: 'Available 24/7 for crisis support and suicide prevention',
    icon: Phone,
    color: '#ef4444',
    action: 'Call Now',
    href: 'tel:988',
    priority: 'high'
  },
  {
    title: 'Crisis Text Line',
    number: '741741',
    description: 'Text HOME to 741741 for 24/7 crisis support',
    icon: MessageCircle,
    color: '#2563eb',
    action: 'Copy Text',
    onClick: () => navigator.clipboard.writeText('HOME'),
    priority: 'high'
  },
  {
    title: 'Emergency Services',
    number: '911',
    description: 'For immediate life-threatening emergencies',
    icon: AlertTriangle,
    color: '#f59e0b',
    action: 'Call 911',
    href: 'tel:911',
    priority: 'emergency'
  }
]

// Self-Care Tips
const selfCareTips = [
  {
    title: 'Grounding Techniques',
    description: 'Use the 5-4-3-2-1 technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
    icon: Shield
  },
  {
    title: 'Deep Breathing',
    description: 'Try the 4-7-8 breathing technique: Inhale for 4 counts, hold for 7, exhale for 8.',
    icon: Heart
  },
  {
    title: 'Reach Out',
    description: 'Contact a trusted friend, family member, or mental health professional.',
    icon: Users
  },
  {
    title: 'Safe Space',
    description: 'Go to a quiet, comfortable place where you feel safe and secure.',
    icon: Home
  }
]

// Additional Crisis Resources
const additionalResources = [
  {
    title: 'SAMHSA National Helpline',
    number: '1-800-662-4357',
    description: 'Substance abuse and mental health services',
    href: 'tel:1-800-662-4357'
  },
  {
    title: 'National Alliance on Mental Illness (NAMI)',
    number: '1-800-950-6264',
    description: 'Mental health support and resources',
    href: 'tel:1-800-950-6264'
  },
  {
    title: 'Veterans Crisis Line',
    number: '1-800-273-8255',
    description: 'Crisis support for veterans and their families',
    href: 'tel:1-800-273-8255'
  },
  {
    title: 'LGBTQ+ Crisis Support',
    number: '1-866-488-7386',
    description: 'The Trevor Project for LGBTQ+ youth',
    href: 'tel:1-866-488-7386'
  }
]

// Therapist Data
const therapists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Licensed Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    experience: '8 years',
    rating: 4.9,
    reviews: 127,
    location: 'New York, NY',
    price: 150,
    image: '👩‍⚕️',
    bio: 'Specialized in cognitive-behavioral therapy with a focus on anxiety and depression.',
    nextAvailable: 'Tomorrow at 2:00 PM',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    title: 'Licensed Marriage & Family Therapist',
    specialties: ['Couples Therapy', 'Family Issues', 'Communication'],
    experience: '12 years',
    rating: 4.8,
    reviews: 89,
    location: 'Los Angeles, CA',
    price: 175,
    image: '👨‍⚕️',
    bio: 'Passionate about helping couples and families build stronger relationships.',
    nextAvailable: 'Monday at 10:00 AM',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    title: 'Licensed Clinical Social Worker',
    specialties: ['Trauma', 'PTSD', 'Grief Counseling'],
    experience: '6 years',
    rating: 4.9,
    reviews: 156,
    location: 'Chicago, IL',
    price: 140,
    image: '👩‍⚕️',
    bio: 'Trauma-informed therapist specializing in EMDR and somatic approaches.',
    nextAvailable: 'Friday at 3:00 PM',
  },
]

const specialties = ['All', 'Anxiety', 'Depression', 'Trauma', 'Couples Therapy', 'Family Issues', 'Addiction', 'Eating Disorders', 'ADHD', 'PTSD', 'Grief Counseling', 'Stress Management', 'Career Counseling', 'LGBTQ+ Issues']

const therapyApproaches = [
  'Cognitive Behavioral Therapy (CBT)',
  'Dialectical Behavior Therapy (DBT)',
  'Psychodynamic Therapy',
  'Humanistic Therapy',
  'Family Systems Therapy',
  'EMDR',
  'Mindfulness-Based Therapy',
  'Solution-Focused Therapy',
  'Narrative Therapy',
  'Art Therapy',
  'Music Therapy',
  'Group Therapy'
]

const sessionTypes = ['Individual', 'Couples', 'Family', 'Group', 'Online', 'Phone', 'In-Person']

const insuranceProviders = [
  'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealth', 'Kaiser Permanente',
  'Medicaid', 'Medicare', 'Humana', 'Anthem', 'Molina Healthcare'
]

export default function Support() {
  const [activeTab, setActiveTab] = useState('crisis') // 'crisis' or 'therapists'
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTherapist, setSelectedTherapist] = useState(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    
    // Professional Information
    title: '',
    licenseNumber: '',
    licenseState: '',
    yearsExperience: '',
    bio: '',
    
    // Specialties and Services
    specialties: [],
    therapyApproaches: [],
    sessionTypes: [],
    
    // Location and Availability
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    timezone: '',
    availability: '',
    
    // Pricing and Insurance
    hourlyRate: '',
    insuranceAccepted: [],
    slidingScale: false,
    freeConsultation: false,
    
    // Additional Information
    languages: [],
    ageGroups: [],
    virtualSessions: false,
    inPersonSessions: false,
    
    // Verification
    agreeToTerms: false,
    agreeToBackgroundCheck: false
  })

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSpecialty = selectedSpecialty === 'All' || therapist.specialties.includes(selectedSpecialty)
    const matchesSearch = searchQuery === '' || 
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesSpecialty && matchesSearch
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    // Simulate form submission
    console.log('Therapist Registration Data:', formData)
    
    // Show success message
    setRegistrationSuccess(true)
    setShowRegistrationForm(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setRegistrationSuccess(false)
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', website: '',
        title: '', licenseNumber: '', licenseState: '', yearsExperience: '', bio: '',
        specialties: [], therapyApproaches: [], sessionTypes: [],
        city: '', state: '', zipCode: '', country: 'United States', timezone: '', availability: '',
        hourlyRate: '', insuranceAccepted: [], slidingScale: false, freeConsultation: false,
        languages: [], ageGroups: [], virtualSessions: false, inPersonSessions: false,
        agreeToTerms: false, agreeToBackgroundCheck: false
      })
    }, 3000)
  }

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false)
    setRegistrationSuccess(false)
  }

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} color="#0ea5e9" />
            </div>
            <h1 className="page-title">Support & Resources</h1>
          </div>
          <p className="page-subtitle">
            Get immediate crisis support or find professional mental health care that matches your needs.
          </p>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setActiveTab('crisis')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'crisis' ? '#ef4444' : 'white',
                color: activeTab === 'crisis' ? 'white' : '#6b7280',
                border: activeTab === 'crisis' ? 'none' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Phone size={16} />
              Crisis Support
            </button>
            <button
              onClick={() => setActiveTab('therapists')}
              className="btn"
              style={{
                backgroundColor: activeTab === 'therapists' ? '#2563eb' : 'white',
                color: activeTab === 'therapists' ? 'white' : '#6b7280',
                border: activeTab === 'therapists' ? 'none' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Users size={16} />
              Find Therapists
            </button>
          </div>
        </div>

        {/* Crisis Support Tab */}
        {activeTab === 'crisis' && (
          <>
            {/* Emergency Resources */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                Immediate Help
              </h2>
              <div className="grid grid-2">
                {crisisResources.map((resource, index) => {
                  const Icon = resource.icon
                  return (
                    <div 
                      key={index} 
                      className="card" 
                      style={{ 
                        textAlign: 'center', 
                        border: `2px solid ${resource.color}`,
                        backgroundColor: resource.priority === 'emergency' ? '#fef2f2' : 'white'
                      }}
                    >
                      <Icon size={48} color={resource.color} style={{ margin: '0 auto 1rem' }} />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {resource.title}
                      </h3>
                      <div style={{ fontSize: '2rem', fontWeight: '700', color: resource.color, marginBottom: '1rem' }}>
                        {resource.number}
                      </div>
                      <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        {resource.description}
                      </p>
                      {resource.href ? (
                        <a 
                          href={resource.href} 
                          className="btn" 
                          style={{ 
                            backgroundColor: resource.color, 
                            color: 'white', 
                            fontSize: '1rem', 
                            padding: '0.75rem 1.5rem',
                            textDecoration: 'none'
                          }}
                        >
                          {resource.action}
                        </a>
                      ) : (
                        <button 
                          onClick={resource.onClick}
                          className="btn" 
                          style={{ 
                            backgroundColor: resource.color, 
                            color: 'white', 
                            fontSize: '1rem', 
                            padding: '0.75rem 1.5rem'
                          }}
                        >
                          {resource.action}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Self-Care Tips */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                Immediate Self-Care
              </h2>
              <div className="grid grid-2">
                {selfCareTips.map((tip, index) => {
                  const Icon = tip.icon
                  return (
                    <div key={index} className="card">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ 
                          width: '2.5rem', 
                          height: '2.5rem', 
                          backgroundColor: '#eff6ff', 
                          borderRadius: '0.5rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={20} color="#2563eb" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {tip.title}
                          </h3>
                          <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.4' }}>
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Additional Resources */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
                Additional Resources
              </h2>
              <div className="grid grid-2">
                {additionalResources.map((resource, index) => (
                  <div key={index} className="card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                          {resource.title}
                        </h3>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.5rem' }}>
                          {resource.number}
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                          {resource.description}
                        </p>
                        <a 
                          href={resource.href} 
                          className="btn btn-outline"
                          style={{ fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          Call Now
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notice */}
            <div className="card" style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', textAlign: 'center' }}>
              <AlertTriangle size={32} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
                Important Notice
              </h3>
              <p style={{ color: '#92400e', fontSize: '0.875rem', lineHeight: '1.4', maxWidth: '600px', margin: '0 auto' }}>
                If you are having thoughts of suicide, please reach out for help immediately. 
                These feelings are temporary and help is available. You are valued and your life matters.
              </p>
            </div>
          </>
        )}

        {/* Therapists Tab */}
        {activeTab === 'therapists' && (
          <>
            {/* Registration Button */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <button
                onClick={() => setShowRegistrationForm(true)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
              >
                <UserPlus size={20} />
                Join as a Therapist
              </button>
            </div>

            {/* Success Message */}
            {registrationSuccess && (
              <div className="card" style={{ 
                marginBottom: '2rem', 
                backgroundColor: '#f0fdf4', 
                border: '1px solid #bbf7d0',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={24} color="#22c55e" />
                  <h3 style={{ color: '#166534', margin: 0 }}>Registration Successful!</h3>
                </div>
                <p style={{ color: '#166534', margin: 0 }}>
                  Thank you for joining our therapist network. We'll review your application and contact you within 2-3 business days.
                </p>
              </div>
            )}

            {!selectedTherapist ? (
              <div>
                {/* Search and Filters */}
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Search Bar */}
                    <div style={{ position: 'relative' }}>
                      <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input
                        type="text"
                        placeholder="Search by name or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input"
                        style={{ paddingLeft: '2.5rem' }}
                      />
                    </div>

                    {/* Specialty Filter */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Specialty
                      </label>
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="input"
                      >
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    {filteredTherapists.length} Therapist{filteredTherapists.length !== 1 ? 's' : ''} Found
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredTherapists.map((therapist) => (
                      <div key={therapist.id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => setSelectedTherapist(therapist)}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                          <div style={{ fontSize: '3rem' }}>{therapist.image}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>{therapist.name}</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{therapist.title}</p>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2563eb' }}>${therapist.price}</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>per session</div>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Star size={16} color="#fbbf24" fill="#fbbf24" />
                                <span style={{ fontWeight: '500' }}>{therapist.rating}</span>
                                <span>({therapist.reviews} reviews)</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <MapPin size={16} />
                                <span>{therapist.location}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={16} />
                                <span>{therapist.experience}</span>
                              </div>
                            </div>
                            
                            <div style={{ marginBottom: '0.75rem' }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {therapist.specialties.map((specialty) => (
                                  <span key={specialty} style={{ 
                                    padding: '0.25rem 0.5rem', 
                                    backgroundColor: '#eff6ff', 
                                    color: '#2563eb', 
                                    fontSize: '0.75rem', 
                                    borderRadius: '0.25rem',
                                    fontWeight: '500'
                                  }}>
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <p style={{ color: '#6b7280', marginBottom: '0.75rem', lineHeight: '1.4', fontSize: '0.875rem' }}>
                              {therapist.bio}
                            </p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                Next available: {therapist.nextAvailable}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Therapist Detail */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <div style={{ fontSize: '4rem' }}>{selectedTherapist.image}</div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>{selectedTherapist.name}</h2>
                      <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '1rem' }}>{selectedTherapist.title}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Star size={20} color="#fbbf24" fill="#fbbf24" />
                          <span style={{ fontWeight: '600' }}>{selectedTherapist.rating}</span>
                          <span style={{ color: '#6b7280' }}>({selectedTherapist.reviews} reviews)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                          <MapPin size={20} />
                          <span>{selectedTherapist.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                          <Clock size={20} />
                          <span>{selectedTherapist.experience}</span>
                        </div>
                      </div>
                      
                      <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2563eb' }}>${selectedTherapist.price}/session</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                  {/* About */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>About</h3>
                      <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{selectedTherapist.bio}</p>
                    </div>

                    <div className="card">
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Specialties</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {selectedTherapist.specialties.map((specialty) => (
                          <span key={specialty} style={{ 
                            padding: '0.5rem 1rem', 
                            backgroundColor: '#eff6ff', 
                            color: '#2563eb', 
                            borderRadius: '0.5rem',
                            fontWeight: '500'
                          }}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Book Session</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                          <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Next Available</div>
                          <div style={{ color: '#6b7280' }}>{selectedTherapist.nextAvailable}</div>
                        </div>
                        
                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <MessageCircle size={16} />
                          Book Online Session
                        </button>
                        
                        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <Phone size={16} />
                          Book Phone Session
                        </button>
                        
                        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <Video size={16} />
                          Book Video Session
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTherapist(null)}
                      className="btn btn-ghost"
                      style={{ width: '100%' }}
                    >
                      ← Back to Search Results
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Quick Access to App Features */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
            Use Our Tools
          </h2>
          <div className="grid grid-3">
            <a href="/mood-tracking" className="feature-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Heart size={24} color="#ef4444" />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Mood Tracking</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Track your emotional patterns</p>
                </div>
              </div>
            </a>
            <a href="/journaling" className="feature-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BookOpen size={24} color="#2563eb" />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Journaling</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Express your thoughts safely</p>
                </div>
              </div>
            </a>
            <a href="/meditation" className="feature-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Brain size={24} color="#8b5cf6" />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Meditation</h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Find calm and peace</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Therapist Registration Form Modal */}
        {showRegistrationForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                  Join Our Therapist Network
                </h2>
                <button
                  onClick={closeRegistrationForm}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  <X size={24} color="#6b7280" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} style={{ padding: '1.5rem' }}>
                {/* Personal Information */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Personal Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Professional Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Professional Title *
                      </label>
                      <select
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="input"
                        required
                      >
                        <option value="">Select Title</option>
                        <option value="Licensed Clinical Psychologist">Licensed Clinical Psychologist</option>
                        <option value="Licensed Clinical Social Worker">Licensed Clinical Social Worker</option>
                        <option value="Licensed Professional Counselor">Licensed Professional Counselor</option>
                        <option value="Licensed Marriage & Family Therapist">Licensed Marriage & Family Therapist</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        License Number *
                      </label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        License State *
                      </label>
                      <input
                        type="text"
                        value={formData.licenseState}
                        onChange={(e) => handleInputChange('licenseState', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        value={formData.yearsExperience}
                        onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                        className="input"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Specialties & Approaches
                  </h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                      Areas of Specialization *
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {specialties.filter(s => s !== 'All').map(specialty => (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => handleArrayChange('specialties', specialty)}
                          className="btn"
                          style={{
                            backgroundColor: formData.specialties.includes(specialty) ? '#2563eb' : 'white',
                            color: formData.specialties.includes(specialty) ? 'white' : '#6b7280',
                            border: formData.specialties.includes(specialty) ? 'none' : '1px solid #e5e7eb',
                            fontSize: '0.875rem',
                            padding: '0.5rem 1rem'
                          }}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Agreement */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Agreement
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        required
                      />
                      <span style={{ fontSize: '0.875rem' }}>
                        I agree to the <a href="#" style={{ color: '#2563eb' }}>Terms of Service</a> and <a href="#" style={{ color: '#2563eb' }}>Privacy Policy</a> *
                      </span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        checked={formData.agreeToBackgroundCheck}
                        onChange={(e) => handleInputChange('agreeToBackgroundCheck', e.target.checked)}
                        required
                      />
                      <span style={{ fontSize: '0.875rem' }}>
                        I consent to a background check and license verification *
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={closeRegistrationForm}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!formData.agreeToTerms || !formData.agreeToBackgroundCheck}
                    style={{ 
                      opacity: (!formData.agreeToTerms || !formData.agreeToBackgroundCheck) ? 0.5 : 1 
                    }}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
