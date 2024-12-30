import React, { useEffect } from 'react';
import { WifiOff, Loader } from 'lucide-react';
import { useConnectionState } from '../utils/supabase/connectionState';

export function ConnectionStatus() {
  const { isOnline, isConnecting, lastError, setOnline } = useConnectionState();

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnline]);

  if (isOnline && !isConnecting && !lastError) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      !isOnline || lastError ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
    }`}>
      <div className="flex items-center gap-2">
        {!isOnline && <WifiOff className="w-4 h-4" />}
        {isConnecting && <Loader className="w-4 h-4 animate-spin" />}
        <span className="font-medium">
          {!isOnline ? 'You are offline' : 
           isConnecting ? 'Connecting...' : 
           lastError || 'Connection issue'}
        </span>
      </div>
    </div>
  );
}