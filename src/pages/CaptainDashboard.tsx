import React from 'react';
import { NavBar } from '../components/NavBar';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { TeamRoster } from '../components/captain/TeamRoster';
import { MatchApprovals } from '../components/captain/MatchApprovals';
import { TeamPerformance } from '../components/captain/TeamPerformance';

export function CaptainDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <WelcomeHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <TeamRoster />
          </div>
          <MatchApprovals />
          <TeamPerformance />
        </div>
      </div>
    </div>
  );
}