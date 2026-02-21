import apiClient from './ApiClient';
import { Patient } from '../types';

export const patientApi = {
  getAll: async (): Promise<Patient[]> => {
    const response = await apiClient.get('/patients');
    return response.data;
  },

  getById: async (id: string): Promise<Patient> => {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },

  create: async (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt' | 'clinicId'>): Promise<Patient> => {
    const response = await apiClient.post('/patients', patient);
    return response.data;
  },

  update: async (id: string, patient: Partial<Patient>): Promise<Patient> => {
    const response = await apiClient.put(`/patients/${id}`, patient);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/patients/${id}`);
  }
};