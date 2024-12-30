import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { signIn, logout } from '../utils/auth';
import { roleService } from '../services/roleService';
import { getAuthErrorMessage } from '../utils/auth/authErrors';

export function useAuth() {
  const { authState, setAuthState } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn({ email, password });
      
      if (!result?.user) {
        throw new Error('Sign in failed');
      }

      const verifiedRole = await roleService.fetchRole(result.user.id);
      const verifiedUser = { ...result.user, role: verifiedRole };
      
      setAuthState({ user: verifiedUser, isLoading: false });
      return { user: verifiedUser };
    } catch (err) {
      const authError = getAuthErrorMessage(err);
      setError(authError.message);
      throw new Error(authError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      roleService.clearCachedRole();
      setAuthState({ user: null, isLoading: false });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authState,
    login,
    logout: handleLogout,
    isLoading,
    error
  };
}