import React from 'react';
import { 
  KeyboardAvoidingView as RNKeyboardAvoidingView, 
  Platform, 
  StyleSheet 
} from 'react-native';

interface KeyboardAvoidingViewProps {
  children: React.ReactNode;
}

export function KeyboardAvoidingView({ children }: KeyboardAvoidingViewProps) {
  return (
    <RNKeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});