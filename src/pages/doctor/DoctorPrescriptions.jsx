import React, { useMemo, useState } from 'react';
import { Pill, Plus, Send, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const DoctorPrescriptions = () => {
  const [patient, setPatient] = useState('Emma Davis');
  const [med, setMed] = useState({ name: '', dosage: '', duration: '' });
  const [items, setItems] = useState([]);

  const suggestions = ['Amoxicillin', 'Atorvastatin', 'Metformin', 'Lisinopril'];
  const existingMeds = ['Metformin 500mg', 'Vitamin D 1000 IU'];

  const addItem = (e) => {
    e.preventDefault();
    if (!med.name || !med.dosage || !med.duration) return;
    setItems((prev) => [...prev, { ...med, id: Date.now() }]);
    setMed({ name: '', dosage: '', duration: '' });
  };

  const filteredSuggestions = useMemo(() => {
    if (!med.name) return suggestions;
    return suggestions.filter((s) => s.toLowerCase().includes(med.name.toLowerCase()));
  }, [med.name, suggestions]);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Prescriptions & Recommendations</h1>
          <p className="text-slate-500 mt-2">Create prescriptions and send them directly to patients.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <Pill className="h-5 w-5 mr-2 text-primary" /> Create Prescription
              </h2>
              <select
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
              >
                {['Emma Davis', 'Liam Carter', 'Sophia Patel'].map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>

            <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medicine</label>
                <input
                  type="text"
                  value={med.name}
                  onChange={(e) => setMed({ ...med, name: e.target.value })}
                  placeholder="Start typing..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {filteredSuggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filteredSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setMed({ ...med, name: s })}
                        className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dosage</label>
                <input
                  type="text"
                  value={med.dosage}
                  onChange={(e) => setMed({ ...med, dosage: e.target.value })}
                  placeholder="e.g. 500mg"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={med.duration}
                  onChange={(e) => setMed({ ...med, duration: e.target.value })}
                  placeholder="e.g. 7 days"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="md:col-span-3 flex justify-end">
                <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-blue-600 shadow-sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Medicine
                </button>
              </div>
            </form>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Prescription Items</h3>
              <div className="space-y-3">
                {items.length === 0 ? (
                  <p className="text-sm text-slate-500">No medicines added yet.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.dosage} • {item.duration}</p>
                      </div>
                      <span className="text-xs text-slate-500">To: {patient}</span>
                    </div>
                  ))
                )}
              </div>
              <button className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 shadow-sm">
                <Send className="h-4 w-4 mr-2" /> Send to Patient
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4">Existing Medications</h3>
            <ul className="space-y-3">
              {existingMeds.map((medName) => (
                <li key={medName} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-sm text-slate-700">{medName}</span>
                  <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">Check interactions</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700 flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
              Review medications to avoid conflicts before sending the prescription.
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DoctorPrescriptions;
