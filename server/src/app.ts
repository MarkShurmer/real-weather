import type { FastifyLoggerOptions, RawServerBase } from 'fastify';
import Fastify from 'fastify';
import { mainRoutes } from './main/main-routes';
import { lookupRoutes } from './lookups/lookup-routes';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import { PinoLoggerOptions } from 'fastify/types/logger';

const envToLogger: Record<string, boolean | (FastifyLoggerOptions<RawServerBase> & PinoLoggerOptions)> = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
};

const app = Fastify({
    logger: !process.env.NODE_ENV ? envToLogger['development'] : envToLogger[process.env.NODE_ENV],
});

function registerPlugins() {
    // add our middlewares
    app.register(cors, { origin: ['http://localhost:5173', 'http://weather.shurms.com'] });
    app.register(helmet);

    // now add our routes
    app.register(mainRoutes);
    app.register(lookupRoutes);

    return app;
}

const logger = app.log;

export { registerPlugins, logger, app };
