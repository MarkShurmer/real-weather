import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { mainRoutes } from './main/main-routes';
import { lookupRoutes } from './lookups/lookup-routes';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';

const app: FastifyInstance = await Fastify({
    logger: true,
});

// add our middlewares
await app.register(cors, { origin: ['http://localhost:5173'] });
await app.register(helmet);

// now add our routes
await app.register(mainRoutes);
await app.register(lookupRoutes);

export { app };
