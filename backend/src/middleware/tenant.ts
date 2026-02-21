import { FastifyReply, FastifyRequest } from 'fastify';
import { MultiTenantContext } from '../types';

// Mock database of clinics for demonstration
const mockClinics = [
  { id: 'clinic-1', name: 'Clínica OdontoCare', active: true },
  { id: 'clinic-2', name: 'Sorriso Perfeito', active: true },
  { id: 'clinic-3', name: 'DentalLife', active: true }
];

export async function tenantMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
): Promise<void> {
  try {
    // Extract clinic ID from JWT payload (after authentication)
    const user: any = (request as any).user;
    
    if (!user || !user.clinicId) {
      reply.status(401).send({ error: 'Invalid token or missing clinic information' });
      return;
    }

    // Validate clinic exists and is active
    const clinic = mockClinics.find(c => c.id === user.clinicId);
    if (!clinic || !clinic.active) {
      reply.status(401).send({ error: 'Clinic not found or inactive' });
      return;
    }

    // Add clinic ID to request context
    (request as any).clinicId = user.clinicId;

    done();
  } catch (error) {
    console.error('Tenant middleware error:', error);
    reply.status(500).send({ error: 'Internal server error' });
  }
}

export function getTenantContext(request: FastifyRequest): MultiTenantContext {
  const user: any = (request as any).user;
  const clinicId = (request as any).clinicId;
  
  if (!user || !clinicId) {
    throw new Error('Tenant context not available');
  }

  return {
    clinicId,
    user
  };
}