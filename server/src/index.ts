import { registerPlugins, logger } from './app';
import { getSettings } from './settings';
import { config } from 'dotenv-flow';

async function startServer() {
    try {
        config();
        const app = registerPlugins();
        const settings = getSettings();
        await app.listen({ port: settings.port, host: settings.host });
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
}

startServer();
