import { FastifyInstance } from 'fastify';
import { 
  getAllPayments,
  getPaymentsByPatient,
  getPaymentById, 
  createPayment, 
  updatePayment, 
  deletePayment 
} from '../controllers/paymentController';
import { tenantMiddleware } from '../middleware/tenant';

export async function paymentRoutes(fastify: FastifyInstance) {
  // Apply tenant middleware to all payment routes
  fastify.addHook('preHandler', tenantMiddleware);
  
  fastify.get('/', getAllPayments);
  fastify.get('/patient/:patientId', getPaymentsByPatient);
  fastify.get('/:id', getPaymentById);
  fastify.post('/', createPayment);
  fastify.put('/:id', updatePayment);
  fastify.delete('/:id', deletePayment);
}