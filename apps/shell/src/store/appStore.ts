import { create } from 'zustand';

type AppState = {
  user: {
    id: string;
    name: string;
  } | null;

  theme: 'light' | 'dark';

  setUser: (user: AppState['user']) => void;
  setTheme: (theme: AppState['theme']) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,

  theme: 'light',

  setUser: (user) => set({ user }),

  setTheme: (theme) => set({ theme }),
}));