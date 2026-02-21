import { FastifyInstance } from 'fastify';
import { 
  getAllPatients, 
  getPatientById, 
  createPatient, 
  updatePatient, 
  deletePatient 
} from '../controllers/patientController';
import { tenantMiddleware } from '../middleware/tenant';

export async function patientRoutes(fastify: FastifyInstance) {
  // Apply tenant middleware to all patient routes
  fastify.addHook('preHandler', tenantMiddleware);

  fastify.get('/', getAllPatients);
  fastify.get('/:id', getPatientById);
  fastify.post('/', createPatient);
  fastify.put('/:id', updatePatient);
  fastify.delete('/:id', deletePatient);
}