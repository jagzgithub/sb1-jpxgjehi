import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';

interface PlayerStats {
  matchesPlayed: number;
  winRate: number;
  averageScore: number;
  tournamentsPlayed: number;
}

const defaultStats: PlayerStats = {
  matchesPlayed: 0,
  winRate: 0,
  averageScore: 0,
  tournamentsPlayed: 0
};

export function usePlayerStats() {
  const { authState } = useAuth();
  const [stats, setStats] = useState<PlayerStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!authState.user) return;

      try {
        const { data, error } = await supabase
          .from('player_stats')
          .select('*')
          .eq('player_id', authState.user.id)
          .maybeSingle();

        if (!error) {
          setStats(data || defaultStats);
        } else {
          console.error('Error fetching player stats:', error);
          setStats(defaultStats);
        }
      } catch (error) {
        console.error('Error in fetchStats:', error);
        setStats(defaultStats);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [authState.user]);

  return { stats, isLoading };
}