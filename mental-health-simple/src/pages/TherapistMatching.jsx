import { useState } from 'react'
import { Users, Star, MapPin, Clock, MessageCircle, Phone, Video, Filter, Search, Heart, Plus, UserPlus, X, CheckCircle, AlertCircle } from 'lucide-react'

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

export default function TherapistMatching() {
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
            <h1 className="page-title">Find a Therapist</h1>
          </div>
          <p className="page-subtitle">
            Connect with licensed mental health professionals who match your needs and preferences.
          </p>
          
          {/* Registration Button */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={() => setShowRegistrationForm(true)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
            >
              <UserPlus size={20} />
              Join as a Therapist
            </button>
          </div>
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
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="input"
                        placeholder="https://your-website.com"
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
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Professional Bio *
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="textarea"
                        rows="4"
                        placeholder="Tell us about your background, approach, and what makes you unique as a therapist..."
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
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                      Therapy Approaches
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {therapyApproaches.map(approach => (
                        <button
                          key={approach}
                          type="button"
                          onClick={() => handleArrayChange('therapyApproaches', approach)}
                          className="btn"
                          style={{
                            backgroundColor: formData.therapyApproaches.includes(approach) ? '#2563eb' : 'white',
                            color: formData.therapyApproaches.includes(approach) ? 'white' : '#6b7280',
                            border: formData.therapyApproaches.includes(approach) ? 'none' : '1px solid #e5e7eb',
                            fontSize: '0.875rem',
                            padding: '0.5rem 1rem'
                          }}
                        >
                          {approach}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location & Availability */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Location & Availability
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Timezone
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        className="input"
                      >
                        <option value="">Select Timezone</option>
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="CST">Central Time (CST)</option>
                        <option value="MST">Mountain Time (MST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                      </select>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Availability
                      </label>
                      <textarea
                        value={formData.availability}
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                        className="textarea"
                        rows="2"
                        placeholder="e.g., Monday-Friday 9 AM - 6 PM, Weekends by appointment"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Insurance */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Pricing & Insurance
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Hourly Rate (USD) *
                      </label>
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                        className="input"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Insurance Accepted
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {insuranceProviders.map(provider => (
                          <button
                            key={provider}
                            type="button"
                            onClick={() => handleArrayChange('insuranceAccepted', provider)}
                            className="btn"
                            style={{
                              backgroundColor: formData.insuranceAccepted.includes(provider) ? '#22c55e' : 'white',
                              color: formData.insuranceAccepted.includes(provider) ? 'white' : '#6b7280',
                              border: formData.insuranceAccepted.includes(provider) ? 'none' : '1px solid #e5e7eb',
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.75rem'
                            }}
                          >
                            {provider}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={formData.slidingScale}
                          onChange={(e) => handleInputChange('slidingScale', e.target.checked)}
                        />
                        <span style={{ fontSize: '0.875rem' }}>Offer sliding scale fees</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={formData.freeConsultation}
                          onChange={(e) => handleInputChange('freeConsultation', e.target.checked)}
                        />
                        <span style={{ fontSize: '0.875rem' }}>Free initial consultation</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Session Types */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Session Types
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {sessionTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleArrayChange('sessionTypes', type)}
                        className="btn"
                        style={{
                          backgroundColor: formData.sessionTypes.includes(type) ? '#2563eb' : 'white',
                          color: formData.sessionTypes.includes(type) ? 'white' : '#6b7280',
                          border: formData.sessionTypes.includes(type) ? 'none' : '1px solid #e5e7eb',
                          fontSize: '0.875rem',
                          padding: '0.5rem 1rem'
                        }}
                      >
                        {type}
                      </button>
                    ))}
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
