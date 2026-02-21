import { FastifyInstance } from 'fastify';
import { login, logout, register } from '../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', login);
  fastify.post('/logout', logout);
  fastify.post('/register', register);
}