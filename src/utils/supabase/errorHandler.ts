import { ErrorTypes, type AppError, type SupabaseError } from './errorTypes';

export function createAppError(error: unknown): AppError {
  const appError = new Error() as AppError;
  
  if (isSupabaseError(error)) {
    if (error.status === 503 || error.message.includes('connect error')) {
      appError.type = ErrorTypes.CONNECTION;
      appError.message = 'Unable to connect to the server. Please check your internet connection and try again.';
    } else if (error.status === 401 || error.status === 403) {
      appError.type = ErrorTypes.AUTHENTICATION;
      appError.message = 'Authentication failed. Please check your credentials.';
    } else {
      appError.type = ErrorTypes.UNKNOWN;
      appError.message = error.message || 'An unexpected error occurred';
    }
    appError.status = error.status;
    appError.details = error.details;
  } else {
    appError.type = ErrorTypes.UNKNOWN;
    appError.message = error instanceof Error ? error.message : 'An unexpected error occurred';
  }

  return appError;
}

function isSupabaseError(error: any): error is SupabaseError {
  return error && (typeof error.message === 'string' || typeof error.status === 'number');
}

export function getErrorMessage(error: AppError): string {
  switch (error.type) {
    case ErrorTypes.CONNECTION:
      return 'Connection failed. Please check your internet and try again.';
    case ErrorTypes.AUTHENTICATION:
      return 'Sign in failed. Please check your credentials.';
    case ErrorTypes.VALIDATION:
      return error.message || 'Please check your input and try again.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
}