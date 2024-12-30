import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import { Button } from '../../common/Button';
import { Alert } from '../../common/Alert';
import { PersonalInfoSection } from './PersonalInfoSection';
import { AddressSection } from './AddressSection';
import { useSignUp } from '../../../hooks/useSignUp';
import { spacing } from '../../../theme';
import type { SignUpFormData } from '../../../types/auth';

const initialValues: SignUpFormData = {
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
};

export function SignUpForm() {
  const { signUp, isLoading, error, success } = useSignUp();
  const [formData, setFormData] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    await signUp(formData);
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {error && <Alert type="error" message={error} />}
      {success && (
        <Alert 
          type="success" 
          message="Account created successfully! Please sign in." 
        />
      )}

      <PersonalInfoSection
        values={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <AddressSection
        values={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <Button
        title="Create Account"
        onPress={handleSubmit}
        loading={isLoading}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});