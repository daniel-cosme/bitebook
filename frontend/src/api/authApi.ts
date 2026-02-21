import apiClient from './ApiClient';
import { LoginCredentials, LoginResponse } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro desconhecido'
      };
    }
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error: any) {
      // Even if the API call fails, we still clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        success: true,
        message: 'Logout realizado com sucesso'
      };
    }
  },

  getCurrentUser: (): any => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};