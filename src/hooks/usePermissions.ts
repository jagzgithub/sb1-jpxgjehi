import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { hasPermission, getRolePermissions } from '../utils/permissions';

export function usePermissions() {
  const { authState } = useAuth();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPermissions() {
      if (!authState.user) {
        setPermissions([]);
        setIsLoading(false);
        return;
      }

      try {
        const rolePermissions = await getRolePermissions(authState.user.role);
        setPermissions(rolePermissions);
      } catch (error) {
        console.error('Failed to load permissions:', error);
        setPermissions([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadPermissions();
  }, [authState.user]);

  const checkPermission = async (permission: string): Promise<boolean> => {
    if (!authState.user) return false;
    return hasPermission(authState.user.id, permission);
  };

  return {
    permissions,
    isLoading,
    checkPermission,
    hasPermission: (permission: string) => permissions.includes(permission)
  };
}