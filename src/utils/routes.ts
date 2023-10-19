import type { FastifyInstance } from 'fastify/types/instance';
import { emailsRoutes } from '../api/emails';

export function registerRoutes(app: FastifyInstance) {
  app.register(emailsRoutes, {
    prefix: 'uxr-cal/emails',
  });
}
