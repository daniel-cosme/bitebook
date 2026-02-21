import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../services/authService';

export async function login(request: FastifyRequest<{ Body: { email: string; password: string } }>, reply: FastifyReply) {
  try {
    const { email, password } = request.body;
    
    if (!email || !password) {
      return reply.status(400).send({ error: 'Email e senha são obrigatórios' });
    }
    
    const result = await AuthService.login({ email, password });
    
    if (!result.success) {
      return reply.status(401).send({ error: result.error });
    }
    
    // In a real implementation, we would set the JWT as a cookie or return it
    // For now, we'll just return the user data
    reply.send({
      success: true,
      user: result.user,
      token: result.token
    });
  } catch (error) {
    console.error('Login controller error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  // In a real implementation, we would invalidate the JWT token
  reply.send({ success: true, message: 'Logout realizado com sucesso' });
}

export async function register(request: FastifyRequest<{ Body: { email: string; password: string; clinicId: string; role: string } }>, reply: FastifyReply) {
  try {
    const { email, password, clinicId, role } = request.body;
    
    if (!email || !password || !clinicId || !role) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }
    
    // In a real implementation, we would validate the role and clinic
    const validRoles = ['admin', 'dentist', 'receptionist'];
    if (!validRoles.includes(role)) {
      return reply.status(400).send({ error: 'Cargo inválido' });
    }
    
    const result = await AuthService.register({
      email,
      clinicId,
      role: role as 'admin' | 'dentist' | 'receptionist'
    }, password);
    
    if (!result.success) {
      return reply.status(400).send({ error: result.error });
    }
    
    reply.send({
      success: true,
      user: result.user,
      token: result.token
    });
  } catch (error) {
    console.error('Register controller error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}