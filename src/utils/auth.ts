import { supabase } from './supabase';
import { roleService } from '../services/roleService';
import { sessionService } from '../services/sessionService';
import { connectionManager } from './supabase/connectionManager';
import { getErrorMessage } from './supabase/errorHandler';
import type { User } from '../types/auth';

interface SignInCredentials {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInCredentials) {
  await logout();

  try {
    const { data, error } = await connectionManager.executeRequest(
      () => supabase.auth.signInWithPassword({ email, password }),
      { requiresConnection: true }
    );

    if (error) throw error;
    if (!data?.user) throw new Error('No user returned after sign in');

    const role = await connectionManager.executeRequest(
      () => roleService.fetchRole(data.user.id)
    );
    
    const userData: User = { 
      id: data.user.id, 
      email: data.user.email!, 
      role 
    };

    sessionService.saveSession(userData);
    return { user: userData };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function logout() {
  try {
    roleService.clearCachedRole();
    sessionService.clearSession();
    
    await connectionManager.executeRequest(
      async () => supabase.auth.signOut()
    );
  } catch (error) {
    console.error('Logout error:', getErrorMessage(error));
    roleService.clearCachedRole();
    sessionService.clearSession();
  }
}