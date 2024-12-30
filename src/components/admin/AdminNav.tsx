import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart, Users, Calendar } from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme';

const navItems = [
  { route: 'Overview', icon: BarChart, label: 'Overview' },
  { route: 'Users', icon: Users, label: 'Users' },
  { route: 'Matches', icon: Calendar, label: 'Matches' }
];

export function AdminNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {navItems.map(({ route, icon: Icon, label }) => (
        <TouchableOpacity
          key={route}
          style={styles.navItem}
          onPress={() => navigation.navigate(route)}
        >
          <Icon size={20} color={colors.primary} />
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.md,
  },
  navItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    marginLeft: spacing.xs,
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
  },
});