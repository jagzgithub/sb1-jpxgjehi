const MAX_RETRIES = 3;
const BASE_DELAY = 1000;
const MAX_DELAY = 5000;

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, error: any) => void;
  shouldRetry?: (error: any) => boolean;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = MAX_RETRIES,
    baseDelay = BASE_DELAY,
    maxDelay = MAX_DELAY,
    onRetry,
    shouldRetry = defaultShouldRetry
  } = options;

  let lastError: any;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (!shouldRetry(error) || attempt === maxRetries - 1) {
        throw error;
      }

      const delay = calculateBackoff(attempt, baseDelay, maxDelay);
      onRetry?.(attempt + 1, error);
      await sleep(delay);
    }
  }

  throw lastError;
}

function defaultShouldRetry(error: any): boolean {
  return isRetryableError(error) || error?.status === 503;
}

function isRetryableError(error: any): boolean {
  const message = error?.message?.toLowerCase() || '';
  return message.includes('connect error') ||
         message.includes('network') ||
         message.includes('timeout') ||
         error?.status === 503;
}

function calculateBackoff(attempt: number, baseDelay: number, maxDelay: number): number {
  return Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}