import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { SignUpForm } from '../components/auth/SignUpForm';
import { Alert } from '../components/Alert';

export function SignUp() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => navigate('/signin'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <BackButton />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600 mb-6">Join us and start your journey</p>
        
        {success ? (
          <Alert 
            type="success" 
            message="Account created successfully! Redirecting to login..." 
          />
        ) : (
          <>
            <SignUpForm onSuccess={handleSuccess} />
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}