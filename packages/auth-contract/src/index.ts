export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
};

export type AuthContract = {
  getAccessToken: () => string | null;
  getCurrentUser: () => AuthUser | null;
  isAuthenticated: () => boolean;
  logout: () => void;
};