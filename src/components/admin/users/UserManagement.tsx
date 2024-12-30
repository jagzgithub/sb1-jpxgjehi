import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserList } from './UserList';
import { UserFilters } from './UserFilters';
import { Alert } from '../../common/Alert';
import { Card } from '../../common/Card';
import { useUserManagement } from '../../../hooks/admin/useUserManagement';
import { spacing } from '../../../theme';

export function UserManagement() {
  const { users, fetchUsers, isLoading, error } = useUserManagement();

  if (isLoading) {
    return <View style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Card>
        {error && <Alert type="error" message={error} />}
        <UserFilters />
        <UserList users={users} onUserUpdated={fetchUsers} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  loading: {
    flex: 1,
    height: 200,
  },
});