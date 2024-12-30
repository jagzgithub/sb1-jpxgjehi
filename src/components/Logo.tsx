import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <img 
      src="/images/acers-logo.svg"
      alt="Acers Badminton Club Logo" 
      className={`${className} object-contain`}
      loading="eager"
    />
  );
}