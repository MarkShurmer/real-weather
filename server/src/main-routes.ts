import type { FastifyInstance } from 'fastify';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function mainRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return 'Hello from real weather api';
  });

  fastify.get('/health', async () => {
    return {};
  });
}
