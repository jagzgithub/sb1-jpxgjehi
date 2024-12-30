import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAdminCheck } from '../hooks/useAdminCheck';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { CaptainDashboard } from '../pages/CaptainDashboard';
import { AdminDashboard } from '../pages/AdminDashboard';
import { Unauthorized } from '../pages/Unauthorized';

export function AppRoutes() {
  const { authState } = useAuth();
  const { isAdmin, isLoading: isAdminCheckLoading } = useAdminCheck();

  if (authState.isLoading || isAdminCheckLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route 
        path="/signin" 
        element={
          authState.user ? (
            <Navigate to={isAdmin ? '/admin' : '/dashboard'} />
          ) : (
            <SignIn />
          )
        } 
      />
      <Route 
        path="/signup" 
        element={
          authState.user ? (
            <Navigate to={isAdmin ? '/admin' : '/dashboard'} />
          ) : (
            <SignUp />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          authState.user ? (
            isAdmin ? <Navigate to="/admin" /> : <Dashboard />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/admin"
        element={
          authState.user ? (
            isAdmin ? <AdminDashboard /> : <Navigate to="/unauthorized" />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}