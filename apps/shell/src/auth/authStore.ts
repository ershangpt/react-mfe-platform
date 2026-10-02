import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthUser } from './authTypes';

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;

  setAuthenticatedUser: (user: AuthUser) => void;
  clearAuthentication: () => void;
};

const storeCreator: StateCreator<AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,

  setAuthenticatedUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearAuthentication: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
});

export const useAuthStore = create<AuthState>()(
  devtools(storeCreator, {
    name: 'ShellAuthStore',
    enabled: import.meta.env.DEV,
  }),
);