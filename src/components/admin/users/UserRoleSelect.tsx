import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Select } from '../../common/Select';
import { Alert } from '../../common/Alert';
import { useRoleUpdate } from '../../../hooks/admin/useRoleUpdate';
import type { UserRole } from '../../../types/auth';

interface UserRoleSelectProps {
  userId: string;
  currentRole: UserRole;
  onRoleUpdated: () => void;
}

const roleOptions = [
  { value: 'player', label: 'Player' },
  { value: 'captain', label: 'Captain' },
  { value: 'admin', label: 'Admin' }
];

export function UserRoleSelect({
  userId,
  currentRole,
  onRoleUpdated
}: UserRoleSelectProps) {
  const { updateUserRole, isUpdating, error } = useRoleUpdate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    const success = await updateUserRole(userId, newRole as UserRole);
    if (success) {
      setShowSuccess(true);
      onRoleUpdated();
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Select
        label=""
        value={currentRole}
        options={roleOptions}
        onChange={handleRoleChange}
      />
      {error && <Alert type="error" message={error} />}
      {showSuccess && (
        <Alert type="success" message="Role updated successfully" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 120,
  },
});