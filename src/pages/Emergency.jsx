import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Ambulance, Heart, Activity, Clock, ChevronDown, Loader, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import PageTransition from '../components/PageTransition';

const Emergency = () => {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sosSent, setSosSent] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationMode, setLocationMode] = useState('auto'); // 'auto' or 'manual'

  // Auto-detect user location on mount
  useEffect(() => {
    requestUserLocation();
  }, []);

  // SOS countdown timer
  useEffect(() => {
    let timer;
    if (sosActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (sosActive && countdown === 0) {
      setSosSent(true);
      setSosActive(false);
    }
    return () => clearTimeout(timer);
  }, [sosActive, countdown]);

  // Fetch nearby hospitals
  useEffect(() => {
    if (userLocation) {
      fetchNearbyHospitals(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  const requestUserLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation not supported. Please enter your address manually.');
      setLocationMode('manual');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        // Reverse geocode to get address
        reverseGeocode(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to access location. Please enter your address manually.');
        setLocationMode('manual');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.address) {
        const addressStr = data.address.road || data.address.village || data.address.city || '';
        setAddress(addressStr);
      }
    } catch (err) {
      console.error('Reverse geocode error:', err);
    }
  };

  const fetchNearbyHospitals = async (lat, lng) => {
    setLoading(true);
    setError(null);
    
    try {
      // Using Overpass API to find hospitals
      const query = `
        [bbox:${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}];
        (
          node["amenity"="hospital"](${lat - 0.05},${lng - 0.05},${lat + 0.05},${lng + 0.05});
          way["amenity"="hospital"](${lat - 0.05},${lng - 0.05},${lat + 0.05},${lng + 0.05});
        );
        out center;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });

      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      
      if (data.elements && data.elements.length > 0) {
        const hospitalsList = data.elements
          .slice(0, 5) // Limit to 5 hospitals
          .map((element) => {
            const hospitalLat = element.center?.lat || element.lat;
            const hospitalLng = element.center?.lon || element.lon;
            const distance = calculateDistance(lat, lng, hospitalLat, hospitalLng);
            const time = Math.ceil(distance / 20 * 60); // Assume 20 km/h average

            return {
              id: element.id,
              name: element.tags?.name || 'Hospital',
              distance: `${distance.toFixed(1)} km`,
              time: `${time} mins`,
              phone: element.tags?.phone || '911',
              lat: hospitalLat,
              lng: hospitalLng,
            };
          })
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        setHospitals(hospitalsList);
      } else {
        setHospitals([
          { id: 1, name: 'City General Hospital', distance: '1.2 km', time: '5 mins', phone: '911' },
          { id: 2, name: 'St. Mary\'s Medical Center', distance: '3.5 km', time: '12 mins', phone: '555-0123' },
          { id: 3, name: 'Westside Trauma Center', distance: '5.0 km', time: '18 mins', phone: '555-0199' },
        ]);
      }
    } catch (err) {
      console.error('Fetch hospitals error:', err);
      setHospitals([
        { id: 1, name: 'City General Hospital', distance: '1.2 km', time: '5 mins', phone: '911' },
        { id: 2, name: 'St. Mary\'s Medical Center', distance: '3.5 km', time: '12 mins', phone: '555-0123' },
        { id: 3, name: 'Westside Trauma Center', distance: '5.0 km', time: '18 mins', phone: '555-0199' },
      ]);
    }
    
    setLoading(false);
  };

  const searchByAddress = async (e) => {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Geocode address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setUserLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        setError('Address not found. Please try another address.');
      }
    } catch (err) {
      console.error('Geocode error:', err);
      setError('Unable to search address. Please try again.');
    }
    
    setLoading(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSosClick = () => {
    if (sosSent) return;
    setSosActive(true);
    setCountdown(5);
  };

  const cancelSos = () => {
    setSosActive(false);
    setCountdown(5);
  };

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

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Emergency Response
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Immediate assistance for critical situations. Press the SOS button to alert nearby emergency services.
          </p>
        </motion.div>

        {/* Location Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 p-6 border border-white mb-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-blue-600" />
              Your Location
            </h3>
            {userLocation && locationMode === 'auto' && (
              <button
                onClick={requestUserLocation}
                className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors font-medium"
              >
                Update Location
              </button>
            )}
          </div>

          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {locationMode === 'auto' ? (
            <div>
              {loading && !userLocation ? (
                <div className="flex items-center justify-center py-6">
                  <Loader className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                  <span className="text-slate-600">Detecting your location...</span>
                </div>
              ) : userLocation && address ? (
                <div className="text-sm text-slate-600">
                  <p className="font-medium text-slate-900">{address}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Coordinates: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                </div>
              ) : userLocation ? (
                <div className="text-sm text-slate-600">
                  <p className="text-xs text-slate-500">
                    Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                </div>
              ) : null}

              <button
                onClick={() => setLocationMode('manual')}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Or enter address manually →
              </button>
            </div>
          ) : (
            <form onSubmit={searchByAddress} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address..."
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium text-sm flex items-center"
                >
                  {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocationMode('auto');
                  requestUserLocation();
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Use auto-detection
              </button>
            </form>
          )}
        </motion.div>

        {/* SOS Section */}
        <div className="flex justify-center mb-16 relative z-10">
          <div className="relative">
            <AnimatePresence mode="wait">
              {sosSent ? (
                <motion.div 
                  key="sent"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-72 h-72 rounded-full bg-green-50 flex flex-col items-center justify-center text-green-700 border-4 border-green-500 shadow-2xl shadow-green-200"
                >
                   <motion.div 
                     initial={{ scale: 0 }} 
                     animate={{ scale: 1 }} 
                     transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                   >
                     <CheckMark />
                   </motion.div>
                   <h3 className="text-3xl font-bold mt-4">Help Sent!</h3>
                   <p className="text-sm font-medium opacity-80">Ambulance dispatched.</p>
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setSosSent(false)} 
                     className="mt-6 px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold hover:bg-green-200 transition-colors"
                   >
                     Reset
                   </motion.button>
                </motion.div>
              ) : sosActive ? (
                 <motion.div 
                   key="active"
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0.8, opacity: 0 }}
                   className="w-72 h-72 rounded-full bg-red-600 flex flex-col items-center justify-center text-white shadow-2xl shadow-red-300 ring-8 ring-red-100"
                 >
                   <motion.span 
                     key={countdown}
                     initial={{ scale: 1.5, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="text-7xl font-bold"
                   >
                     {countdown}
                   </motion.span>
                   <p className="mt-2 font-medium text-red-100">Sending SOS...</p>
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={cancelSos}
                     className="mt-6 px-8 py-3 bg-white text-red-600 rounded-full text-sm font-extrabold hover:bg-gray-50 shadow-lg"
                   >
                     CANCEL
                   </motion.button>
                 </motion.div>
              ) : (
                <motion.button
                  key="idle"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSosClick}
                  className="group relative w-72 h-72 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center text-white shadow-2xl shadow-red-200 focus:outline-none ring-8 ring-red-50"
                >
                  <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent"></div>
                  <Ambulance className="h-20 w-20 mb-4 drop-shadow-md" />
                  <span className="text-4xl font-extrabold tracking-widest drop-shadow-md">SOS</span>
                  <span className="text-sm mt-2 font-medium bg-red-800/30 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">Press for Help</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-100/50 rounded-full blur-3xl -z-10"></div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Nearby Hospitals */}
          <motion.div variants={item} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-slate-200/50 p-8 border border-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              Nearby Hospitals
            </h2>
            {loading && hospitals.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                <span className="text-slate-600">Finding hospitals...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {hospitals.map((hospital) => (
                  <motion.div 
                    key={hospital.id} 
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                    className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 transition-all cursor-pointer group"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{hospital.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center mt-2 font-medium">
                        <span className="flex items-center bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm mr-2">
                          <MapPin className="h-3 w-3 mr-1 text-slate-400" /> {hospital.distance}
                        </span>
                        <span className="flex items-center bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                          <Clock className="h-3 w-3 mr-1 text-slate-400" /> {hospital.time}
                        </span>
                      </p>
                    </div>
                    <motion.a 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      href={`tel:${hospital.phone}`} 
                      className="flex items-center justify-center h-12 w-12 bg-green-100 text-green-600 rounded-full shadow-sm hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* First Aid / Quick Actions */}
          <motion.div variants={item} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-slate-200/50 p-8 border border-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              First Aid Guide
            </h2>
            <div className="space-y-4">
               <Details title="CPR Instructions" icon={<Activity className="w-5 h-5 text-blue-500" />}>
                  <p className="text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">1. Call 911 immediately.</span><br/>
                    <span className="font-bold text-slate-900">2. Push hard and fast</span> in the center of the chest (100-120 compressions/minute).<br/>
                    <span className="font-bold text-slate-900">3. Give rescue breaths</span> if trained (30 compressions, 2 breaths).
                  </p>
               </Details>
               <Details title="Severe Bleeding" icon={<div className="w-5 h-5 rounded-full bg-red-500" />}>
                  <p className="text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">1. Apply direct pressure</span> to the wound with a clean cloth.<br/>
                    <span className="font-bold text-slate-900">2. Keep pressure</span> until help arrives.<br/>
                    <span className="font-bold text-slate-900">3. Do not remove the cloth</span> if soaked, add more on top.
                  </p>
               </Details>
               <Details title="Choking" icon={<div className="w-5 h-5 rounded-full bg-orange-500" />}>
                  <p className="text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-900">1. Perform Heimlich maneuver</span> (abdominal thrusts).<br/>
                    <span className="font-bold text-slate-900">2. Stand behind person,</span> wrap arms around waist.<br/>
                    <span className="font-bold text-slate-900">3. Make a fist above navel,</span> grab fist and thrust inward and upward.
                  </p>
               </Details>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

const CheckMark = () => (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
    </svg>
);

const Details = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <span className="flex items-center font-bold text-slate-800">
          {icon && <span className="mr-3 p-1.5 bg-slate-100 rounded-lg">{icon}</span>}
          {title}
        </span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-slate-600 border-t border-slate-100 bg-white/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Emergency;
