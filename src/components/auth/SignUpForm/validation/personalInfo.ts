import { patterns } from './patterns';
import type { SignUpFormData } from '../types';

export function validatePersonalInfo(values: Partial<SignUpFormData>): Record<string, string> {
  const errors: Record<string, string> = {};

  // Name validation
  if (!values.name?.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (!patterns.name.test(values.name)) {
    errors.name = 'Name can only contain letters, spaces, and hyphens';
  }

  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!patterns.email.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  // Password validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/\d/.test(values.password)) {
    errors.password = 'Password must contain at least one number';
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = 'Password must contain at least one lowercase letter';
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  }

  // Mobile number validation
  if (!values.mobilenumber) {
    errors.mobilenumber = 'Mobile number is required';
  } else if (!patterns.phone.test(values.mobilenumber)) {
    errors.mobilenumber = 'Invalid mobile number format';
  }

  // Gender validation
  if (!values.gender) {
    errors.gender = 'Please select a gender';
  }

  // Date of birth validation
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const dob = new Date(values.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    if (age < 13) {
      errors.dateOfBirth = 'You must be at least 13 years old';
    } else if (age > 120) {
      errors.dateOfBirth = 'Please enter a valid date of birth';
    }
  }

  return errors;
}