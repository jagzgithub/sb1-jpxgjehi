import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../../theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack = false }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: '600',
    color: colors.text.primary,
  },
});