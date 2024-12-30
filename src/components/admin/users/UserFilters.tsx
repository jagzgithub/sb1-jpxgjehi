import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { Input } from '../../common/Input';
import { Select } from '../../common/Select';
import { spacing } from '../../../theme';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
}

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'player', label: 'Players' },
  { value: 'captain', label: 'Captains' },
  { value: 'admin', label: 'Admins' }
];

export function UserFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange
}: UserFiltersProps) {
  return (
    <View style={styles.container}>
      <Input
        label="Search Users"
        value={searchTerm}
        onChangeText={onSearchChange}
        placeholder="Search by name or email..."
        icon={Search}
        style={styles.searchInput}
      />
      <Select
        label="Filter by Role"
        value={roleFilter}
        options={roleOptions}
        onChange={onRoleFilterChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  searchInput: {
    marginBottom: spacing.sm,
  },
});