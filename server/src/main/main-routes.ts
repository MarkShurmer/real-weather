import { Routes } from 'common/routes';
import type { FastifyInstance } from 'fastify';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export function mainRoutes(fastify: FastifyInstance) {
  fastify.get(Routes.Root, () => {
    return 'Hello from real weather api';
  });

  fastify.get(Routes.Health, () => {
    return {};
  });
}
