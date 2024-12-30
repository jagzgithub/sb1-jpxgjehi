import { supabase } from '../utils/supabase';
import type { UserRole } from '../types/auth';

const ROLE_CACHE_KEY = 'user_role_cache';

export const roleService = {
  async updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('update_user_role', {
        p_user_id: userId,
        p_new_role: newRole
      });

      if (error) throw error;
      
      // Clear cache after role update
      this.clearCachedRole();
      return data;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  },

  async validateRole(userId: string, role: UserRole): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data?.role === role;
    } catch (error) {
      console.error('Error validating role:', error);
      return false;
    }
  },

  async fetchRole(userId: string): Promise<UserRole> {
    try {
      const cachedRole = this.getCachedRole();
      if (cachedRole) return cachedRole;

      const { data, error } = await supabase.rpc('verify_user_role', {
        p_user_id: userId
      });

      if (error) throw error;
      
      const role = (data as UserRole) || 'player';
      this.cacheRole(role);
      return role;
    } catch (error) {
      console.error('Error fetching role:', error);
      return 'player';
    }
  },

  getCachedRole(): UserRole | null {
    try {
      const cached = localStorage.getItem(ROLE_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  },

  cacheRole(role: UserRole): void {
    try {
      localStorage.setItem(ROLE_CACHE_KEY, JSON.stringify(role));
    } catch (error) {
      console.error('Error caching role:', error);
    }
  },

  clearCachedRole(): void {
    try {
      localStorage.removeItem(ROLE_CACHE_KEY);
    } catch (error) {
      console.error('Error clearing cached role:', error);
    }
  }
};