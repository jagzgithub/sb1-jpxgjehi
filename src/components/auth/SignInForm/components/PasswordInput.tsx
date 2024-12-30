import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../../../Input';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export function PasswordInput({
  value,
  onChange,
  error,
  disabled,
  showPassword,
  onTogglePassword
}: PasswordInputProps) {
  return (
    <div className="relative">
      <Input
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        error={error}
        required
        autoComplete="current-password"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700"
        tabIndex={-1}
        disabled={disabled}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}