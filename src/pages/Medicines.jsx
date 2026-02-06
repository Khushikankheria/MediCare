import React, { useState } from 'react';
import { Pill, Plus, Clock, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Medicines = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: '08:00 AM', taken: true },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: '09:00 AM', taken: false },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', time: '09:00 PM', taken: false },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', time: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    setMedicines([...medicines, { ...newMed, id: Date.now(), taken: false }]);
    setShowAddForm(false);
    setNewMed({ name: '', dosage: '', frequency: '', time: '' });
  };

  const toggleTaken = (id) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const deleteMed = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-slate-900">Medicine Reminders</h1>
            <p className="text-slate-500 mt-2">Manage your prescriptions and never miss a dose.</p>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Medicine
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Medicine List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {medicines.map((med) => (
                <motion.div 
                  key={med.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  layout
                  className={`bg-white rounded-2xl shadow-sm p-6 border transition-all ${med.taken ? 'border-green-200 bg-green-50/30' : 'border-slate-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-colors ${med.taken ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-primary'}`}>
                        <Pill className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold transition-all ${med.taken ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{med.name}</h3>
                        <p className="text-sm text-slate-500">{med.dosage} • {med.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-end mr-2">
                        <span className="flex items-center text-sm font-medium text-slate-600">
                          <Clock className="h-4 w-4 mr-1 text-slate-400" />
                          {med.time}
                        </span>
                        {!med.taken && <span className="text-xs text-orange-500 font-medium">Due soon</span>}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTaken(med.id)}
                        className={`p-2 rounded-full transition-colors ${med.taken ? 'text-green-600 hover:bg-green-100' : 'text-slate-300 hover:text-green-500 hover:bg-slate-50'}`}
                        title={med.taken ? "Mark as untaken" : "Mark as taken"}
                      >
                        <CheckCircle className={`h-8 w-8 ${med.taken ? 'fill-current' : ''}`} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, color: '#ef4444' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteMed(med.id)}
                        className="text-slate-300 transition-colors p-2 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {medicines.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200"
              >
                <Pill className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No medicines added yet.</p>
                <button onClick={() => setShowAddForm(true)} className="text-primary hover:underline mt-2 font-medium">Add your first medicine</button>
              </motion.div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <h2 className="text-xl font-bold mb-4 relative z-10">Adherence Score</h2>
                <div className="flex items-end mb-2 relative z-10">
                  <span className="text-5xl font-bold">85%</span>
                  <span className="mb-2 ml-2 text-purple-200 font-medium">Excellent</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 mb-4 relative z-10 backdrop-blur-sm">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-white h-full rounded-full"
                  ></motion.div>
                </div>
                <p className="text-sm text-purple-100 relative z-10">You missed 1 dose last week. Keep it up!</p>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100"
             >
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                  Refill Alerts
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                    <span className="text-slate-700 font-medium">Metformin</span>
                    <span className="text-orange-600 bg-white px-2 py-1 rounded font-bold text-xs shadow-sm">3 days left</span>
                  </li>
                </ul>
                <button className="w-full mt-4 py-2 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors">
                  Order Refill
                </button>
             </motion.div>
          </div>
        </div>

        {/* Add Medicine Modal */}
        <AnimatePresence>
          {showAddForm && (
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
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
              >
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Medicine</h2>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Name</label>
                    <input 
                      type="text" 
                      required
                      value={newMed.name}
                      onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="e.g. Aspirin"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Dosage</label>
                      <input 
                        type="text" 
                        required
                        value={newMed.dosage}
                        onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="e.g. 10mg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <input 
                        type="time" 
                        required
                        value={newMed.time}
                        onChange={(e) => setNewMed({...newMed, time: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                    <select 
                      value={newMed.frequency}
                      onChange={(e) => setNewMed({...newMed, frequency: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Every 8 hours">Every 8 hours</option>
                      <option value="As needed">As needed</option>
                    </select>
                  </div>
                  <div className="flex space-x-3 mt-8">
                    <button 
                      type="button" 
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-blue-600 font-medium shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                    >
                      Add Medicine
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Medicines;