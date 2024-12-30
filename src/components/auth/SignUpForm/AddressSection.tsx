import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../common/Input';
import { spacing } from '../../../theme';
import type { SignUpFormData } from '../../../types/auth';

interface AddressSectionProps {
  values: SignUpFormData;
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
}

export function AddressSection({
  values,
  errors,
  handleChange
}: AddressSectionProps) {
  return (
    <View style={styles.container}>
      <Input
        label="House Number"
        value={values.houseNumber}
        onChangeText={(value) => handleChange('houseNumber', value)}
        error={errors.houseNumber}
      />

      <Input
        label="Street Name"
        value={values.streetName}
        onChangeText={(value) => handleChange('streetName', value)}
        error={errors.streetName}
      />

      <Input
        label="City"
        value={values.city}
        onChangeText={(value) => handleChange('city', value)}
        error={errors.city}
      />

      <Input
        label="State"
        value={values.state}
        onChangeText={(value) => handleChange('state', value)}
        error={errors.state}
      />

      <Input
        label="Postcode"
        value={values.postcode}
        onChangeText={(value) => handleChange('postcode', value)}
        error={errors.postcode}
      />

      <Input
        label="Country"
        value={values.country}
        onChangeText={(value) => handleChange('country', value)}
        error={errors.country}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});