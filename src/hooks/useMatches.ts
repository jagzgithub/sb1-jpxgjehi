import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';

interface Match {
  id: string;
  date: string;
  opponent: string;
  location: string;
}

export function useMatches() {
  const { authState } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      if (!authState.user) return;

      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(5);

      if (!error && data) {
        setMatches(data);
      }
      setIsLoading(false);
    }

    fetchMatches();
  }, [authState.user]);

  return { matches, isLoading };
}