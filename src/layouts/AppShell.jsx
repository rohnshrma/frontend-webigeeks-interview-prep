import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function AppShell() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
