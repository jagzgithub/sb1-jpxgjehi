import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { getUserRole } from '../utils/roles';
import { sessionService } from '../services/sessionService';
import type { User, AuthState } from '../types/auth';

interface AuthContextType {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: sessionService.getSession(),
    isLoading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch role and wait for it
          const role = await getUserRole(session.user.id);
          
          const userData: User = {
            id: session.user.id,
            email: session.user.email!,
            role,
          };
          
          // Save session with role
          sessionService.saveSession(userData);
          setAuthState({ user: userData, isLoading: false });
        } else {
          setAuthState({ user: null, isLoading: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState({ user: null, isLoading: false });
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Fetch role and wait for it
          const role = await getUserRole(session.user.id);
          
          const userData: User = {
            id: session.user.id,
            email: session.user.email!,
            role,
          };
          
          // Save session with role
          sessionService.saveSession(userData);
          setAuthState({ user: userData, isLoading: false });
        } else {
          sessionService.clearSession();
          setAuthState({ user: null, isLoading: false });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}