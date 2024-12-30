import React from 'react';
import { UserPlus } from 'lucide-react';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { useForm } from '../../hooks/useForm';
import { validateSignUpForm } from '../../utils/validators';
import { registerUser } from '../../utils/api';
import type { SignUpForm as SignUpFormType } from '../../types/forms';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

interface SignUpFormProps {
  onSuccess: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const { values, errors, isSubmitting, handleChange, handleSubmit, setErrors } = useForm<SignUpFormType>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      mobilenumber: '',
      gender: '',
      dateOfBirth: '',
      houseNumber: '',
      streetName: '',
      city: '',
      state: '',
      postcode: '',
      country: ''
    },
    validate: validateSignUpForm,
    onSubmit: async (formValues) => {
      try {
        const result = await registerUser(formValues);
        if (result.success) {
          onSuccess();
        } else {
          setErrors({ submit: result.message });
        }
      } catch (error) {
        setErrors({ 
          submit: 'Registration failed. Please try again.' 
        });
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && <Alert type="error" message={errors.submit} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Input
            label="Mobile Number"
            name="mobilenumber"
            type="tel"
            value={values.mobilenumber}
            onChange={handleChange}
            error={errors.mobilenumber}
            required
          />

          <Select
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            options={genderOptions}
            error={errors.gender}
            required
          />

          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={values.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            required
          />
        </div>

        {/* Address Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Address</h3>
          <Input
            label="House Number"
            name="houseNumber"
            value={values.houseNumber}
            onChange={handleChange}
            error={errors.houseNumber}
            required
          />

          <Input
            label="Street Name"
            name="streetName"
            value={values.streetName}
            onChange={handleChange}
            error={errors.streetName}
            required
          />

          <Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleChange}
            error={errors.city}
            required
          />

          <Input
            label="State"
            name="state"
            value={values.state}
            onChange={handleChange}
            error={errors.state}
            required
          />

          <Input
            label="Postcode"
            name="postcode"
            value={values.postcode}
            onChange={handleChange}
            error={errors.postcode}
            required
          />

          <Input
            label="Country"
            name="country"
            value={values.country}
            onChange={handleChange}
            error={errors.country}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        <UserPlus className="w-4 h-4 mr-2" />
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}