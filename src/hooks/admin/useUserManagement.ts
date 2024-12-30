import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../useAuth';
import type { UserRole } from '../../types/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function useUserManagement() {
  const { authState } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        auth.users (email),
        user_roles (role)
      `);

    if (error) {
      setError('Failed to fetch users');
    } else if (data) {
      setUsers(data.map(user => ({
        id: user.id,
        name: user.full_name,
        email: user.auth.users.email,
        role: user.user_roles.role
      })));
    }
    setIsLoading(false);
  }

  async function updateUserRole(userId: string, role: UserRole) {
    const { error } = await supabase
      .from('user_roles')
      .update({ role })
      .eq('user_id', userId);

    if (error) {
      setError('Failed to update user role');
    } else {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role } : user
      ));
    }
  }

  async function deleteUser(userId: string) {
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      setError('Failed to delete user');
    } else {
      setUsers(users.filter(user => user.id !== userId));
    }
  }

  return { users, updateUserRole, deleteUser, isLoading, error };
}