import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Input } from '../../Input';
import { Button } from '../../Button';
import { Alert } from '../../Alert';
import { PasswordInput } from './components/PasswordInput';
import { useForm } from '../../../hooks/useForm';
import { useSignInState } from './hooks/useSignInState';
import { validateSignInForm } from './validation';
import type { SignInFormData } from './types';

const initialValues: SignInFormData = {
  email: '',
  password: ''
};

export function SignInForm() {
  const { handleSignIn, isSubmitting, error } = useSignInState();
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit 
  } = useForm<SignInFormData>({
    initialValues,
    validate: validateSignInForm,
    onSubmit: handleSignIn
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
        autoComplete="email"
        autoFocus
        disabled={isSubmitting}
      />

      <PasswordInput
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        disabled={isSubmitting}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        <LogIn className="w-4 h-4 mr-2" />
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}