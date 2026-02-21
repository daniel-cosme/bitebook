import apiClient from './ApiClient';
import { Payment } from '../types';

export const paymentApi = {
  getAll: async (): Promise<Payment[]> => {
    const response = await apiClient.get('/payments');
    return response.data;
  },

  getByPatient: async (patientId: string): Promise<Payment[]> => {
    const response = await apiClient.get(`/payments/patient/${patientId}`);
    return response.data;
  },

  getById: async (id: string): Promise<Payment> => {
    const response = await apiClient.get(`/payments/${id}`);
    return response.data;
  },

  create: async (payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'clinicId'>): Promise<Payment> => {
    const response = await apiClient.post('/payments', payment);
    return response.data;
  },

  update: async (id: string, payment: Partial<Payment>): Promise<Payment> => {
    const response = await apiClient.put(`/payments/${id}`, payment);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/payments/${id}`);
  }
};