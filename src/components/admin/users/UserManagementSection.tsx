import React from 'react';
import { Users } from 'lucide-react';
import { UserList } from './UserList';
import { useUserManagement } from '../../../hooks/admin/useUserManagement';

export function UserManagementSection() {
  const { users, fetchUsers, isLoading, error } = useUserManagement();

  if (isLoading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">User Management</h2>
      </div>

      <UserList users={users} onUserUpdated={fetchUsers} />
    </div>
  );
}