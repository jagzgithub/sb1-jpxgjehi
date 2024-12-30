import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';

export function useCaptainContact() {
  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (message: string) => {
    if (!authState.user) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const { error: sendError } = await supabase
      .from('captain_messages')
      .insert({
        player_id: authState.user.id,
        message,
      });

    setIsLoading(false);

    if (sendError) {
      setError('Failed to send message. Please try again.');
    } else {
      setSuccess(true);
    }
  };

  return { sendMessage, isLoading, error, success };
}