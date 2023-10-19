import type { FastifyReply, FastifyRequest } from 'fastify';
import { getEmails, postEmails } from './';
import { getError } from '../../utils/getError';

export async function getEmailsHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const response = await getEmails(id);

    return reply.code(200).send(response);
  } catch (error) {
    const { statusCode, message } = getError(error);
    return reply.code(statusCode).send(message);
  }
}

export async function postEmailsHandler(
  request: FastifyRequest<{ Body: { example: string } }>,
  reply: FastifyReply,
) {
  try {
    const { example } = request.body;
    const data = await postEmails(example);

    return reply.code(200).send(data);
  } catch (error) {
    const { statusCode, message } = getError(error);
    return reply.code(statusCode).send(message);
  }
}
