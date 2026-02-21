import { Payment as PaymentType } from '../types';

// Mock database for payments
let mockPayments: PaymentType[] = [
  {
    id: 'payment-1',
    clinicId: 'clinic-1',
    patientId: 'patient-1',
    appointmentId: 'appointment-1',
    amount: 150.00,
    currency: 'BRL',
    method: 'credit_card',
    status: 'paid',
    description: 'Consulta de rotina',
    transactionId: 'trans-12345',
    paidAt: new Date('2023-07-15'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'payment-2',
    clinicId: 'clinic-1',
    patientId: 'patient-2',
    appointmentId: 'appointment-2',
    amount: 200.00,
    currency: 'BRL',
    method: 'cash',
    status: 'pending',
    description: 'Limpeza dentária',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class PaymentModel {
  static async findAll(clinicId: string): Promise<PaymentType[]> {
    return mockPayments.filter(payment => payment.clinicId === clinicId);
  }

  static async findByPatient(patientId: string, clinicId: string): Promise<PaymentType[]> {
    return mockPayments.filter(payment => 
      payment.patientId === patientId && payment.clinicId === clinicId
    );
  }

  static async findById(id: string, clinicId: string): Promise<PaymentType | null> {
    return mockPayments.find(payment => 
      payment.id === id && payment.clinicId === clinicId
    ) || null;
  }

  static async create(paymentData: Omit<PaymentType, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentType> {
    const newPayment: PaymentType = {
      id: `payment-${Date.now()}`,
      ...paymentData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockPayments.push(newPayment);
    return newPayment;
  }

  static async update(id: string, clinicId: string, paymentData: Partial<PaymentType>): Promise<PaymentType | null> {
    const index = mockPayments.findIndex(payment => 
      payment.id === id && payment.clinicId === clinicId
    );
    if (index === -1) return null;

    mockPayments[index] = {
      ...mockPayments[index],
      ...paymentData,
      updatedAt: new Date()
    };

    return mockPayments[index];
  }

  static async delete(id: string, clinicId: string): Promise<boolean> {
    const initialLength = mockPayments.length;
    mockPayments = mockPayments.filter(payment => 
      !(payment.id === id && payment.clinicId === clinicId)
    );
    return mockPayments.length !== initialLength;
  }
}