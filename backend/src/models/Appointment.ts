import { Appointment as AppointmentType } from '../types';

// Mock database for appointments
let mockAppointments: AppointmentType[] = [
  {
    id: 'appointment-1',
    patientId: 'patient-1',
    doctorId: 'user-2',
    clinicId: 'clinic-1',
    date: new Date('2023-07-15'),
    startTime: '09:00',
    endTime: '10:00',
    status: 'completed',
    notes: 'Consulta de rotina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'appointment-2',
    patientId: 'patient-2',
    doctorId: 'user-2',
    clinicId: 'clinic-1',
    date: new Date('2023-07-16'),
    startTime: '14:00',
    endTime: '15:00',
    status: 'scheduled',
    notes: 'Limpeza dentária',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class AppointmentModel {
  static async findAll(clinicId: string): Promise<AppointmentType[]> {
    return mockAppointments.filter(appointment => appointment.clinicId === clinicId);
  }

  static async findByDoctor(doctorId: string, clinicId: string): Promise<AppointmentType[]> {
    return mockAppointments.filter(appointment => 
      appointment.doctorId === doctorId && appointment.clinicId === clinicId
    );
  }

  static async findByPatient(patientId: string, clinicId: string): Promise<AppointmentType[]> {
    return mockAppointments.filter(appointment => 
      appointment.patientId === patientId && appointment.clinicId === clinicId
    );
  }

  static async findById(id: string, clinicId: string): Promise<AppointmentType | null> {
    return mockAppointments.find(appointment => 
      appointment.id === id && appointment.clinicId === clinicId
    ) || null;
  }

  static async create(appointmentData: Omit<AppointmentType, 'id' | 'createdAt' | 'updatedAt'>): Promise<AppointmentType> {
    const newAppointment: AppointmentType = {
      id: `appointment-${Date.now()}`,
      ...appointmentData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockAppointments.push(newAppointment);
    return newAppointment;
  }

  static async update(id: string, clinicId: string, appointmentData: Partial<AppointmentType>): Promise<AppointmentType | null> {
    const index = mockAppointments.findIndex(appointment => 
      appointment.id === id && appointment.clinicId === clinicId
    );
    if (index === -1) return null;

    mockAppointments[index] = {
      ...mockAppointments[index],
      ...appointmentData,
      updatedAt: new Date()
    };

    return mockAppointments[index];
  }

  static async delete(id: string, clinicId: string): Promise<boolean> {
    const initialLength = mockAppointments.length;
    mockAppointments = mockAppointments.filter(appointment => 
      !(appointment.id === id && appointment.clinicId === clinicId)
    );
    return mockAppointments.length !== initialLength;
  }
}