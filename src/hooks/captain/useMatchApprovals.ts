import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../useAuth';

interface PendingMatch {
  id: string;
  date: string;
  opponent: string;
  location: string;
}

export function useMatchApprovals() {
  const { authState } = useAuth();
  const [pendingMatches, setPendingMatches] = useState<PendingMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingMatches();
  }, [authState.user]);

  async function fetchPendingMatches() {
    if (!authState.user) return;

    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('status', 'pending')
      .order('date', { ascending: true });

    if (error) {
      setError('Failed to fetch pending matches');
    } else if (data) {
      setPendingMatches(data);
    }
    setIsLoading(false);
  }

  async function approveMatch(matchId: string) {
    const { error } = await supabase
      .from('matches')
      .update({ status: 'approved' })
      .eq('id', matchId);

    if (error) {
      setError('Failed to approve match');
    } else {
      setPendingMatches(pendingMatches.filter(m => m.id !== matchId));
    }
  }

  async function declineMatch(matchId: string) {
    const { error } = await supabase
      .from('matches')
      .update({ status: 'declined' })
      .eq('id', matchId);

    if (error) {
      setError('Failed to decline match');
    } else {
      setPendingMatches(pendingMatches.filter(m => m.id !== matchId));
    }
  }

  return { 
    pendingMatches, 
    approveMatch, 
    declineMatch, 
    isLoading, 
    error 
  };
}