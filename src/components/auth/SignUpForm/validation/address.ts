import { patterns } from './patterns';
import type { SignUpFormData } from '../types';

export function validateAddress(values: Partial<SignUpFormData>): Record<string, string> {
  const errors: Record<string, string> = {};

  // House number validation
  if (!values.houseNumber?.trim()) {
    errors.houseNumber = 'House number is required';
  } else if (!patterns.address.test(values.houseNumber)) {
    errors.houseNumber = 'Invalid house number format';
  }

  // Street name validation
  if (!values.streetName?.trim()) {
    errors.streetName = 'Street name is required';
  } else if (!patterns.address.test(values.streetName)) {
    errors.streetName = 'Invalid street name format';
  }

  // City validation
  if (!values.city?.trim()) {
    errors.city = 'City is required';
  } else if (!patterns.name.test(values.city)) {
    errors.city = 'City name can only contain letters';
  }

  // State validation
  if (!values.state?.trim()) {
    errors.state = 'State is required';
  } else if (!patterns.name.test(values.state)) {
    errors.state = 'State name can only contain letters';
  }

  // Postcode validation
  if (!values.postcode?.trim()) {
    errors.postcode = 'Postcode is required';
  } else if (!patterns.postcode.test(values.postcode)) {
    errors.postcode = 'Invalid postcode format';
  }

  // Country validation
  if (!values.country?.trim()) {
    errors.country = 'Country is required';
  } else if (!patterns.name.test(values.country)) {
    errors.country = 'Country name can only contain letters';
  }

  return errors;
}