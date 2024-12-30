import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './useAuth';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'role_update' | 'match' | 'system';
  read: boolean;
  created_at: string;
}

export function useNotifications() {
  const { authState } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authState.user) return;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', authState.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
      }
      setIsLoading(false);
    };

    fetchNotifications();

    // Subscribe to new notifications
    const subscription = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${authState.user.id}`
      }, payload => {
        setNotifications(prev => [payload.new as Notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [authState.user]);

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase.rpc('mark_notification_read', {
      p_notification_id: notificationId
    });

    if (!error) {
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead
  };
}