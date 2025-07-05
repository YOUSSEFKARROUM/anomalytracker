import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <Sidebar />
      <main className="ml-72 min-h-screen bg-surface">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout; 