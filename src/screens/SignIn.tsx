import React, { useState } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import { TouchableCard } from '../components/common/TouchableCard';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';
import { colors, typography, spacing } from '../theme';

export function SignIn() {
  const navigation = useNavigation();
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

    const result = await login(email, password);
    if (result?.user) {
      navigation.reset({
        index: 0,
        routes: [{ 
          name: result.user.role === 'admin' ? 'AdminDashboard' : 'Dashboard'
        }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.header}>
            <TouchableCard 
              onPress={() => navigation.goBack()}
              style={styles.logoContainer}
            >
              <Image 
                source={require('../assets/acers-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableCard>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to access your account
            </Text>
          </View>

          <View style={styles.form}>
            {error && <Alert type="error" message={error} />}
            
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              error={validationErrors.email}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              error={validationErrors.password}
              secureTextEntry
              autoComplete="password"
              placeholder="Enter your password"
            />

            <Button
              title="Sign In"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.button}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
              </Text>
              <Text 
                style={styles.link}
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign up
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  logoContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.lg,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
  },
  form: {
    padding: spacing.lg,
  },
  button: {
    marginTop: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  link: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: '600',
  },
});