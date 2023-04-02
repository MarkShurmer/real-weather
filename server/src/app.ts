import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { mainRoutes } from './main/main-routes';
import { lookupRoutes } from './lookups/lookup-routes';

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(mainRoutes);
app.register(lookupRoutes);

export { app };
