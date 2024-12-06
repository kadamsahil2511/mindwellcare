import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { name: string; email: string };
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string, password: string) => {
    // In a real app, this would make an API call
    set({ 
      isAuthenticated: true, 
      user: { 
        name: email.split('@')[0], 
        email 
      } 
    });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));