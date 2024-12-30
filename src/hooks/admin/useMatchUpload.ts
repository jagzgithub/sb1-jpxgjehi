import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../useAuth';

interface MatchData {
  opponent: string;
  date: string;
  time: string;
  location: string;
  maxPlayers: number;
}

export function useMatchUpload() {
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const uploadMatch = async (matchData: MatchData) => {
    if (!authState.user || authState.user.role !== 'admin') {
      setError('Unauthorized access');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: uploadError } = await supabase
        .from('matches')
        .insert({
          opponent: matchData.opponent,
          date: `${matchData.date}T${matchData.time}`,
          location: matchData.location,
          max_players: matchData.maxPlayers,
          status: 'upcoming',
          created_by: authState.user.id
        });

      if (uploadError) throw uploadError;

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload match');
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadMatch, isLoading, error, success };
}