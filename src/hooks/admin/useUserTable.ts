import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import type { User } from '../../types/auth';

interface UserTableData extends User {
  name: string;
  createdAt: string;
}

export function useUserTable() {
  const [users, setUsers] = useState<UserTableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          email,
          created_at,
          user_roles!inner (
            role
          )
        `);

      if (profilesError) throw profilesError;

      if (profilesData) {
        setUsers(profilesData.map(profile => ({
          id: profile.id,
          name: profile.full_name || 'Unnamed User',
          email: profile.email || '',
          role: profile.user_roles.role,
          createdAt: profile.created_at
        })));
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, refreshUsers: fetchUsers };
}