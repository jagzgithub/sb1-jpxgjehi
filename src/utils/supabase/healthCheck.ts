import { supabase } from '../supabase';
import { withRetry } from './retryLogic';
import { AUTH_DELAYS } from '../auth/constants';
import { useConnectionState } from './connectionState';

export async function checkSupabaseHealth(): Promise<boolean> {
  const { setConnecting, setError } = useConnectionState.getState();
  
  try {
    setConnecting(true);
    const { error } = await withRetry(
      () => supabase
        .from('health_check')
        .select('count')
        .limit(1)
        .maybeSingle(),
      {
        maxRetries: 2,
        baseDelay: 1000,
        onRetry: (attempt) => {
          setError(`Checking connection (attempt ${attempt}/2)...`);
        },
        shouldRetry: (error) => error?.status === 503
      }
    );
    
    setError(null);
    return !error;
  } catch {
    setError('Unable to connect to server');
    return false;
  } finally {
    setConnecting(false);
  }
}

export async function waitForConnection(
  maxAttempts = AUTH_DELAYS.MAX_RETRIES,
  timeout = 10000 // 10 second timeout
): Promise<boolean> {
  const startTime = Date.now();
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    // Check if we've exceeded timeout
    if (Date.now() - startTime > timeout) {
      return false;
    }
    
    const isHealthy = await checkSupabaseHealth();
    if (isHealthy) return true;
    
    // Exponential backoff with jitter
    const delay = Math.min(
      AUTH_DELAYS.RETRY_BASE * Math.pow(2, attempt - 1) * (0.5 + Math.random()),
      AUTH_DELAYS.RETRY_MAX
    );
    
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return false;
}