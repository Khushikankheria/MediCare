import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
