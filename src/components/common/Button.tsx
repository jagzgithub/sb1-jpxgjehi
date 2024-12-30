import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  onPress, 
  title, 
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    disabled && styles.disabledButton,
    style
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#ffffff' : '#4F46E5'} 
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#4F46E5',
  },
  disabledText: {
    opacity: 0.5,
  },
});