import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { Button } from '../Button';
import { Logo } from '../Logo';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-50 rounded-3xl"></div>
      <div className="relative text-center px-6 py-16 sm:py-24 rounded-3xl">
        <div className="flex justify-center mb-8">
          <div className="bg-white/95 rounded-2xl shadow-lg p-8">
            <Logo className="w-64 h-auto" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-6">
          Welcome to <span className="text-indigo-600">Acers</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Join our premier badminton community for expert coaching, competitive matches, 
          and a vibrant sporting atmosphere
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
          <Button 
            onClick={() => navigate('/signin')} 
            className="w-full sm:w-auto px-8"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </Button>
          <Button 
            onClick={() => navigate('/signup')} 
            variant="secondary"
            className="w-full sm:w-auto px-8"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}