import { FastifyInstance } from 'fastify';
import { 
  getAllAppointments,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  getAppointmentById, 
  createAppointment, 
  updateAppointment, 
  deleteAppointment 
} from '../controllers/appointmentController';
import { tenantMiddleware } from '../middleware/tenant';

export async function appointmentRoutes(fastify: FastifyInstance) {
  // Apply tenant middleware to all appointment routes
  fastify.addHook('preHandler', tenantMiddleware);
  
  fastify.get('/', getAllAppointments);
  fastify.get('/doctor/:doctorId', getAppointmentsByDoctor);
  fastify.get('/patient/:patientId', getAppointmentsByPatient);
  fastify.get('/:id', getAppointmentById);
  fastify.post('/', createAppointment);
  fastify.put('/:id', updateAppointment);
  fastify.delete('/:id', deleteAppointment);
}