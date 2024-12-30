import { supabase } from './supabase';

interface RegisterData {
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

export const registerUser = async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
  try {
    // 1. Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Registration failed');

    // 2. Create the user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: data.name,
        mobile_number: data.mobilenumber,
        gender: data.gender,
        date_of_birth: data.dateOfBirth,
        house_number: data.houseNumber,
        street_name: data.streetName,
        city: data.city,
        state: data.state,
        postcode: data.postcode,
        country: data.country,
      });

    if (profileError) throw new Error(profileError.message);

    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Registration failed. Please try again.' 
    };
  }
}