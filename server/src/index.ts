import { app, startApp } from './app';
import { getSettings } from './settings';

const settings = getSettings();

async function startServer() {
    try {
        startApp();
        await app.listen({ port: settings.port });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

startServer();
