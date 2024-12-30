import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { roleService } from '../services/roleService';
import type { UserRole } from '../types/auth';

export function useRoleVerification(userId: string | undefined) {
  const [role, setRole] = useState<UserRole>(() => 
    roleService.getCachedRole() || 'player'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyRole() {
      if (!userId) {
        setRole('player');
        setIsLoading(false);
        return;
      }

      try {
        // Use the new secure verification function
        const { data, error } = await supabase.rpc('verify_and_refresh_role', {
          p_user_id: userId
        });

        if (error) throw error;

        const verifiedRole = data as UserRole;
        setRole(verifiedRole);
        roleService.cacheRole(verifiedRole);
      } catch (err) {
        console.error('Role verification error:', err);
        setError('Failed to verify role');
        setRole('player');
      } finally {
        setIsLoading(false);
      }
    }

    verifyRole();
  }, [userId]);

  return { role, isLoading, error };
}