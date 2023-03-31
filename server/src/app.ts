import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { mainRoutes } from './main/main-routes';

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(mainRoutes);

export { app };
