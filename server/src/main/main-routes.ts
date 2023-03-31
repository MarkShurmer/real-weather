import { Routes } from 'common/routes';
import type { FastifyInstance } from 'fastify';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function mainRoutes(fastify: FastifyInstance) {
  fastify.get(Routes.Root, async () => {
    return 'Hello from real weather api';
  });

  fastify.get(Routes.Health, async () => {
    return {};
  });
}
