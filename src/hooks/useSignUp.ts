import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { validateSignUpForm } from '../utils/validators';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  mobilenumber: string;
  gender: string;
  dateOfBirth: string;
  houseNumber: string;
  streetName: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const signUp = async (formData: SignUpFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form data
      const validationErrors = validateSignUpForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        throw new Error(Object.values(validationErrors)[0]);
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create account');

      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: formData.name,
          email: formData.email,
          mobile_number: formData.mobilenumber,
          gender: formData.gender,
          date_of_birth: formData.dateOfBirth,
          house_number: formData.houseNumber,
          street_name: formData.streetName,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
        });

      if (profileError) throw profileError;

      setSuccess(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error, success };
}