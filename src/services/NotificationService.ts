import { supabase } from '../utils/supabase';
import type { UserRole } from '../types/auth';

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'role_update' | 'match' | 'system';
  read: boolean;
  created_at: string;
}

export class NotificationService {
  static async sendRoleUpdateNotification(userId: string, newRole: UserRole) {
    try {
      // Create in-app notification
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title: 'Role Updated',
          message: `Your role has been updated to ${newRole}`,
          type: 'role_update',
          read: false
        });

      if (notificationError) throw notificationError;

      // Get user's email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (userError || !userData) throw userError;

      // Send email notification via Supabase Edge Function
      const { error: emailError } = await supabase.functions.invoke('send-notification-email', {
        body: {
          to: userData.email,
          subject: 'Role Update Notification',
          template: 'role-update',
          data: {
            role: newRole,
            timestamp: new Date().toISOString()
          }
        }
      });

      if (emailError) throw emailError;

      return true;
    } catch (error) {
      console.error('Failed to send notifications:', error);
      return false;
    }
  }
}