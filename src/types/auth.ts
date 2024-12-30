export type UserRole = 'player' | 'captain' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}