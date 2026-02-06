import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Stethoscope, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Login = () => {
  const [role, setRole] = useState('patient');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('role', role);
    localStorage.setItem('username', username || 'guest');
    if (role === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/patient/dashboard');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center text-slate-600 hover:text-primary transition-colors font-medium">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
        >
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <User className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Login Now</h1>
            <p className="text-slate-500 mt-2">Choose your portal and continue.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                role === 'patient'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <User className="h-4 w-4 mr-2" /> Patient
            </button>
            <button
              type="button"
              onClick={() => setRole('doctor')}
              className={`flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                role === 'doctor'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Stethoscope className="h-4 w-4 mr-2" /> Doctor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter any username"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter any password"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
