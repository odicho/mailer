import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getEmailsHandler, postEmailsHandler } from './';

export function emailsRoutes(app: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
	app.get('/:id', getEmailsHandler);
	app.post('/', postEmailsHandler);

	done();
}
