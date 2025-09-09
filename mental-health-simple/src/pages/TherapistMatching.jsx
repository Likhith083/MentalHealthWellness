import { useState } from 'react'
import { Users, Star, MapPin, Clock, MessageCircle, Phone, Video, Filter, Search, Heart } from 'lucide-react'

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

const specialties = ['All', 'Anxiety', 'Depression', 'Trauma', 'Couples Therapy', 'Family Issues']

export default function TherapistMatching() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTherapist, setSelectedTherapist] = useState(null)

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSpecialty = selectedSpecialty === 'All' || therapist.specialties.includes(selectedSpecialty)
    const matchesSearch = searchQuery === '' || 
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesSpecialty && matchesSearch
  })

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
        </div>

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
      </div>
    </div>
  )
}
