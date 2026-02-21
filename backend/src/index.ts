import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { jwtConfig } from './utils/jwt';
import { authRoutes } from './routes/authRoutes';
import { patientRoutes } from './routes/patientRoutes';
import { appointmentRoutes } from './routes/appointmentRoutes';
import { paymentRoutes } from './routes/paymentRoutes';

// Initialize Fastify app
const app = fastify({ 
  logger: true 
});

// Register plugins
app.register(cors, {
  origin: '*', // Configure according to your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

app.register(jwt, {
  secret: jwtConfig.secret
});

// Define routes
app.get('/', async (req, res) => {
  return { message: 'API Dental Clinic - MVP', version: '1.0.0' };
});

// Register route modules
app.register(authRoutes, { prefix: '/auth' });
app.register(patientRoutes, { prefix: '/patients' });
app.register(appointmentRoutes, { prefix: '/appointments' });
app.register(paymentRoutes, { prefix: '/payments' });

// Error handling
app.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await app.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await app.close();
  process.exit(0);
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server running at http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export { app };