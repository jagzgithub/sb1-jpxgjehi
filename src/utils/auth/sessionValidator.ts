import { tokenManager } from './tokenManager';
import { sessionService } from '../../services/sessionService';
import { supabase } from '../supabase';

export const sessionValidator = {
  async validateCurrentSession(): Promise<boolean> {
    try {
      // Check local session
      const session = sessionService.getSession();
      if (!session) return false;

      // Check Supabase session
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      if (!supabaseSession) {
        await this.clearInvalidSession();
        return false;
      }

      // Verify session token
      const token = localStorage.getItem('session_token');
      if (!token) {
        await this.clearInvalidSession();
        return false;
      }

      // Validate token in database
      const isValid = await tokenManager.validateToken(token);
      if (!isValid) {
        await this.clearInvalidSession();
        return false;
      }

      // Verify user ID matches
      if (session.id !== supabaseSession.user.id) {
        await this.clearInvalidSession();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      await this.clearInvalidSession();
      return false;
    }
  },

  async clearInvalidSession(): Promise<void> {
    const token = localStorage.getItem('session_token');
    if (token) {
      await tokenManager.invalidateToken(token);
    }
    sessionService.clearSession();
    await supabase.auth.signOut();
    window.dispatchEvent(new Event('session_cleared'));
  }
};