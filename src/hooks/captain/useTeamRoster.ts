import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../useAuth';

interface Player {
  id: string;
  name: string;
  email: string;
}

export function useTeamRoster() {
  const { authState } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayers();
  }, [authState.user]);

  async function fetchPlayers() {
    if (!authState.user) return;

    const { data, error } = await supabase
      .from('team_members')
      .select(`
        id,
        user:user_id (
          email
        ),
        profiles (
          full_name
        )
      `)
      .eq('team_id', authState.user.team_id);

    if (error) {
      setError('Failed to fetch team roster');
    } else if (data) {
      setPlayers(data.map(player => ({
        id: player.id,
        name: player.profiles.full_name,
        email: player.user.email
      })));
    }
    setIsLoading(false);
  }

  async function removePlayer(playerId: string) {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', playerId);

    if (error) {
      setError('Failed to remove player');
    } else {
      setPlayers(players.filter(p => p.id !== playerId));
    }
  }

  return { players, removePlayer, isLoading, error };
}