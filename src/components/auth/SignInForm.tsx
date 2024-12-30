import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LogIn } from 'lucide-react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword } from '../../utils/validators';
import { colors, spacing } from '../../theme';

export function SignInForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const validate = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setValidationErrors({
      email: emailError || '',
      password: passwordError || ''
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await login(email, password);
  };

  return (
    <View style={styles.container}>
      {error && <Alert type="error" message={error} />}
      
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={validationErrors.email}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={validationErrors.password}
        secureTextEntry
        autoComplete="password"
      />

      <Button
        title="Sign In"
        onPress={handleSubmit}
        loading={isLoading}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  button: {
    marginTop: spacing.md,
  },
});