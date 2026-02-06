import React, { useMemo, useState } from 'react';
import { CalendarCheck, CheckCircle, XCircle, RefreshCcw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState('today');

  const appointments = [
    { id: 1, patient: 'Emma Davis', date: 'Today', time: '09:00 AM', status: 'Pending' },
    { id: 2, patient: 'Liam Carter', date: 'Today', time: '10:30 AM', status: 'Confirmed' },
    { id: 3, patient: 'Sophia Patel', date: 'Tomorrow', time: '01:00 PM', status: 'Pending' },
    { id: 4, patient: 'Noah Wilson', date: 'Jan 28', time: '04:30 PM', status: 'Completed' },
    { id: 5, patient: 'Olivia Brown', date: 'Jan 25', time: '11:00 AM', status: 'Cancelled' },
  ];

  const filtered = useMemo(() => {
    if (activeTab === 'today') return appointments.filter((a) => a.date === 'Today');
    if (activeTab === 'upcoming') return appointments.filter((a) => ['Today', 'Tomorrow'].includes(a.date) && a.status !== 'Completed');
    return appointments.filter((a) => ['Completed', 'Cancelled'].includes(a.status));
  }, [activeTab, appointments]);

  const statusStyle = (status) => {
    if (status === 'Pending') return 'bg-amber-50 text-amber-700';
    if (status === 'Confirmed') return 'bg-blue-50 text-blue-700';
    if (status === 'Completed') return 'bg-green-50 text-green-700';
    return 'bg-red-50 text-red-700';
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Appointment Management</h1>
          <p className="text-slate-500 mt-2">Review, accept, and manage patient appointments.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {['today', 'upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'today' ? "Today's" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 text-xs font-semibold text-slate-500 bg-slate-50">
            <div className="col-span-4">Patient</div>
            <div className="col-span-3">Date & Time</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>
          <div className="divide-y divide-slate-100">
            {filtered.map((appt) => (
              <div key={appt.id} className="grid grid-cols-12 items-center px-6 py-4">
                <div className="col-span-4">
                  <p className="font-semibold text-slate-900">{appt.patient}</p>
                  <p className="text-xs text-slate-500">General Consultation</p>
                </div>
                <div className="col-span-3 text-sm text-slate-600">
                  {appt.date} • {appt.time}
                </div>
                <div className="col-span-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  {appt.status === 'Pending' && (
                    <>
                      <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-green-50 text-green-700 hover:bg-green-100">
                        <CheckCircle className="h-4 w-4 mr-1" /> Accept
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-red-50 text-red-700 hover:bg-red-100">
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </button>
                    </>
                  )}
                  {appt.status === 'Confirmed' && (
                    <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100">
                      <RefreshCcw className="h-4 w-4 mr-1" /> Reschedule
                    </button>
                  )}
                  {appt.status === 'Completed' && (
                    <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                      <FileText className="h-4 w-4 mr-1" /> Add Notes
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DoctorAppointments;
