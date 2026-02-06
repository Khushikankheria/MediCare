import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, Star, User, X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { appointmentAPI, doctorAPI } from '../services/api';

const defaultDoctors = [
  { id: 1, name: 'Dr. Sarah Wilson', specialty: 'Cardiology', rating: 4.9, reviews: 124, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 2, name: 'Dr. Ethan Brooks', specialty: 'Cardiology', rating: 4.8, reviews: 98, image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 3, name: 'Dr. Mia Collins', specialty: 'Cardiology', rating: 4.7, reviews: 86, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 4, name: 'Dr. Oliver Reed', specialty: 'Cardiology', rating: 4.9, reviews: 141, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 5, name: 'Dr. James Carter', specialty: 'Dermatology', rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 6, name: 'Dr. Ava Singh', specialty: 'Dermatology', rating: 4.7, reviews: 102, image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 7, name: 'Dr. Henry Patel', specialty: 'Dermatology', rating: 4.6, reviews: 77, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 8, name: 'Dr. Chloe Nguyen', specialty: 'Dermatology', rating: 4.9, reviews: 133, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 9, name: 'Dr. Emily Chen', specialty: 'Pediatrics', rating: 5.0, reviews: 210, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 10, name: 'Dr. Lucas Martin', specialty: 'Pediatrics', rating: 4.8, reviews: 120, image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 11, name: 'Dr. Aria Lopez', specialty: 'Pediatrics', rating: 4.7, reviews: 101, image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 12, name: 'Dr. Noah Bennett', specialty: 'Pediatrics', rating: 4.9, reviews: 165, image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 13, name: 'Dr. Michael Brown', specialty: 'Neurology', rating: 4.7, reviews: 76, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 14, name: 'Dr. Sophia Park', specialty: 'Neurology', rating: 4.8, reviews: 112, image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 15, name: 'Dr. Daniel Ross', specialty: 'Neurology', rating: 4.6, reviews: 90, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 16, name: 'Dr. Grace Kim', specialty: 'Neurology', rating: 4.9, reviews: 154, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 17, name: 'Dr. Priya Sharma', specialty: 'Orthopedics', rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1627765012749-c7d23ab1fc3e?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 18, name: 'Dr. Jack Howard', specialty: 'Orthopedics', rating: 4.7, reviews: 88, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 19, name: 'Dr. Lily Adams', specialty: 'Orthopedics', rating: 4.8, reviews: 143, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 20, name: 'Dr. Ryan Cooper', specialty: 'Orthopedics', rating: 4.6, reviews: 79, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 21, name: 'Dr. Robert Martinez', specialty: 'Psychiatry', rating: 4.6, reviews: 98, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 22, name: 'Dr. Ella Stone', specialty: 'Psychiatry', rating: 4.8, reviews: 132, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 23, name: 'Dr. Mason Price', specialty: 'Psychiatry', rating: 4.7, reviews: 110, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 24, name: 'Dr. Zoe Turner', specialty: 'Psychiatry', rating: 4.9, reviews: 174, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 25, name: 'Dr. Lisa Anderson', specialty: 'Gynecology', rating: 4.8, reviews: 187, image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 26, name: 'Dr. Nora Bailey', specialty: 'Gynecology', rating: 4.7, reviews: 121, image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 27, name: 'Dr. Amelia Scott', specialty: 'Gynecology', rating: 4.9, reviews: 159, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 28, name: 'Dr. Leah Morgan', specialty: 'Gynecology', rating: 4.6, reviews: 93, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 29, name: 'Dr. David Kim', specialty: 'Ophthalmology', rating: 4.9, reviews: 143, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 30, name: 'Dr. Isaac Rivera', specialty: 'Ophthalmology', rating: 4.8, reviews: 111, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 31, name: 'Dr. Maya Shah', specialty: 'Ophthalmology', rating: 4.7, reviews: 96, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 32, name: 'Dr. Ethan Grant', specialty: 'Ophthalmology', rating: 4.9, reviews: 150, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300&h=300', available: true },

  { id: 33, name: 'Dr. Maria Garcia', specialty: 'ENT', rating: 4.7, reviews: 112, image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 34, name: 'Dr. Caleb Wright', specialty: 'ENT', rating: 4.8, reviews: 128, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300', available: true },
  { id: 35, name: 'Dr. Vivian Ortiz', specialty: 'ENT', rating: 4.6, reviews: 84, image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=300&h=300', available: false },
  { id: 36, name: 'Dr. Aaron Flores', specialty: 'ENT', rating: 4.9, reviews: 166, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300', available: true },
];

const specialtyCategories = [
  { title: 'Cardiology', match: ['cardio'] },
  { title: 'Dermatology', match: ['derma'] },
  { title: 'Pediatrics', match: ['pediatric'] },
  { title: 'Neurology', match: ['neuro'] },
  { title: 'Orthopedics', match: ['ortho'] },
  { title: 'Psychiatry', match: ['psychi'] },
  { title: 'Gynecology', match: ['gyne'] },
  { title: 'Ophthalmology', match: ['ophthalm'] },
  { title: 'ENT', match: ['ent'] },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Appointments = () => {
  const [doctors, setDoctors] = useState(defaultDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(0); // 0: None, 1: Form, 2: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch doctors from API on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await doctorAPI.getAllDoctors();
        if (data && data.length > 0) {
          setDoctors(data);
        }
      } catch (err) {
        console.error('Failed to fetch doctors from API, using defaults');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData(e.target);
      const appointmentData = {
        patientId: 'patient_' + Date.now(),
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date: formData.get('date'),
        time: formData.get('time'),
        reason: formData.get('reason'),
        status: 'Pending',
      };

      const response = await appointmentAPI.createAppointment(appointmentData);
      console.log('Appointment created:', response);
      
      setBookingStep(2);
      setTimeout(() => {
        setBookingStep(0);
        setSelectedDoctor(null);
      }, 3000);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDoctorCard = (doctor) => (
    <motion.div
      variants={item}
      key={doctor.id}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 overflow-hidden flex flex-col"
    >
      <div className="h-48 overflow-hidden bg-slate-100 relative group">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center shadow-sm">
          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
          <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
        <p className="text-primary text-sm font-medium mb-2">{doctor.specialty}</p>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="h-3 w-3 mr-1" />
          <span>Central Hospital</span>
        </div>
        <div className="flex items-center justify-between mt-auto mb-4">
          <span
            className={clsx(
              'text-xs px-2 py-1 rounded-full font-medium',
              doctor.available ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            )}
          >
            {doctor.available ? 'Available Today' : 'Next Available: Tue'}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleBook(doctor)}
          className="w-full py-2 bg-slate-50 text-slate-900 rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
        >
          Book Appointment
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <PageTransition>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900">Find a Doctor</h1>
          <p className="text-slate-500 mt-2">Book appointments with top specialists in your area.</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 md:mt-0 relative"
        >
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors, specialties..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-80 shadow-sm transition-all"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
        </motion.div>
      </div>

      {searchQuery.trim() ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredDoctors.map(renderDoctorCard)}
        </motion.div>
      ) : (
        <div className="space-y-10">
          {specialtyCategories.map((category) => {
            const categoryDoctors = doctors
              .filter((doctor) => {
                const specialty = doctor.specialty.toLowerCase();
                return category.match.some((key) => specialty.includes(key));
              })
              .slice(0, 4);

            if (categoryDoctors.length === 0) return null;

            return (
              <div key={category.title}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">{category.title}</h2>
                  <span className="text-xs text-slate-500">{categoryDoctors.length} doctors</span>
                </div>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {categoryDoctors.map(renderDoctorCard)}
                </motion.div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingStep > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
            >
              <button 
                onClick={() => setBookingStep(0)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {bookingStep === 1 ? (
                <form onSubmit={handleSubmit} className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Appointment</h2>
                  <p className="text-slate-500 mb-6">with {selectedDoctor?.name}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <input type="date" name="date" required className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <select name="time" required className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-all">
                          <option>09:00 AM</option>
                          <option>10:30 AM</option>
                          <option>02:00 PM</option>
                          <option>04:15 PM</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit</label>
                        <textarea name="reason" rows="3" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-all" placeholder="Briefly describe your symptoms..."></textarea>
                    </div>
                  </div>

                  <div className="mt-8 flex space-x-3">
                    <button 
                      type="button" 
                      onClick={() => setBookingStep(0)}
                      className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-blue-600 font-medium shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-10 text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"
                  >
                     <Calendar className="h-10 w-10" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-slate-500 mb-8">Your appointment with {selectedDoctor?.name} has been scheduled. A confirmation email has been sent.</p>
                  <button 
                    onClick={() => setBookingStep(0)}
                    className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-600 font-medium shadow-lg shadow-blue-500/30"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  );
};

export default Appointments;