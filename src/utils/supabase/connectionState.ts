import { create } from 'zustand';

interface ConnectionState {
  isOnline: boolean;
  isConnecting: boolean;
  lastError: string | null;
  retryCount: number;
  setOnline: (online: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
  incrementRetry: () => void;
  resetRetry: () => void;
}

export const useConnectionState = create<ConnectionState>((set) => ({
  isOnline: navigator.onLine,
  isConnecting: false,
  lastError: null,
  retryCount: 0,
  setOnline: (online) => set({ isOnline: online, lastError: null }),
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  setError: (error) => set({ lastError: error, isConnecting: false }),
  incrementRetry: () => set((state) => ({ retryCount: state.retryCount + 1 })),
  resetRetry: () => set({ retryCount: 0 })
}));