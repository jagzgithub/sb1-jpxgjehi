import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { roleService } from '../../services/roleService';
import type { UserRole } from '../../types/auth';

export function useRoleUpdate() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
    setIsUpdating(true);
    setError(null);

    try {
      // Call the secure RPC function to update role
      const { data, error: updateError } = await supabase
        .rpc('update_user_role', {
          p_user_id: userId,
          p_new_role: newRole
        });

      if (updateError) throw updateError;

      // Clear role cache to force a refresh
      roleService.clearCachedRole();

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user role';
      console.error('Error updating role:', message);
      setError(message);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateUserRole, isUpdating, error };
}