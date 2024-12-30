import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

interface Match {
  id: string;
  date: string;
  opponent: string;
  location: string;
}

export function useMatchScheduler() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  async function fetchMatches() {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      setError('Failed to fetch matches');
    } else if (data) {
      setMatches(data);
    }
    setIsLoading(false);
  }

  async function createMatch() {
    const newMatch = {
      date: new Date().toISOString(),
      opponent: '',
      location: '',
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('matches')
      .insert(newMatch)
      .select()
      .single();

    if (error) {
      setError('Failed to create match');
    } else if (data) {
      setMatches([...matches, data]);
    }
  }

  async function updateMatch(id: string, updates: Partial<Match>) {
    const { error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', id);

    if (error) {
      setError('Failed to update match');
    } else {
      setMatches(matches.map(match =>
        match.id === id ? { ...match, ...updates } : match
      ));
    }
  }

  async function deleteMatch(id: string) {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);

    if (error) {
      setError('Failed to delete match');
    } else {
      setMatches(matches.filter(match => match.id !== id));
    }
  }

  return { matches, createMatch, updateMatch, deleteMatch, isLoading, error };
}