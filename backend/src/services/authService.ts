import { User as UserType } from '../types';
import { UserModel } from '../models/User';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  user?: UserType;
  token?: string;
  error?: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      // Find user by email in their specific clinic
      // In a real implementation, we'd extract clinic from subdomain or header
      // For demo purposes, we'll use a default clinic
      const clinicId = 'clinic-1'; // This would come from the request context in a real app
      const user = await UserModel.findByEmail(credentials.email, clinicId);
      
      if (!user) {
        return {
          success: false,
          error: 'Usuário não encontrado'
        };
      }
      
      const isValidPassword = await UserModel.comparePassword(
        credentials.password,
        user.password
      );
      
      if (!isValidPassword) {
        return {
          success: false,
          error: 'Senha incorreta'
        };
      }
      
      // In a real implementation, we would generate a JWT here
      // For now, we'll just return the user object
      return {
        success: true,
        user: {
          ...user,
          password: '' // Don't return password in response
        },
        // Token would be generated here in real implementation
        token: `mock-jwt-token-for-${user.id}`
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Erro interno do servidor'
      };
    }
  }
  
  static async register(userData: Omit<UserType, 'id' | 'createdAt' | 'updatedAt' | 'password'>, password: string): Promise<LoginResult> {
    try {
      // Hash password (in real implementation)
      const hashedPassword = '$2a$10$8K1p/a0dURVJyL7fWVaH.uP6vQ7wRzT5F8kY9LgGtQ6qN3zF4lO2.'; // 'password123' hashed
      
      const user = await UserModel.create({
        ...userData,
        password: hashedPassword
      });
      
      return {
        success: true,
        user: {
          ...user,
          password: '' // Don't return password in response
        },
        // Token would be generated here in real implementation
        token: `mock-jwt-token-for-${user.id}`
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Erro ao registrar usuário'
      };
    }
  }
}