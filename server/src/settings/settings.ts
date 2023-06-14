import type { AppSettings } from '@settings/settings-types';
import { logger } from '@common/logger';
import defaultSettings from '@config/default.json';
import prodSettings from '@config/production.json';

let appSettings: AppSettings;

export function getSettings() {
    if (!appSettings) {
        loadSettings();
    }

    return appSettings;
}

export function loadSettings() {
    appSettings = (isProd() ? prodSettings : defaultSettings) as AppSettings;

    // manual update
    appSettings.apiKey = process.env.API_KEY ?? '<tobefilled>';

    logger.info(`Loaded settings for ${process.env.NODE_ENV}`);
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
