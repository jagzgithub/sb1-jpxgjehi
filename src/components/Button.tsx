import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = variant === 'primary' 
    ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
    : "bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500";

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
}