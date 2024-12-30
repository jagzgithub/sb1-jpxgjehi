import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

interface Analytics {
  activeUsers: number;
  totalMatches: number;
  participationRate: number;
}

export function useSystemAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [activeUsersData, matchesData] = await Promise.all([
      supabase
        .from('user_sessions')
        .select('user_id', { count: 'exact' })
        .gte('created_at', thirtyDaysAgo.toISOString()),
      supabase
        .from('matches')
        .select('*', { count: 'exact' })
    ]);

    if (!activeUsersData.error && !matchesData.error) {
      setAnalytics({
        activeUsers: activeUsersData.count || 0,
        totalMatches: matchesData.count || 0,
        participationRate: 85 // Example static value - would need to calculate based on actual participation data
      });
    }
    
    setIsLoading(false);
  }

  return { analytics, isLoading };
}