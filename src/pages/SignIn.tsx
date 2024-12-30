import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';

export function SignIn() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login(email, password);
    if (result?.user) {
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <Alert type="error" message={error} />}
          
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={validationErrors.email}
            required
            autoComplete="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={validationErrors.password}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}