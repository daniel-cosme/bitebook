import { create } from 'zustand';
import { authApi } from '../api/authApi';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authApi.getCurrentUser(),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (email: string, password: string) => {
    const result = await authApi.login({ email, password });
    
    if (result.success) {
      set({ 
        user: result.user, 
        token: result.token, 
        isAuthenticated: true 
      });
    }
    
    return { 
      success: result.success, 
      error: result.error 
    };
  },
  
  logout: () => {
    authApi.logout();
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  checkAuthStatus: () => {
    const token = localStorage.getItem('token');
    const user = authApi.getCurrentUser();
    
    set({ 
      user, 
      token, 
      isAuthenticated: !!token 
    });
  }
}));