import { AUTH_MESSAGES } from './constants';

export const AuthErrorCodes = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  CONNECTION_ERROR: 'connection_error',
  RATE_LIMIT: 'rate_limit',
  OFFLINE: 'offline',
  UNKNOWN: 'unknown'
} as const;

export type AuthErrorCode = typeof AuthErrorCodes[keyof typeof AuthErrorCodes];

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

export function getAuthErrorMessage(error: unknown): AuthError {
  if (!error) {
    return {
      code: AuthErrorCodes.UNKNOWN,
      message: AUTH_MESSAGES.GENERIC_ERROR
    };
  }

  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('Invalid login credentials')) {
    return {
      code: AuthErrorCodes.INVALID_CREDENTIALS,
      message: AUTH_MESSAGES.INVALID_CREDENTIALS
    };
  }

  if (message.includes('connect error') || message.includes('503')) {
    return {
      code: AuthErrorCodes.CONNECTION_ERROR,
      message: AUTH_MESSAGES.CONNECTION_ERROR
    };
  }

  if (message.includes('Too many requests')) {
    return {
      code: AuthErrorCodes.RATE_LIMIT,
      message: AUTH_MESSAGES.RATE_LIMIT
    };
  }

  if (message.includes('No internet connection')) {
    return {
      code: AuthErrorCodes.OFFLINE,
      message: AUTH_MESSAGES.OFFLINE
    };
  }

  return {
    code: AuthErrorCodes.UNKNOWN,
    message: AUTH_MESSAGES.GENERIC_ERROR
  };
}