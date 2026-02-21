import apiClient from './ApiClient';
import { Appointment } from '../types';

export const appointmentApi = {
  getAll: async (): Promise<Appointment[]> => {
    const response = await apiClient.get('/appointments');
    return response.data;
  },

  getByDoctor: async (doctorId: string): Promise<Appointment[]> => {
    const response = await apiClient.get(`/appointments/doctor/${doctorId}`);
    return response.data;
  },

  getByPatient: async (patientId: string): Promise<Appointment[]> => {
    const response = await apiClient.get(`/appointments/patient/${patientId}`);
    return response.data;
  },

  getById: async (id: string): Promise<Appointment> => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  },

  create: async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'clinicId'>): Promise<Appointment> => {
    const response = await apiClient.post('/appointments', appointment);
    return response.data;
  },

  update: async (id: string, appointment: Partial<Appointment>): Promise<Appointment> => {
    const response = await apiClient.put(`/appointments/${id}`, appointment);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/appointments/${id}`);
  }
};