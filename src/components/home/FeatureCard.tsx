import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
}

export function FeatureCard({ icon: Icon, title, description, iconColor, bgColor }: FeatureCardProps) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}