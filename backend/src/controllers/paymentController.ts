import { FastifyReply, FastifyRequest } from 'fastify';
import { PaymentModel } from '../models/Payment';
import { getTenantContext } from '../middleware/tenant';

export async function getAllPayments(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { clinicId } = getTenantContext(request);
    
    const payments = await PaymentModel.findAll(clinicId);
    reply.send(payments);
  } catch (error) {
    console.error('Get all payments error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function getPaymentsByPatient(request: FastifyRequest<{ Params: { patientId: string } }>, reply: FastifyReply) {
  try {
    const { patientId } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const payments = await PaymentModel.findByPatient(patientId, clinicId);
    reply.send(payments);
  } catch (error) {
    console.error('Get payments by patient error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function getPaymentById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const payment = await PaymentModel.findById(id, clinicId);
    
    if (!payment) {
      return reply.status(404).send({ error: 'Pagamento não encontrado' });
    }
    
    reply.send(payment);
  } catch (error) {
    console.error('Get payment by ID error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function createPayment(request: FastifyRequest<{ Body: { patientId: string; appointmentId?: string; amount: number; currency?: string; method: string; status?: string; description?: string; transactionId?: string; paidAt?: Date } }>, reply: FastifyReply) {
  try {
    const { patientId, appointmentId, amount, currency, method, status, description, transactionId, paidAt } = request.body;
    const { clinicId } = getTenantContext(request);
    
    if (!patientId || amount === undefined || !method) {
      return reply.status(400).send({ error: 'Campos obrigatórios ausentes' });
    }
    
    const payment = await PaymentModel.create({
      patientId,
      appointmentId,
      clinicId,
      amount,
      currency: currency || 'BRL',
      method: method as 'cash' | 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer',
      status: status as 'pending' | 'paid' | 'cancelled' | 'refunded' || 'pending',
      description,
      transactionId,
      paidAt: paidAt ? new Date(paidAt) : undefined
    });
    
    reply.status(201).send(payment);
  } catch (error) {
    console.error('Create payment error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function updatePayment(request: FastifyRequest<{ Params: { id: string }; Body: { patientId?: string; appointmentId?: string; amount?: number; currency?: string; method?: string; status?: string; description?: string; transactionId?: string; paidAt?: Date } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { patientId, appointmentId, amount, currency, method, status, description, transactionId, paidAt } = request.body;
    const { clinicId } = getTenantContext(request);
    
    const updatedPayment = await PaymentModel.update(id, clinicId, {
      patientId,
      appointmentId,
      amount,
      currency,
      method: method as 'cash' | 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer',
      status: status as 'pending' | 'paid' | 'cancelled' | 'refunded',
      description,
      transactionId,
      paidAt: paidAt ? new Date(paidAt) : undefined
    });
    
    if (!updatedPayment) {
      return reply.status(404).send({ error: 'Pagamento não encontrado' });
    }
    
    reply.send(updatedPayment);
  } catch (error) {
    console.error('Update payment error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export async function deletePayment(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const { id } = request.params;
    const { clinicId } = getTenantContext(request);
    
    const deleted = await PaymentModel.delete(id, clinicId);
    
    if (!deleted) {
      return reply.status(404).send({ error: 'Pagamento não encontrado' });
    }
    
    reply.send({ success: true });
  } catch (error) {
    console.error('Delete payment error:', error);
    reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}