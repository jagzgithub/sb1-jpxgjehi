import { validatePersonalInfo } from './personalInfo';
import { validateAddress } from './address';
import type { SignUpFormData } from '../types';

export function validateSignUpForm(values: SignUpFormData): Record<string, string> {
  return {
    ...validatePersonalInfo(values),
    ...validateAddress(values)
  };
}