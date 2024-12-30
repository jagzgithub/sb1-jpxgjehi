import React from 'react';
import { TrendingUp, Trophy } from 'lucide-react';
import { useTeamPerformance } from '../../hooks/captain/useTeamPerformance';

export function TeamPerformance() {
  const { stats, isLoading } = useTeamPerformance();

  if (isLoading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">Team Performance</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-indigo-600 mb-1">Team Ranking</p>
          <p className="text-2xl font-bold text-indigo-900">#{stats?.ranking}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600 mb-1">Win Rate</p>
          <p className="text-2xl font-bold text-green-900">{stats?.winRate}%</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-600 mb-1">Active Players</p>
          <p className="text-2xl font-bold text-purple-900">{stats?.activePlayers}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-yellow-600 mb-1">Season Points</p>
          <p className="text-2xl font-bold text-yellow-900">{stats?.seasonPoints}</p>
        </div>
      </div>
    </div>
  );
}