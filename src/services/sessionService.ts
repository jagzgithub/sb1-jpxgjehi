import type { User } from '../types/auth';
import { sessionManager } from '../utils/auth/sessionManager';

const SESSION_KEY = 'app_session';

export const sessionService = {
  saveSession(user: User) {
    try {
      sessionManager.clearAllSessions();
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  },

  getSession(): User | null {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error getting session:', error);
      this.clearSession();
      return null;
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }
};