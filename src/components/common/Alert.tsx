import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle, CheckCircle } from 'lucide-react-native';
import { colors } from '../../theme';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 8,
      backgroundColor: type === 'success' ? '#ECFDF5' : '#FEF2F2',
      marginBottom: 16,
    },
    icon: {
      marginRight: 8,
    },
    message: {
      color: type === 'success' ? colors.success : colors.error,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      {type === 'success' ? (
        <CheckCircle 
          size={20} 
          color={colors.success} 
          style={styles.icon}
        />
      ) : (
        <AlertCircle 
          size={20} 
          color={colors.error} 
          style={styles.icon}
        />
      )}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}