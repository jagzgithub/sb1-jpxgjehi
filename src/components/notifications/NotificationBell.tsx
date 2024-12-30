import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

export function NotificationBell() {
  const { unreadCount } = useNotifications();

  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </div>
  );
}