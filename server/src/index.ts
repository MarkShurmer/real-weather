import { FastifyInstance } from 'fastify';
import { registerPlugins, logger } from './app';
import { getSettings } from './settings';

async function startServer() {
    try {
        const app = registerPlugins();
        const settings = getSettings();
        await app.listen({ port: settings.port });
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
}

startServer();
