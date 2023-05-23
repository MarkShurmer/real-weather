import pino from 'pino';

export const logger = pino({
  name: 'Real weather',
  level: 'debug',
});
