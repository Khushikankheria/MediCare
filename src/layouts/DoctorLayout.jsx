import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorNavbar from '../components/DoctorNavbar';
import Footer from '../components/Footer';

const DoctorLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <DoctorNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DoctorLayout;
