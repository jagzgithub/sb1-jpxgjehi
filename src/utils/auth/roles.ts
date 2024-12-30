import { supabase } from '../supabase';
import type { UserRole } from '../../types/auth';

export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return (data?.role as UserRole) || 'player';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'player'; // Default role as fallback
  }
}