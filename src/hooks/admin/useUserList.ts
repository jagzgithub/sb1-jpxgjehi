import { useState, useMemo } from 'react';
import type { User } from '../../types/auth';

const ITEMS_PER_PAGE = 10;

export function useUserList(users: User[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = (
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesRole = !roleFilter || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    currentPage,
    totalPages,
    paginatedUsers,
    handlePageChange
  };
}