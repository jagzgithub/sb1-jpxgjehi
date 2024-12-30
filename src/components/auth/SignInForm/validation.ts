import { validateEmail, validatePassword } from '../../../utils/auth/validation';
import type { SignInFormData } from './types';

export function validateSignInForm(values: SignInFormData) {
  const errors: Record<string, string> = {};
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
}