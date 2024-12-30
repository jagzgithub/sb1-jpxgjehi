import { supabase } from '../supabase';
import { v4 as uuidv4 } from 'uuid';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const tokenManager = {
  async createSession(userId: string): Promise<string> {
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    const { error } = await supabase
      .from('user_sessions')
      .insert({
        user_id: userId,
        token,
        expires_at: expiresAt.toISOString()
      });

    if (error) throw new Error('Failed to create session');
    return token;
  },

  async validateToken(token: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user_sessions')
      .select('expires_at, last_activity')
      .eq('token', token)
      .maybeSingle();

    if (error || !data) return false;

    const isValid = new Date(data.expires_at) > new Date();
    if (!isValid) {
      await this.invalidateToken(token);
      return false;
    }

    // Update last activity
    await supabase
      .from('user_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('token', token);

    return true;
  },

  async invalidateToken(token: string): Promise<void> {
    await supabase
      .from('user_sessions')
      .delete()
      .eq('token', token);
  },

  async invalidateAllUserSessions(userId: string): Promise<void> {
    await supabase
      .from('user_sessions')
      .delete()
      .eq('user_id', userId);
  }
};