import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export function WelcomeHeader() {
  const { authState } = useAuth();
  const { user } = authState;

  const welcomeMessages = {
    player: {
      title: "Player Dashboard",
      subtitle: "Track your performance and upcoming matches"
    },
    captain: {
      title: "Captain's Hub",
      subtitle: "Manage your team and approve matches"
    },
    admin: {
      title: "Admin Control Panel",
      subtitle: "System management and analytics"
    }
  };

  const message = welcomeMessages[user?.role || 'player'];

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{message.title}</h1>
      <p className="mt-2 text-gray-600">{message.subtitle}</p>
    </div>
  );
}