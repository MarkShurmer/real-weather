import { app } from './app';
import { getSettings } from './settings';

const settings = await getSettings();

try {
  await app.listen({ port: settings.port });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
