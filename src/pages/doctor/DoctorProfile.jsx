import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    specialization: 'Cardiology',
    availability: 'Mon–Fri, 9:00 AM - 5:00 PM',
    fees: '50',
    languages: 'English, Spanish',
    notifications: true,
  });

  const updateField = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Doctor Profile & Settings</h1>
          <p className="text-slate-500 mt-2">Configure your professional details and preferences.</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
            <input
              type="text"
              value={profile.specialization}
              onChange={(e) => updateField('specialization', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Availability Timings</label>
            <input
              type="text"
              value={profile.availability}
              onChange={(e) => updateField('availability', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Consultation Fees ($)</label>
            <input
              type="number"
              value={profile.fees}
              onChange={(e) => updateField('fees', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Language Preference</label>
            <input
              type="text"
              value={profile.languages}
              onChange={(e) => updateField('languages', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-800">Notification Settings</p>
              <p className="text-xs text-slate-500">Receive alerts for new reports and follow-ups.</p>
            </div>
            <button
              type="button"
              onClick={() => updateField('notifications', !profile.notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${profile.notifications ? 'bg-green-500' : 'bg-slate-300'}`}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  profile.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              ></span>
            </button>
          </div>

          <button className="inline-flex items-center px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-blue-600 shadow-sm">
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default DoctorProfile;
