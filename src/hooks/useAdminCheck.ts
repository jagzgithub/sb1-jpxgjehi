import { useState, useEffect } from 'react';
import { roleService } from '../services/roleService';
import { useAuth } from './useAuth';

export function useAdminCheck() {
  const { authState } = useAuth();
  const [isAdmin, setIsAdmin] = useState(() => 
    roleService.getCachedRole() === 'admin'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!authState.user?.id) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const role = await roleService.fetchRole(authState.user.id);
        setIsAdmin(role === 'admin');
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminStatus();
  }, [authState.user?.id]);

  return { isAdmin, isLoading };
}