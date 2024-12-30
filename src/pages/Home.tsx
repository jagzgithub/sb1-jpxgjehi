import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, Shield } from 'lucide-react';

const features = [
  {
    icon: Trophy,
    title: 'Elite Training',
    description: 'Professional coaching and advanced techniques',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Join a vibrant community of badminton enthusiasts',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Calendar,
    title: 'Regular Matches',
    description: 'Competitive matches and tournaments',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Shield,
    title: 'All Skill Levels',
    description: 'Programs for beginners to advanced players',
    color: 'bg-green-100 text-green-600'
  }
];

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="relative h-[600px] bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1613918431703-aa50889e3be8?auto=format&fit=crop&q=80")'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center text-white">
              <div className="bg-white/90 p-8 rounded-2xl shadow-lg mb-8">
                <img 
                  src="/acers-logo.png" 
                  alt="Acers Badminton Club" 
                  className="w-48 h-auto"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-indigo-400">Acers</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-2xl">
                Join our premier badminton community for expert coaching, competitive matches, 
                and a vibrant sporting atmosphere
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signin"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Why Choose Acers?
        </h2>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Experience the perfect blend of professional training, community spirit, and competitive play
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Acers?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Start your journey with us today and experience the best in badminton training and community
          </p>
          <Link 
            to="/signup"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}