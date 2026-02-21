import { FastifyReply, FastifyRequest } from 'fastify';
import { PatientModel } from '../models/Patient';
import { getTenantContext } from '../middleware/tenant';

export async function getAllPatients(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { clinicId } = getTenantContext(request);
    
    const patients = await PatientModel.findAll(clinicId);
    reply.send(patients);
  } catch (error) {
    console.error('Get all patients error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function getPatientById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const patient = await PatientModel.findById(id, clinicId);
    
    if (!patient) {
      return reply.status(404).send({ error: 'Paciente não encontrado' });
    }
    
    reply.send(patient);
  } catch (error) {
    console.error('Get patient by ID error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function createPatient(request: FastifyRequest<{ Body: { firstName: string; lastName: string; email?: string; phone?: string; birthDate?: Date; address?: string; emergencyContact?: string; medicalHistory?: string } }>, reply: FastifyReply) {
  try {
    const { firstName, lastName, email, phone, birthDate, address, emergencyContact, medicalHistory } = request.body;
    const { clinicId } = getTenantContext(request);
    
    if (!firstName || !lastName) {
      return reply.status(400).send({ error: 'Nome e sobrenome são obrigatórios' });
    }
    
    const patient = await PatientModel.create({
      firstName,
      lastName,
      clinicId,
      email,
      phone,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      address,
      emergencyContact,
      medicalHistory
    });
    
    reply.status(201).send(patient);
  } catch (error) {
    console.error('Create patient error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function updatePatient(request: FastifyRequest<{ Params: { id: string }; Body: { firstName?: string; lastName?: string; email?: string; phone?: string; birthDate?: Date; address?: string; emergencyContact?: string; medicalHistory?: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { firstName, lastName, email, phone, birthDate, address, emergencyContact, medicalHistory } = request.body;
    const { clinicId } = getTenantContext(request);
    
    const updatedPatient = await PatientModel.update(id, clinicId, {
      firstName,
      lastName,
      email,
      phone,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      address,
      emergencyContact,
      medicalHistory
    });
    
    if (!updatedPatient) {
      return reply.status(404).send({ error: 'Paciente não encontrado' });
    }
    
    reply.send(updatedPatient);
  } catch (error) {
    console.error('Update patient error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function deletePatient(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const deleted = await PatientModel.delete(id, clinicId);
    
    if (!deleted) {
      return reply.status(404).send({ error: 'Paciente não encontrado' });
    }
    
    reply.send({ success: true });
  } catch (error) {
    console.error('Delete patient error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}