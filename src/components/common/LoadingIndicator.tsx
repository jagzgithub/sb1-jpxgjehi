import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../theme';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

export function LoadingIndicator({ 
  size = 'large', 
  color = colors.primary 
}: LoadingIndicatorProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});