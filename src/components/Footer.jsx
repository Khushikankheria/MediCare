import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">MediCare</span>
            </Link>
            <p className="text-sm text-slate-400">
              Empowering patients with smart healthcare solutions for a better, healthier life.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/patient/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/patient/appointments" className="hover:text-primary transition-colors">Book Appointment</Link></li>
              <li><Link to="/patient/medicines" className="hover:text-primary transition-colors">Medicine Reminders</Link></li>
              <li><Link to="/patient/emergency" className="hover:text-red-400 transition-colors">Emergency</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +1 (555) 123-4567</li>
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> support@medicare.com</li>
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> 123 Health Street, Med City</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for health tips and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border-none rounded-l-md px-4 py-2 w-full focus:ring-1 focus:ring-primary text-sm"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} MediCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
