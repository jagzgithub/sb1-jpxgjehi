import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../common/Input';
import { Select } from '../../common/Select';
import { spacing } from '../../../theme';
import type { SignUpFormData } from '../../../types/auth';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

interface PersonalInfoSectionProps {
  values: SignUpFormData;
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
}

export function PersonalInfoSection({
  values,
  errors,
  handleChange
}: PersonalInfoSectionProps) {
  return (
    <View style={styles.container}>
      <Input
        label="Full Name"
        value={values.name}
        onChangeText={(value) => handleChange('name', value)}
        error={errors.name}
        autoComplete="name"
      />

      <Input
        label="Email"
        value={values.email}
        onChangeText={(value) => handleChange('email', value)}
        error={errors.email}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />

      <Input
        label="Password"
        value={values.password}
        onChangeText={(value) => handleChange('password', value)}
        error={errors.password}
        secureTextEntry
        autoComplete="password-new"
      />

      <Input
        label="Mobile Number"
        value={values.mobilenumber}
        onChangeText={(value) => handleChange('mobilenumber', value)}
        error={errors.mobilenumber}
        keyboardType="phone-pad"
        autoComplete="tel"
      />

      <Select
        label="Gender"
        value={values.gender}
        options={genderOptions}
        onChange={(value) => handleChange('gender', value)}
        error={errors.gender}
      />

      <Input
        label="Date of Birth"
        value={values.dateOfBirth}
        onChangeText={(value) => handleChange('dateOfBirth', value)}
        error={errors.dateOfBirth}
        placeholder="YYYY-MM-DD"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});