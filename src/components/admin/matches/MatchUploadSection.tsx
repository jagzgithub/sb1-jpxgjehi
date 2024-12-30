import React from 'react';
import { Calendar } from 'lucide-react';
import { MatchUploadForm } from './MatchUploadForm';

export function MatchUploadSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">Upload Upcoming Match</h2>
      </div>
      <MatchUploadForm />
    </div>
  );
}