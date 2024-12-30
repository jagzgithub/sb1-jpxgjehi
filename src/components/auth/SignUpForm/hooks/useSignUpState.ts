import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnectionState } from '../../../../utils/supabase/connectionState';
import { registerUser } from '../../../../utils/auth/registration';
import { AUTH_MESSAGES } from '../../../../utils/auth/constants';
import { waitForConnection } from '../../../../utils/supabase/healthCheck';
import type { SignUpFormData } from '../types';

export function useSignUpState() {
  const navigate = useNavigate();
  const { isOnline } = useConnectionState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (values: SignUpFormData) => {
    if (!isOnline) {
      setError(AUTH_MESSAGES.OFFLINE);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Wait for stable connection before proceeding
      const isConnected = await waitForConnection(3, 15000); // 3 attempts, 15s timeout
      if (!isConnected) {
        throw new Error(AUTH_MESSAGES.CONNECTION_ERROR);
      }

      const result = await registerUser(values);
      if (result.success) {
        setSuccess(true);
        // Longer delay before redirect to ensure user sees success message
        setTimeout(() => navigate('/signin'), 2500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : AUTH_MESSAGES.GENERIC_ERROR;
      setError(message);
      // Reset form state after error
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSignUp,
    isSubmitting,
    error,
    success,
    setError
  };
}