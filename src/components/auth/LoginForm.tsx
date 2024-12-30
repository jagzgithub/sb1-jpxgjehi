import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Input } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}
      
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        placeholder="Enter your password"
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        <LogIn className="w-4 h-4 mr-2" />
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}