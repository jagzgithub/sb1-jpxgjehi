import React from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { useMatchApprovals } from '../../hooks/captain/useMatchApprovals';

export function MatchApprovals() {
  const { 
    pendingMatches, 
    approveMatch, 
    declineMatch, 
    isLoading, 
    error 
  } = useMatchApprovals();

  if (isLoading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">Match Approvals</h2>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="space-y-4">
        {pendingMatches?.map((match) => (
          <div 
            key={match.id} 
            className="border rounded-lg p-4 space-y-3"
          >
            <div>
              <p className="font-medium text-gray-900">{match.opponent}</p>
              <p className="text-sm text-gray-600">
                {new Date(match.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-sm text-gray-500">{match.location}</p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => approveMatch(match.id)}>
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => declineMatch(match.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}