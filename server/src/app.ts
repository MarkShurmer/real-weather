import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { mainRoutes } from './main-routes';

const app: FastifyInstance = Fastify({
  logger: process.env.NODE_ENV === 'development',
});

app.register(mainRoutes);

export { app };
