export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  CONNECTION_ERROR: 'Unable to connect to the server. Please check your internet connection and try again.',
  RATE_LIMIT: 'Too many attempts. Please wait a moment before trying again.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
  OFFLINE: 'You are currently offline. Please check your connection and try again.',
  RETRYING: (attempt: number, max: number) => 
    `Connection attempt ${attempt} of ${max}. Please wait...`,
  REGISTRATION_SUCCESS: 'Registration successful! Redirecting to login...',
  USER_EXISTS: 'This email is already registered. Please sign in instead.',
  PROFILE_ERROR: 'Failed to create user profile. Please try again.',
  VALIDATION_ERROR: 'Please check your information and try again.'
} as const;

export const AUTH_DELAYS = {
  RETRY_BASE: 2000,    // Start with 2 seconds
  RETRY_MAX: 8000,     // Max 8 seconds between retries
  MAX_RETRIES: 3,      // Try up to 3 times
  SUCCESS_REDIRECT: 2500, // Wait 2.5s before redirect on success
  CONNECTION_TIMEOUT: 15000 // 15 second connection timeout
} as const;