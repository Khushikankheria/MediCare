import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, CheckCircle2, Pill } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <div className="bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white min-h-screen flex items-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          {/* MediCare Logo */}
          <div className="absolute top-0 left-0 z-20 px-6 py-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">MediCare</span>
            </Link>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                  Your Health, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Unified.</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
                  Experience the future of healthcare with a single platform for appointments, records, reminders, and emergency support.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 relative z-20">
                  <Link to="/login" className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-blue-700 bg-white hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Login Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md">
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <div className="md:w-1/2 relative flex justify-center md:justify-end">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="relative z-10"
               >
                 <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 max-w-sm w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center mb-6">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center mr-4 shadow-lg">
                        <Heart className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-white">Heart Rate</h3>
                        <p className="text-sm text-blue-200">Live Monitor</p>
                      </div>
                      <div className="ml-auto text-2xl font-bold text-white">72 <span className="text-sm font-normal text-blue-200">BPM</span></div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                       </div>
                       <div className="flex justify-between text-xs text-blue-200">
                          <span>Min: 60</span>
                          <span>Max: 100</span>
                       </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                       <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className={`h-8 w-8 rounded-full border-2 border-blue-900 bg-blue-${i*200} flex items-center justify-center text-xs font-bold text-blue-900 bg-white`}>
                               <UserIcon />
                            </div>
                          ))}
                       </div>
                       <span className="text-sm text-white font-medium">Top Specialists</span>
                    </div>
                 </div>

                 {/* Floating Elements */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="absolute -top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3"
                 >
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                       <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 font-bold uppercase">Status</p>
                       <p className="text-sm font-bold text-slate-800">Healthy</p>
                    </div>
                 </motion.div>

                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                   className="absolute -bottom-5 -right-5 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3"
                 >
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                       <Pill className="h-6 w-6" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 font-bold uppercase">Reminder</p>
                       <p className="text-sm font-bold text-slate-800">Vitamin D</p>
                    </div>
                 </motion.div>
               </motion.div>
            </div>
            
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-30 animate-blob"></div>
            <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

const UserIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
);

export default Home;
