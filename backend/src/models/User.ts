import bcrypt from 'bcryptjs';
import { User as UserType } from '../types';

// Mock database for users
let mockUsers: UserType[] = [
  {
    id: 'user-1',
    email: 'admin@odontocare.com',
    password: '$2a$10$8K1p/a0dURVJyL7fWVaH.uP6vQ7wRzT5F8kY9LgGtQ6qN3zF4lO2.', // 'password123' hashed
    clinicId: 'clinic-1',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'user-2',
    email: 'dentist@odontocare.com',
    password: '$2a$10$8K1p/a0dURVJyL7fWVaH.uP6vQ7wRzT5F8kY9LgGtQ6qN3zF4lO2.', // 'password123' hashed
    clinicId: 'clinic-1',
    role: 'dentist',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class UserModel {
  static async findByEmail(email: string, clinicId: string): Promise<UserType | null> {
    return mockUsers.find(user => user.email === email && user.clinicId === clinicId) || null;
  }

  static async findById(id: string, clinicId: string): Promise<UserType | null> {
    return mockUsers.find(user => user.id === id && user.clinicId === clinicId) || null;
  }

  static async create(userData: Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserType> {
    const newUser: UserType = {
      id: `user-${Date.now()}`,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockUsers.push(newUser);
    return newUser;
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static async updatePassword(userId: string, clinicId: string, newPassword: string): Promise<UserType | null> {
    const index = mockUsers.findIndex(user => user.id === userId && user.clinicId === clinicId);
    if (index === -1) return null;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    mockUsers[index] = {
      ...mockUsers[index],
      password: hashedPassword,
      updatedAt: new Date()
    };

    return mockUsers[index];
  }
}