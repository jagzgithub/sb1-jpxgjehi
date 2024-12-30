import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/common/Header';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import { useSignUp } from '../hooks/useSignUp';
import { colors, spacing } from '../theme';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

export function SignUp() {
  const navigation = useNavigation();
  const { signUp, isLoading, error, success } = useSignUp();
  const [formData, setFormData] = React.useState({
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
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const success = await signUp(formData);
    if (success) {
      navigation.navigate('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Create Account" showBack />
      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {error && <Alert type="error" message={error} />}
        {success && (
          <Alert 
            type="success" 
            message="Account created successfully! Please sign in." 
          />
        )}

        <Input
          label="Full Name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          autoComplete="name"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <Input
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
          autoComplete="password-new"
        />

        <Input
          label="Mobile Number"
          value={formData.mobilenumber}
          onChangeText={(value) => handleChange('mobilenumber', value)}
          keyboardType="phone-pad"
          autoComplete="tel"
        />

        <Select
          label="Gender"
          value={formData.gender}
          options={genderOptions}
          onChange={(value) => handleChange('gender', value)}
        />

        <Input
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChangeText={(value) => handleChange('dateOfBirth', value)}
          placeholder="YYYY-MM-DD"
        />

        <View style={styles.addressSection}>
          <Input
            label="House Number"
            value={formData.houseNumber}
            onChangeText={(value) => handleChange('houseNumber', value)}
          />

          <Input
            label="Street Name"
            value={formData.streetName}
            onChangeText={(value) => handleChange('streetName', value)}
          />

          <Input
            label="City"
            value={formData.city}
            onChangeText={(value) => handleChange('city', value)}
          />

          <Input
            label="State"
            value={formData.state}
            onChangeText={(value) => handleChange('state', value)}
          />

          <Input
            label="Postcode"
            value={formData.postcode}
            onChangeText={(value) => handleChange('postcode', value)}
          />

          <Input
            label="Country"
            value={formData.country}
            onChangeText={(value) => handleChange('country', value)}
          />
        </View>

        <Button
          title="Create Account"
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  addressSection: {
    marginTop: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});