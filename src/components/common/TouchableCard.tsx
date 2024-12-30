import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle,
  StyleProp 
} from 'react-native';
import { colors } from '../../theme';

interface TouchableCardProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export function TouchableCard({ 
  children, 
  onPress, 
  style, 
  disabled = false 
}: TouchableCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});