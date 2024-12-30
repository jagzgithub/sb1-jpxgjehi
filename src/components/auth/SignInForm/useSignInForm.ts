import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useConnectionState } from '../../../utils/supabase/connectionState';
import { AUTH_MESSAGES } from '../../../utils/auth/constants';
import type { SignInFormData } from './types';

export function useSignInForm() {
  const { login } = useAuth();
  const { isOnline } = useConnectionState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: SignInFormData) => {
    if (!isOnline) {
      setError(AUTH_MESSAGES.OFFLINE);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await login(values.email, values.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : AUTH_MESSAGES.GENERIC_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    error
  };
}