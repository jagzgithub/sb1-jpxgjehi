import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

export function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back</h2>
        <LoginForm />
      </div>
    </div>
  );
}