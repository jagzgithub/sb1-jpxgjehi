import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { useConnectionState } from '../../../../utils/supabase/connectionState';
import { waitForConnection } from '../../../../utils/supabase/healthCheck';
import { AUTH_MESSAGES } from '../../../../utils/auth/constants';
import type { SignInFormData } from '../types';

export function useSignInState() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isOnline } = useConnectionState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (values: SignInFormData) => {
    if (!isOnline) {
      setError(AUTH_MESSAGES.OFFLINE);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Check connection health before attempting login
      const isConnected = await waitForConnection();
      if (!isConnected) {
        throw new Error(AUTH_MESSAGES.CONNECTION_ERROR);
      }

      const result = await login(values.email, values.password);
      const destination = result?.user?.role === 'admin' ? '/admin' : '/dashboard';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : AUTH_MESSAGES.GENERIC_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSignIn,
    isSubmitting,
    error,
    setError
  };
}