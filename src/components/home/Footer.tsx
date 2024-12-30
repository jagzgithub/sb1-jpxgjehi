import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Logo } from '../Logo';

export function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <Logo className="w-24 h-auto mb-4" /> {/* Adjusted size for footer */}
          <h3 className="text-xl font-semibold text-gray-900">Acers Badminton Club</h3>
        </div>
        
        <div className="flex justify-center space-x-8 mb-8">
          <a href="mailto:support@acersclub.com" className="flex items-center text-gray-600 hover:text-indigo-600">
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </a>
          <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-indigo-600">
            <Phone className="w-4 h-4 mr-2" />
            Call Us
          </a>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">© {new Date().getFullYear()} Acers Badminton Club. All rights reserved.</p>
          <p>Empowering players to achieve their best performance</p>
        </div>
      </div>
    </footer>
  );
}