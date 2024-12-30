import { supabase } from './supabase';
import type { UserRole } from '../types/auth';

export const Permissions = {
  // Player permissions
  VIEW_MATCHES: 'view_matches',
  JOIN_MATCHES: 'join_matches',
  VIEW_OWN_STATS: 'view_own_stats',
  CONTACT_CAPTAIN: 'contact_captain',

  // Captain permissions
  APPROVE_MATCHES: 'approve_matches',
  MANAGE_TEAM: 'manage_team',
  VIEW_TEAM_STATS: 'view_team_stats',
  MESSAGE_TEAM: 'message_team',

  // Admin permissions
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  CREATE_MATCHES: 'create_matches',
  VIEW_SYSTEM_STATS: 'view_system_stats',
  MANAGE_PERMISSIONS: 'manage_permissions',
} as const;

export async function hasPermission(userId: string, permission: string): Promise<boolean> {
  try {
    // Get user's role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (roleError || !roleData) return false;

    // Check if role has the required permission
    const { data: permissionData, error: permissionError } = await supabase
      .from('role_permissions')
      .select('permission')
      .eq('role', roleData.role)
      .eq('permission', permission)
      .single();

    return !permissionError && !!permissionData;
  } catch (error) {
    console.error('Permission check failed:', error);
    return false;
  }
}

export async function getRolePermissions(role: UserRole): Promise<string[]> {
  const { data, error } = await supabase
    .from('role_permissions')
    .select('permission')
    .eq('role', role);

  if (error || !data) return [];
  return data.map(p => p.permission);
}