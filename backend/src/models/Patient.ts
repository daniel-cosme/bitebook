import { Patient as PatientType } from '../types';

// Mock database for patients
let mockPatients: PatientType[] = [
  {
    id: 'patient-1',
    clinicId: 'clinic-1',
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@email.com',
    phone: '+5511999999999',
    birthDate: new Date('1985-05-15'),
    address: 'Rua das Flores, 123 - São Paulo, SP',
    emergencyContact: 'Maria Silva - (11) 98888-7777',
    medicalHistory: 'Hipertensão arterial controlada',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'patient-2',
    clinicId: 'clinic-1',
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@email.com',
    phone: '+5511988888888',
    birthDate: new Date('1990-11-22'),
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    emergencyContact: 'Carlos Santos - (11) 97777-6666',
    medicalHistory: 'Diabetes tipo 2 controlada',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class PatientModel {
  static async findAll(clinicId: string): Promise<PatientType[]> {
    return mockPatients.filter(patient => patient.clinicId === clinicId);
  }

  static async findById(id: string, clinicId: string): Promise<PatientType | null> {
    return mockPatients.find(patient => patient.id === id && patient.clinicId === clinicId) || null;
  }

  static async create(patientData: Omit<PatientType, 'id' | 'createdAt' | 'updatedAt'>): Promise<PatientType> {
    const newPatient: PatientType = {
      id: `patient-${Date.now()}`,
      ...patientData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockPatients.push(newPatient);
    return newPatient;
  }

  static async update(id: string, clinicId: string, patientData: Partial<PatientType>): Promise<PatientType | null> {
    const index = mockPatients.findIndex(patient => patient.id === id && patient.clinicId === clinicId);
    if (index === -1) return null;

    mockPatients[index] = {
      ...mockPatients[index],
      ...patientData,
      updatedAt: new Date()
    };

    return mockPatients[index];
  }

  static async delete(id: string, clinicId: string): Promise<boolean> {
    const initialLength = mockPatients.length;
    mockPatients = mockPatients.filter(patient => !(patient.id === id && patient.clinicId === clinicId));
    return mockPatients.length !== initialLength;
  }
}