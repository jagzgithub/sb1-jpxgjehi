import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { useMatchScheduler } from '../../hooks/admin/useMatchScheduler';

export function MatchScheduler() {
  const { matches, createMatch, updateMatch, deleteMatch, isLoading, error } = useMatchScheduler();

  if (isLoading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Match Schedule</h2>
        </div>
        <Button onClick={() => createMatch()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Match
        </Button>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="space-y-4">
        {matches?.map((match) => (
          <div key={match.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <input
                  type="text"
                  value={match.opponent}
                  onChange={(e) => updateMatch(match.id, { opponent: e.target.value })}
                  className="font-medium text-gray-900 border-none focus:ring-0"
                  placeholder="Opponent"
                />
                <input
                  type="datetime-local"
                  value={match.date}
                  onChange={(e) => updateMatch(match.id, { date: e.target.value })}
                  className="block text-sm text-gray-600 mt-1"
                />
                <input
                  type="text"
                  value={match.location}
                  onChange={(e) => updateMatch(match.id, { location: e.target.value })}
                  className="block text-sm text-gray-500 mt-1"
                  placeholder="Location"
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => deleteMatch(match.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}