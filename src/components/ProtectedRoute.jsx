import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAppContext();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="panel-surface rounded-[28px] p-10 text-center">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Loading your study space...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
