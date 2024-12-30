import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import type { UserRole } from '../../types/auth';

interface RoleHistoryEntry {
  id: string;
  oldRole: UserRole;
  newRole: UserRole;
  changedAt: string;
  changedByEmail: string;
}

export function useRoleHistory(userId: string) {
  const [history, setHistory] = useState<RoleHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data, error } = await supabase
          .from('role_audit_log')
          .select(`
            id,
            old_role,
            new_role,
            changed_at,
            changed_by,
            auth.users!changed_by(email)
          `)
          .eq('user_id', userId)
          .order('changed_at', { ascending: false });

        if (error) throw error;

        setHistory(data.map(entry => ({
          id: entry.id,
          oldRole: entry.old_role,
          newRole: entry.new_role,
          changedAt: entry.changed_at,
          changedByEmail: entry.users?.email || 'Unknown'
        })));
      } catch (error) {
        console.error('Error fetching role history:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [userId]);

  return { history, isLoading };
}