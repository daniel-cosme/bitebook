import { FastifyReply, FastifyRequest } from 'fastify';
import { AppointmentModel } from '../models/Appointment';
import { getTenantContext } from '../middleware/tenant';

export async function getAllAppointments(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { clinicId } = getTenantContext(request);
    
    const appointments = await AppointmentModel.findAll(clinicId);
    reply.send(appointments);
  } catch (error) {
    console.error('Get all appointments error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function getAppointmentsByDoctor(request: FastifyRequest<{ Params: { doctorId: string } }>, reply: FastifyReply) {
  try {
    const { doctorId } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const appointments = await AppointmentModel.findByDoctor(doctorId, clinicId);
    reply.send(appointments);
  } catch (error) {
    console.error('Get appointments by doctor error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function getAppointmentsByPatient(request: FastifyRequest<{ Params: { patientId: string } }>, reply: FastifyReply) {
  try {
    const { patientId } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const appointments = await AppointmentModel.findByPatient(patientId, clinicId);
    reply.send(appointments);
  } catch (error) {
    console.error('Get appointments by patient error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function getAppointmentById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const appointment = await AppointmentModel.findById(id, clinicId);
    
    if (!appointment) {
      return reply.status(404).send({ error: 'Agendamento não encontrado' });
    }
    
    reply.send(appointment);
  } catch (error) {
    console.error('Get appointment by ID error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function createAppointment(request: FastifyRequest<{ Body: { patientId: string; doctorId: string; date: Date; startTime: string; endTime: string; status?: string; notes?: string } }>, reply: FastifyReply) {
  try {
    const { patientId, doctorId, date, startTime, endTime, status, notes } = request.body;
    const { clinicId } = getTenantContext(request);
    
    if (!patientId || !doctorId || !date || !startTime || !endTime) {
      return reply.status(400).send({ error: 'Campos obrigatórios ausentes' });
    }
    
    const appointment = await AppointmentModel.create({
      patientId,
      doctorId,
      clinicId,
      date: new Date(date),
      startTime,
      endTime,
      status: status as 'scheduled' | 'confirmed' | 'completed' | 'cancelled' || 'scheduled',
      notes
    });
    
    reply.status(201).send(appointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function updateAppointment(request: FastifyRequest<{ Params: { id: string }; Body: { patientId?: string; doctorId?: string; date?: Date; startTime?: string; endTime?: string; status?: string; notes?: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { patientId, doctorId, date, startTime, endTime, status, notes } = request.body;
    const { clinicId } = getTenantContext(request);
    
    const updatedAppointment = await AppointmentModel.update(id, clinicId, {
      patientId,
      doctorId,
      date: date ? new Date(date) : undefined,
      startTime,
      endTime,
      status: status as 'scheduled' | 'confirmed' | 'completed' | 'cancelled',
      notes
    });
    
    if (!updatedAppointment) {
      return reply.status(404).send({ error: 'Agendamento não encontrado' });
    }
    
    reply.send(updatedAppointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function deleteAppointment(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const deleted = await AppointmentModel.delete(id, clinicId);
    
    if (!deleted) {
      return reply.status(404).send({ error: 'Agendamento não encontrado' });
    }
    
    reply.send({ success: true });
  } catch (error) {
    console.error('Delete appointment error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}