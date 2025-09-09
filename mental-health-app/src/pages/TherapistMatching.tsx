import { useState } from 'react'
import { Users, Star, MapPin, Clock, MessageCircle, Phone, Video, Filter, Search } from 'lucide-react'

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
    availability: 'Available this week',
    languages: ['English', 'Spanish'],
    price: '$150/session',
    image: '👩‍⚕️',
    bio: 'Specialized in cognitive-behavioral therapy with a focus on anxiety and depression. I believe in creating a safe, non-judgmental space for healing.',
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
    availability: 'Available next week',
    languages: ['English', 'Mandarin'],
    price: '$175/session',
    image: '👨‍⚕️',
    bio: 'Passionate about helping couples and families build stronger relationships through evidence-based therapy approaches.',
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
    availability: 'Available this week',
    languages: ['English', 'Spanish'],
    price: '$140/session',
    image: '👩‍⚕️',
    bio: 'Trauma-informed therapist specializing in EMDR and somatic approaches to healing from traumatic experiences.',
    nextAvailable: 'Friday at 3:00 PM',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    title: 'Licensed Professional Counselor',
    specialties: ['Addiction', 'Substance Abuse', 'Recovery'],
    experience: '10 years',
    rating: 4.7,
    reviews: 98,
    location: 'Houston, TX',
    availability: 'Available next week',
    languages: ['English'],
    price: '$160/session',
    image: '👨‍⚕️',
    bio: 'Dedicated to supporting individuals in their recovery journey with compassion and evidence-based treatment methods.',
    nextAvailable: 'Wednesday at 1:00 PM',
  },
  {
    id: 5,
    name: 'Dr. Lisa Park',
    title: 'Licensed Clinical Psychologist',
    specialties: ['Eating Disorders', 'Body Image', 'Self-Esteem'],
    experience: '7 years',
    rating: 4.8,
    reviews: 112,
    location: 'Seattle, WA',
    availability: 'Available this week',
    languages: ['English', 'Korean'],
    price: '$155/session',
    image: '👩‍⚕️',
    bio: 'Specialized in treating eating disorders and body image concerns with a holistic, compassionate approach.',
    nextAvailable: 'Thursday at 11:00 AM',
  },
  {
    id: 6,
    name: 'Dr. Robert Thompson',
    title: 'Licensed Clinical Psychologist',
    specialties: ['ADHD', 'Learning Disabilities', 'Executive Function'],
    experience: '15 years',
    rating: 4.9,
    reviews: 203,
    location: 'Boston, MA',
    availability: 'Available next week',
    languages: ['English'],
    price: '$180/session',
    image: '👨‍⚕️',
    bio: 'Expert in neuropsychological assessment and treatment of ADHD and learning differences across the lifespan.',
    nextAvailable: 'Tuesday at 4:00 PM',
  },
]

const specialties = ['All', 'Anxiety', 'Depression', 'Trauma', 'Couples Therapy', 'Family Issues', 'Addiction', 'Eating Disorders', 'ADHD']
const priceRanges = ['All', 'Under $150', '$150-$175', '$175+']
const availability = ['All', 'This Week', 'Next Week']

export default function TherapistMatching() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All')
  const [selectedAvailability, setSelectedAvailability] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTherapist, setSelectedTherapist] = useState<typeof therapists[0] | null>(null)

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSpecialty = selectedSpecialty === 'All' || therapist.specialties.includes(selectedSpecialty)
    const matchesPrice = selectedPriceRange === 'All' || 
      (selectedPriceRange === 'Under $150' && parseInt(therapist.price) < 150) ||
      (selectedPriceRange === '$150-$175' && parseInt(therapist.price) >= 150 && parseInt(therapist.price) <= 175) ||
      (selectedPriceRange === '$175+' && parseInt(therapist.price) > 175)
    const matchesAvailability = selectedAvailability === 'All' || 
      (selectedAvailability === 'This Week' && therapist.availability.includes('this week')) ||
      (selectedAvailability === 'Next Week' && therapist.availability.includes('next week'))
    const matchesSearch = searchQuery === '' || 
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesSpecialty && matchesPrice && matchesAvailability && matchesSearch
  })

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Find a Therapist
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Connect with licensed mental health professionals who match your needs and preferences.
          </p>
        </div>

        {!selectedTherapist ? (
          <div>
            {/* Search and Filters */}
            <div className="card mb-8">
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
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
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="input"
                    >
                      {priceRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Availability
                    </label>
                    <select
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                      className="input"
                    >
                      {availability.map(avail => (
                        <option key={avail} value={avail}>{avail}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">
                  {filteredTherapists.length} Therapist{filteredTherapists.length !== 1 ? 's' : ''} Found
                </h2>
                <button className="btn btn-outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>

              {filteredTherapists.map((therapist) => (
                <div key={therapist.id} className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedTherapist(therapist)}>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{therapist.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900">{therapist.name}</h3>
                          <p className="text-neutral-600">{therapist.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">{therapist.price}</div>
                          <div className="text-sm text-neutral-500">per session</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{therapist.rating}</span>
                          <span className="text-neutral-500">({therapist.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <MapPin className="w-4 h-4" />
                          <span>{therapist.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Clock className="w-4 h-4" />
                          <span>{therapist.experience}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {therapist.specialties.map((specialty) => (
                            <span key={specialty} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 mb-4 line-clamp-2">{therapist.bio}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-neutral-500">
                          Next available: {therapist.nextAvailable}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-neutral-500">{therapist.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Therapist Detail */}
            <div className="card mb-6">
              <div className="flex items-start space-x-6">
                <div className="text-6xl">{selectedTherapist.image}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-2">{selectedTherapist.name}</h2>
                  <p className="text-xl text-neutral-600 mb-4">{selectedTherapist.title}</p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-semibold">{selectedTherapist.rating}</span>
                      <span className="text-neutral-500">({selectedTherapist.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-neutral-600">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedTherapist.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-neutral-600">
                      <Clock className="w-5 h-5" />
                      <span>{selectedTherapist.experience}</span>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-primary-600 mb-4">{selectedTherapist.price}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* About */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">About</h3>
                  <p className="text-neutral-600 leading-relaxed">{selectedTherapist.bio}</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapist.specialties.map((specialty) => (
                      <span key={specialty} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Languages</h3>
                  <p className="text-neutral-600">{selectedTherapist.languages.join(', ')}</p>
                </div>
              </div>

              {/* Booking */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Book Session</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="font-medium text-neutral-900">Next Available</div>
                      <div className="text-neutral-600">{selectedTherapist.nextAvailable}</div>
                    </div>
                    
                    <button className="w-full btn btn-primary">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Book Online Session
                    </button>
                    
                    <button className="w-full btn btn-outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Book Phone Session
                    </button>
                    
                    <button className="w-full btn btn-outline">
                      <Video className="w-4 h-4 mr-2" />
                      Book Video Session
                    </button>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Contact</h3>
                  <div className="space-y-3">
                    <button className="w-full btn btn-outline text-left justify-start">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                    <button className="w-full btn btn-outline text-left justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Office
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTherapist(null)}
                  className="w-full btn btn-ghost"
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
