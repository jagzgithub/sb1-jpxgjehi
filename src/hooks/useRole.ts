import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import type { UserRole } from '../types/auth';

export function useRole(userId: string | undefined) {
  const [role, setRole] = useState<UserRole>('player');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyRole() {
      if (!userId) {
        setRole('player');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .rpc('verify_user_role', {
            p_user_id: userId
          });

        if (error) throw error;
        setRole(data as UserRole);
      } catch (error) {
        console.error('Error verifying role:', error);
        setRole('player');
      } finally {
        setIsLoading(false);
      }
    }

    verifyRole();
  }, [userId]);

  return { role, isLoading };
}