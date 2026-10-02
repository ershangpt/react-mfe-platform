import { create } from 'zustand';
import type { AuthUser } from './authTypes';
import { devtools } from 'zustand/middleware';

// type AuthState = {
//   user: AuthUser | null;
//   isAuthenticated: boolean;

//   setAuthenticatedUser: (user: AuthUser) => void;
//   clearAuthentication: () => void;
// };

const storeCreator = (set: any) => ({
  user: null,
  isAuthenticated: false,

  setAuthenticatedUser: (user: AuthUser) =>
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

export const useAuthStore = create(
  import.meta.env.DEV
    ? devtools(storeCreator, {
        name: 'ShellAuthStore',
      })
    : storeCreator,
);