import { withRetry } from './retryLogic';
import { createAppError } from './errorHandler';
import { useConnectionState } from './connectionState';
import { AUTH_DELAYS } from '../auth/constants';
import { checkSupabaseHealth } from './healthCheck';

class ConnectionManager {
  private static instance: ConnectionManager;
  private isInitialized = false;
  private connectionCheckPromise: Promise<boolean> | null = null;
  private lastCheckTime = 0;
  private readonly CHECK_INTERVAL = 30000; // 30 seconds
  
  private constructor() {
    if (!this.isInitialized) {
      this.setupListeners();
      this.isInitialized = true;
    }
  }

  static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  private setupListeners() {
    const { setOnline, setError, resetRetry } = useConnectionState.getState();
    
    window.addEventListener('online', async () => {
      setOnline(true);
      // Verify actual connection when coming back online
      const isConnected = await this.ensureConnection();
      if (!isConnected) {
        setError('Server connection failed');
      } else {
        setError(null);
        resetRetry();
      }
    });
    
    window.addEventListener('offline', () => {
      setOnline(false);
      setError('No internet connection');
      this.connectionCheckPromise = null;
    });
  }

  private async ensureConnection(): Promise<boolean> {
    const now = Date.now();
    
    // Return cached result if recent
    if (this.connectionCheckPromise && now - this.lastCheckTime < this.CHECK_INTERVAL) {
      return this.connectionCheckPromise;
    }
    
    this.lastCheckTime = now;
    this.connectionCheckPromise = checkSupabaseHealth();
    return this.connectionCheckPromise;
  }

  async executeRequest<T>(
    operation: () => Promise<T>,
    options: { 
      requiresConnection?: boolean;
      maxRetries?: number;
      silent?: boolean;
      baseDelay?: number;
      timeout?: number;
    } = {}
  ): Promise<T> {
    const { 
      isOnline, 
      setConnecting, 
      setError, 
      incrementRetry,
      resetRetry 
    } = useConnectionState.getState();

    if (options.requiresConnection) {
      if (!isOnline) {
        throw createAppError({
          message: 'No internet connection',
          status: 0
        });
      }

      const hasConnection = await this.ensureConnection();
      if (!hasConnection) {
        throw createAppError({
          message: 'Unable to connect to server',
          status: 503
        });
      }
    }

    const startTime = Date.now();
    const timeout = options.timeout || 30000; // 30 second default timeout

    try {
      if (!options.silent) {
        setConnecting(true);
      }

      const result = await withRetry(operation, {
        maxRetries: options.maxRetries || AUTH_DELAYS.MAX_RETRIES,
        baseDelay: options.baseDelay || AUTH_DELAYS.RETRY_BASE,
        maxDelay: AUTH_DELAYS.RETRY_MAX,
        onRetry: (attempt) => {
          incrementRetry();
          if (!options.silent) {
            setError(`Connection attempt ${attempt}/${AUTH_DELAYS.MAX_RETRIES}`);
          }
        },
        shouldRetry: (error) => {
          // Don't retry if we've exceeded timeout
          if (Date.now() - startTime > timeout) {
            return false;
          }
          return error?.status === 503 || error?.message?.includes('connect error');
        }
      });
      
      resetRetry();
      if (!options.silent) {
        setError(null);
      }
      return result;
    } catch (error) {
      const appError = createAppError(error);
      if (!options.silent) {
        setError(appError.message);
      }
      throw appError;
    } finally {
      if (!options.silent) {
        setConnecting(false);
      }
    }
  }
}

export const connectionManager = ConnectionManager.getInstance();