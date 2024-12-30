import { SignUpFormData } from './types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;
const POSTCODE_REGEX = /^[A-Z\d]{1,10}$/i;

export function validateSignUpForm(values: SignUpFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  // Personal Information
  if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/\d/.test(values.password) || !/[a-zA-Z]/.test(values.password)) {
    errors.password = 'Password must contain both letters and numbers';
  }

  if (!values.mobilenumber) {
    errors.mobilenumber = 'Mobile number is required';
  } else if (!PHONE_REGEX.test(values.mobilenumber)) {
    errors.mobilenumber = 'Invalid mobile number format';
  }

  if (!values.gender) {
    errors.gender = 'Please select a gender';
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const dob = new Date(values.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 13) {
      errors.dateOfBirth = 'You must be at least 13 years old';
    }
  }

  // Address Information
  if (!values.houseNumber.trim()) {
    errors.houseNumber = 'House number is required';
  }

  if (!values.streetName.trim()) {
    errors.streetName = 'Street name is required';
  }

  if (!values.city.trim()) {
    errors.city = 'City is required';
  }

  if (!values.state.trim()) {
    errors.state = 'State is required';
  }

  if (!values.postcode.trim()) {
    errors.postcode = 'Postcode is required';
  } else if (!POSTCODE_REGEX.test(values.postcode)) {
    errors.postcode = 'Invalid postcode format';
  }

  if (!values.country.trim()) {
    errors.country = 'Country is required';
  }

  return errors;
}