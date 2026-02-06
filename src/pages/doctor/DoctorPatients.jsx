import React, { useMemo, useState } from 'react';
import { Search, User, Phone, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const DoctorPatients = () => {
  const [query, setQuery] = useState('');

  const patients = [
    { id: 1, name: 'Emma Davis', age: 32, condition: 'Hypertension', phone: '(555) 123-1001' },
    { id: 2, name: 'Liam Carter', age: 45, condition: 'Diabetes Type II', phone: '(555) 123-1002' },
    { id: 3, name: 'Sophia Patel', age: 29, condition: 'Asthma', phone: '(555) 123-1003' },
    { id: 4, name: 'Noah Wilson', age: 54, condition: 'Cardiac Monitoring', phone: '(555) 123-1004' },
  ];

  const filtered = useMemo(() => {
    if (!query.trim()) return patients;
    return patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, patients]);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Patient List & Profiles</h1>
          <p className="text-slate-500 mt-2">Manage patient history and profile details.</p>
        </motion.div>

        <div className="relative mb-6 max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent w-full shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((patient) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-primary flex items-center justify-center mr-4">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{patient.name}</h3>
                    <p className="text-sm text-slate-500">Age {patient.age} • {patient.condition}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 font-medium">Active</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="h-4 w-4 mr-2 text-slate-400" /> {patient.phone}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                  <FileText className="h-4 w-4 mr-1" /> View Profile
                </button>
                <button className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100">
                  View Reports
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default DoctorPatients;
