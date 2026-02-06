import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Activity, Heart, Scale, Droplet, TrendingUp, TrendingDown, Clock, Pill } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard = () => {
  // Mock Data
  const bpData = [
    { name: 'Mon', sys: 120, dia: 80 },
    { name: 'Tue', sys: 122, dia: 82 },
    { name: 'Wed', sys: 118, dia: 79 },
    { name: 'Thu', sys: 124, dia: 85 },
    { name: 'Fri', sys: 121, dia: 81 },
    { name: 'Sat', sys: 119, dia: 78 },
    { name: 'Sun', sys: 123, dia: 83 },
  ];

  const sugarData = [
    { name: 'Mon', level: 95 },
    { name: 'Tue', level: 98 },
    { name: 'Wed', level: 92 },
    { name: 'Thu', level: 105 },
    { name: 'Fri', level: 99 },
    { name: 'Sat', level: 94 },
    { name: 'Sun', level: 97 },
  ];

  const stats = [
    { title: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500', bg: 'bg-red-50', status: 'Normal' },
    { title: 'Blood Pressure', value: '120/80', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50', status: 'Optimal' },
    { title: 'Weight', value: '70 kg', icon: Scale, color: 'text-orange-500', bg: 'bg-orange-50', status: '-0.5 kg' },
    { title: 'Blood Glucose', value: '95 mg/dL', icon: Droplet, color: 'text-cyan-500', bg: 'bg-cyan-50', status: 'Normal' },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900">Health Dashboard</h1>
          <p className="text-slate-500 mt-2">Welcome back! Here's your health overview for today.</p>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              variants={item}
              key={index} 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-lg p-6 border border-white/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.status.includes('-') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {stat.status}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* BP Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm p-6 border border-white/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Blood Pressure History</h2>
              <div className="flex items-center space-x-3 text-sm text-slate-500">
                <span className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div> Systolic</span>
                <span className="flex items-center"><div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div> Diastolic</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bpData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#E2E8F0' }}
                  />
                  <Line type="monotone" dataKey="sys" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="dia" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sugar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm p-6 border border-white/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Glucose Levels</h2>
              <div className="text-sm text-green-600 font-medium flex items-center bg-green-50 px-3 py-1 rounded-full">
                <TrendingDown className="h-4 w-4 mr-1" /> -2% vs last week
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sugarData}>
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="level" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#colorLevel)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity / Next Steps */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm p-6 border border-white/20"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Schedule</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mr-4 shadow-sm">
                  <Pill className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Take Metformin</p>
                  <p className="text-sm text-slate-500">Today, 2:00 PM (After Lunch)</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50/50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-4 shadow-sm">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Cardio Exercise</p>
                  <p className="text-sm text-slate-500">Today, 5:30 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden"
          >
            {/* Background decorative circles */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>

            <h2 className="text-xl font-bold mb-2 relative z-10">BMI Calculator</h2>
            <p className="text-blue-100 mb-8 relative z-10">Quick check on your Body Mass Index.</p>
            <div className="flex justify-between items-center mb-4 relative z-10">
               <div>
                  <span className="text-4xl font-bold">22.4</span>
                  <span className="ml-3 text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Healthy Weight</span>
               </div>
            </div>
            <div className="h-3 bg-black/20 rounded-full mb-3 relative z-10 backdrop-blur-sm">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "45%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-full bg-white rounded-full relative"
              >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 h-5 w-5 bg-white rounded-full shadow-lg border-2 border-blue-500"></div>
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-blue-100 mt-2 relative z-10">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;