import { useState, useEffect } from 'react';
import { roleService } from '../services/roleService';
import type { UserRole } from '../types/auth';

export function useRoleManagement(userId: string | undefined) {
  const [role, setRole] = useState<UserRole>(() => 
    roleService.getCachedRole() || 'player'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRole() {
      if (!userId) {
        setRole('player');
        setIsLoading(false);
        return;
      }

      try {
        const userRole = await roleService.fetchRole(userId);
        setRole(userRole);
      } finally {
        setIsLoading(false);
      }
    }

    loadRole();
  }, [userId]);

  return { role, isLoading };
}