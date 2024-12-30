import React, { useState } from 'react';
import { Users, UserPlus, UserMinus } from 'lucide-react';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { useTeamRoster } from '../../hooks/captain/useTeamRoster';

export function TeamRoster() {
  const { players, removePlayer, isLoading, error } = useTeamRoster();
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (isLoading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Team Roster</h2>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Player
        </Button>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="divide-y">
        {players?.map((player) => (
          <div key={player.id} className="py-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{player.name}</p>
              <p className="text-sm text-gray-500">{player.email}</p>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => removePlayer(player.id)}
            >
              <UserMinus className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {showInviteModal && (
        <InvitePlayerModal onClose={() => setShowInviteModal(false)} />
      )}
    </div>
  );
}