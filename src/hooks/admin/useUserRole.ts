import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import type { UserRole } from '../../types/auth';

export function useUserRole() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
    setIsUpdating(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (updateError) throw updateError;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user role');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateUserRole, isUpdating, error };
}