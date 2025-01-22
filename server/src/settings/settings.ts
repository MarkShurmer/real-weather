import type { AppSettings } from '@settings/settings-types';

export function getSettings(): AppSettings {
    return {
        port: parseInt(process.env.PORT ?? '3000'),
        host: process.env.HOST ?? 'localhost',
        apiKey: process.env.API_KEY ?? '<tobefilled>',
    };
}

export function isDev() {
    return process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development';
}

export function isTest() {
    return process.env.NODE_ENV === 'test';
}

export function isProd() {
    return process.env.NODE_ENV === 'production';
}
