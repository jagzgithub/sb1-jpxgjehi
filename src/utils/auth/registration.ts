import { supabase } from '../supabase';
import { connectionManager } from '../supabase/connectionManager';
import { createAppError } from '../supabase/errorHandler';
import { AUTH_MESSAGES } from './constants';
import type { SignUpFormData } from '../../components/auth/SignUpForm/types';

export async function registerUser(data: SignUpFormData) {
  try {
    // Step 1: Create auth user with retries
    const { data: authData, error: signUpError } = await connectionManager.executeRequest(
      () => supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: window.location.origin + '/signin'
        }
      }),
      { 
        requiresConnection: true,
        maxRetries: 3,
        baseDelay: 2000, // Start with 2 second delay
        timeout: 20000 // 20 second timeout
      }
    );

    if (signUpError) {
      if (signUpError.message.includes('User already registered')) {
        throw new Error('This email is already registered. Please sign in instead.');
      }
      throw signUpError;
    }
    
    if (!authData.user) {
      throw new Error('Registration failed. Please try again.');
    }

    // Step 2: Create user profile with retries
    const { error: profileError } = await connectionManager.executeRequest(
      () => supabase.from('profiles').insert({
        id: authData.user.id,
        full_name: data.name,
        email: data.email,
        mobile_number: data.mobilenumber,
        gender: data.gender,
        date_of_birth: data.dateOfBirth,
        house_number: data.houseNumber,
        street_name: data.streetName,
        city: data.city,
        state: data.state,
        postcode: data.postcode,
        country: data.country,
      }),
      { 
        maxRetries: 2,
        requiresConnection: true,
        timeout: 15000 // 15 second timeout
      }
    );

    if (profileError) {
      // Cleanup: Delete auth user if profile creation fails
      await connectionManager.executeRequest(
        () => supabase.auth.admin.deleteUser(authData.user.id),
        { silent: true }
      );
      throw new Error('Failed to create user profile. Please try again.');
    }

    return { 
      success: true, 
      message: 'Registration successful! Redirecting to login...'
    };
  } catch (error) {
    const appError = createAppError(error);
    
    // Map common errors to user-friendly messages
    if (appError.type === 'CONNECTION_ERROR') {
      return {
        success: false,
        message: AUTH_MESSAGES.CONNECTION_ERROR
      };
    }
    
    return { 
      success: false, 
      message: appError.message || AUTH_MESSAGES.GENERIC_ERROR
    };
  }
}