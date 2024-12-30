import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserRoleSelect } from './UserRoleSelect';
import { useUserTable } from '../../../hooks/admin/useUserTable';
import { Alert } from '../../Alert';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Button } from '../../Button';

const USERS_PER_PAGE = 10;

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'player', label: 'Players' },
  { value: 'captain', label: 'Captains' },
  { value: 'admin', label: 'Admins' }
];

export function UserTable() {
  const { users, isLoading, error, refreshUsers } = useUserTable();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(user => {
    const matchesSearch = (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            label="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            icon={<Search className="w-5 h-5 text-gray-400" />}
          />
        </div>
        <div className="sm:w-48">
          <Select
            label="Filter by Role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={roleOptions}
            icon={<Filter className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserRoleSelect
                    userId={user.id}
                    currentRole={user.role}
                    onRoleUpdated={refreshUsers}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(user.createdAt), 'MMM d, yyyy')}
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  {users.length === 0 ? 'No users found' : 'No matching users found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-700">
            Showing {((currentPage - 1) * USERS_PER_PAGE) + 1} to {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}