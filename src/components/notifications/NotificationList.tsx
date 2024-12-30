import React from 'react';
import { format } from 'date-fns';
import { useNotifications } from '../../hooks/useNotifications';

export function NotificationList() {
  const { notifications, markAsRead, isLoading } = useNotifications();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No notifications</p>
      ) : (
        notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.read ? 'bg-white' : 'bg-indigo-50'
            }`}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <h3 className="font-medium text-gray-900">{notification.title}</h3>
            <p className="text-gray-600 mt-1">{notification.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              {format(new Date(notification.created_at), 'PPp')}
            </p>
          </div>
        ))
      )}
    </div>
  );
}