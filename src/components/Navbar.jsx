import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Activity, Calendar, Pill, AlertCircle, Home } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/patient/dashboard', icon: Activity },
    { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Medicines', path: '/patient/medicines', icon: Pill },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                 <Activity className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">MediCare</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
              >
                <div className={clsx(
                  "flex items-center relative z-10",
                  isActive(item.path) ? "text-primary" : "text-slate-600 group-hover:text-primary"
                )}>
                  <item.icon className={clsx("h-4 w-4 mr-2 transition-transform group-hover:scale-110", isActive(item.path) && "scale-110")} />
                  {item.name}
                </div>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-blue-50 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/patient/emergency"
              className="ml-4 flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <AlertCircle className="h-4 w-4 mr-2 animate-pulse" />
              Emergency
            </Link>
            {role ? (
              <button
                onClick={handleLogout}
                className="ml-3 flex items-center px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-3 flex items-center px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-primary hover:bg-slate-50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    isActive(item.path)
                      ? 'bg-blue-50 text-primary'
                      : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              <Link
                to="/patient/emergency"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-base font-medium bg-red-50 text-red-600 hover:bg-red-100 mt-4"
              >
                <AlertCircle className="h-5 w-5 mr-3" />
                Emergency Support
              </Link>
              {role ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
