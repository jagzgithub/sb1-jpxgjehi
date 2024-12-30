import { supabase } from '../supabase';
import { getUserRole } from './roles';
import { sessionService } from '../../services/sessionService';
import { sessionManager } from './sessionManager';
import { rateLimiter } from './rateLimiter';
import { tokenManager } from './tokenManager';

interface SignInCredentials {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInCredentials) {
  // Check rate limit
  if (!rateLimiter.check()) {
    const timeRemaining = rateLimiter.getTimeRemaining();
    throw new Error(
      `Too many login attempts. Please try again in ${Math.ceil(timeRemaining / 60)} minutes.`
    );
  }

  try {
    // Clear all existing sessions first
    await sessionManager.clearAllSessions();

    // Attempt to sign in
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!user) throw new Error('No user returned after sign in');

    // Create new session token
    const token = await tokenManager.createSession(user.id);
    localStorage.setItem('session_token', token);

    // Get user role and save session
    const role = await getUserRole(user.id);
    const userData = { id: user.id, email: user.email!, role };
    sessionService.saveSession(userData);
    
    // Reset rate limit on successful login
    rateLimiter.reset();
    
    return { user: userData };
  } catch (error) {
    // Increment failed attempts
    rateLimiter.increment();
    throw error;
  }
}

export async function logout() {
  await sessionManager.clearAllSessions();
}