import React from 'react';
import { CalendarCheck, Siren, Users, Bell, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const DoctorDashboard = () => {
  const appointments = [
    { id: 1, patient: 'Emma Davis', time: '09:00 AM', status: 'Ongoing', type: 'Follow-up' },
    { id: 2, patient: 'Liam Carter', time: '10:30 AM', status: 'Upcoming', type: 'New' },
    { id: 3, patient: 'Sophia Patel', time: '01:00 PM', status: 'Upcoming', type: 'Consultation' },
  ];

  const alerts = [
    { id: 1, patient: 'Noah Wilson', issue: 'Shortness of breath', time: '5 mins ago' },
    { id: 2, patient: 'Olivia Brown', issue: 'Severe headache', time: '12 mins ago' },
  ];

  const stats = [
    { title: 'Active Patients', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'New Reports', value: '18', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Follow-ups Due', value: '7', icon: CalendarCheck, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
          <p className="text-slate-500 mt-2">Quick overview of today’s workload and alerts.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <CalendarCheck className="h-5 w-5 mr-2 text-primary" /> Today’s Appointments
              </h2>
              <span className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full font-medium">{appointments.length} total</span>
            </div>
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-semibold text-slate-900">{appt.patient}</p>
                    <p className="text-xs text-slate-500">{appt.type}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-slate-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> {appt.time}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      appt.status === 'Ongoing' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <Siren className="h-5 w-5 mr-2 text-red-500" /> Emergency Alerts
              </h2>
              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">{alerts.length} active</span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-4 rounded-xl bg-red-50/50 border border-red-100">
                  <div>
                    <p className="font-semibold text-slate-900">{alert.patient}</p>
                    <p className="text-sm text-red-700 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {alert.issue}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DoctorDashboard;
