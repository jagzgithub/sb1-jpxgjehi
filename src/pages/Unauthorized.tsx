import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function Unauthorized() {
  const navigate = useNavigate();
  const { authState } = useAuth();
  
  const handleBackToSafety = () => {
    const defaultPath = authState.user?.role === 'admin' ? '/admin' : 
                       authState.user?.role === 'captain' ? '/captain' : 
                       '/dashboard';
    navigate(defaultPath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center">
          <Shield className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <Button onClick={handleBackToSafety} className="w-full">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Safety
        </Button>
      </div>
    </div>
  );
}