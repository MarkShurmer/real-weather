import { Routes } from '@common/routes';
import type { FastifyInstance } from 'fastify';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function mainRoutes(fastify: FastifyInstance) {
    await fastify.get(Routes.Root, () => {
        return 'Hello from real weather api';
    });

    await fastify.get(Routes.Health, () => {
        return {};
    });
}
