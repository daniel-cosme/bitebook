export interface User {
  id: string;
  email: string;
  password: string;
  clinicId: string;
  role: 'admin' | 'dentist' | 'receptionist';
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  clinicId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  birthDate?: Date;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  clinicId: string;
  patientId: string;
  appointmentId?: string;
  amount: number;
  currency: string;
  method: 'cash' | 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer';
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  description?: string;
  transactionId?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: User;
  clinicId?: string;
}

export interface MultiTenantContext {
  clinicId: string;
  user: User;
}