import React from 'react';
import { Trophy, Users, Calendar, BarChart, Shield, MessageSquare } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    icon: Trophy,
    title: 'Performance Analytics',
    description: 'Advanced statistics and insights to track individual and team progress',
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Streamlined roster management and role-based access control',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Intelligent match scheduling with conflict detection and availability tracking',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: BarChart,
    title: 'Real-time Stats',
    description: 'Live performance metrics and historical trend analysis',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Shield,
    title: 'Secure Access',
    description: 'Role-based permissions and encrypted data protection',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    icon: MessageSquare,
    title: 'Team Communication',
    description: 'Built-in messaging and notification system for seamless coordination',
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
];

export function Features() {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        Powerful Features for Your Team
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Everything you need to manage your team effectively and drive performance
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}