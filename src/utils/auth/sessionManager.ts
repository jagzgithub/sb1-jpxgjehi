import { supabase } from '../supabase';
import { tokenManager } from './tokenManager';

export const sessionManager = {
  clearAllSessions: async () => {
    try {
      const userId = supabase.auth.getUser()?.data?.user?.id;
      if (userId) {
        // Clear all sessions for this user from the database
        await tokenManager.invalidateAllUserSessions(userId);
      }

      // Clear all local storage items
      const authItems = [
        'sb-token',
        'supabase.auth.token',
        'app_session',
        'session_token',
        'auth_rate_limit'
      ];
      authItems.forEach(key => localStorage.removeItem(key));
      
      // Clear Supabase session
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clear cookies
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      // Broadcast session cleared event
      window.dispatchEvent(new Event('session_cleared'));
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  },

  setupSessionListeners: () => {
    // Handle tab/window closing
    window.addEventListener('beforeunload', () => {
      sessionManager.clearAllSessions();
    });

    // Handle visibility change (tab switching/minimizing)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Only clear if the page is actually hidden, not just inactive
        const isPageHidden = document.hidden && document.visibilityState === 'hidden';
        if (isPageHidden) {
          sessionManager.clearAllSessions();
        }
      }
    });

    // Handle storage events (for multi-tab synchronization)
    window.addEventListener('storage', (event) => {
      if (event.key === 'app_session' && !event.newValue) {
        sessionManager.clearAllSessions();
      }
    });

    // Periodic session validation
    setInterval(async () => {
      const isValid = await sessionValidator.validateCurrentSession();
      if (!isValid) {
        sessionManager.clearAllSessions();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
  }
};