import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PublicLayout from './layouts/PublicLayout';
import MainLayout from './layouts/MainLayout';
import DoctorLayout from './layouts/DoctorLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Medicines from './pages/Medicines';
import Emergency from './pages/Emergency';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions';
import DoctorProfile from './pages/doctor/DoctorProfile';

const RequireRole = ({ role, children }) => {
  const location = useLocation();
  const storedRole = localStorage.getItem('role');
  if (storedRole !== role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route
          path="/patient"
          element={
            <RequireRole role="patient">
              <MainLayout />
            </RequireRole>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="medicines" element={<Medicines />} />
          <Route path="emergency" element={<Emergency />} />
        </Route>

        <Route
          path="/doctor"
          element={
            <RequireRole role="doctor">
              <DoctorLayout />
            </RequireRole>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
