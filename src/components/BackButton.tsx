import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="mb-6 flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
    >
      <ArrowLeft size={20} className="mr-2" />
      Back to Home
    </button>
  );
}