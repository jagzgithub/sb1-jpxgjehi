import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../useAuth';

interface TeamStats {
  ranking: number;
  winRate: number;
  activePlayers: number;
  seasonPoints: number;
}

export function useTeamPerformance() {
  const { authState } = useAuth();
  const [stats, setStats] = useState<TeamStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!authState.user) return;

      const { data, error } = await supabase
        .from('team_stats')
        .select('*')
        .eq('team_id', authState.user.team_id)
        .single();

      if (!error && data) {
        setStats(data);
      }
      setIsLoading(false);
    }

    fetchStats();
  }, [authState.user]);

  return { stats, isLoading };
}