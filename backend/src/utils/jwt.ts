import { SignOptions } from '@fastify/jwt';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_secret_key_for_dev',
  sign: {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  } as SignOptions
};