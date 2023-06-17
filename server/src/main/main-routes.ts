import { Routes } from '@common/routes';
import { logger } from '@common/logger';
import type { FastifyInstance } from 'fastify';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */
export async function mainRoutes(fastify: FastifyInstance) {
    logger.info('Adding main routes');

    await fastify.get(Routes.Root, () => {
        return 'Hello from real weather api';
    });

    await fastify.get(Routes.Health, () => {
        return {};
    });
}
