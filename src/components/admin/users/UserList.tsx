import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UserRoleSelect } from './UserRoleSelect';
import { colors, typography, spacing } from '../../../theme';
import type { User } from '../../../types/auth';

interface UserListProps {
  users: User[];
  onUserUpdated: () => void;
}

export function UserList({ users, onUserUpdated }: UserListProps) {
  const renderItem = ({ item: user }: { item: User }) => (
    <View style={styles.userRow}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name || 'N/A'}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <View style={styles.roleContainer}>
        <UserRoleSelect
          userId={user.id}
          currentRole={user.role}
          onRoleUpdated={onUserUpdated}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={user => user.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: spacing.sm,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  },
  userEmail: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  roleContainer: {
    width: 120,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
});