export type SupabaseError = {
  message: string;
  status?: number;
  details?: string;
};

export const ErrorTypes = {
  CONNECTION: 'CONNECTION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
} as const;

export type ErrorType = typeof ErrorTypes[keyof typeof ErrorTypes];

export interface AppError extends Error {
  type: ErrorType;
  details?: string;
  status?: number;
}