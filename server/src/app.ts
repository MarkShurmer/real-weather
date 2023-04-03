import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { mainRoutes } from './main/main-routes';
import { lookupRoutes } from './lookups/lookup-routes';

const app: FastifyInstance = await Fastify({
  logger: true,
});

await app.register(mainRoutes);
await app.register(lookupRoutes);

export { app };
