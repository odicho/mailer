import fastify from 'fastify';
import { registerRoutes } from './utils/routes';

export const server = fastify();

server.get('/ping', async (_, reply) => {
	return reply.status(200).send('pong');
});

registerRoutes(server);
