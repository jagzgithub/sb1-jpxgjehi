import { supabase } from './supabase';
import type { UserRole } from '../types/auth';

export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    // Use RPC call for better security
    const { data, error } = await supabase
      .rpc('get_user_role', {
        p_user_id: userId
      });

    if (error) throw error;
    
    // Validate the role
    if (data && ['admin', 'captain', 'player'].includes(data)) {
      return data as UserRole;
    }
    
    return 'player'; // Default role
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'player'; // Default role as fallback
  }
}