import type { AppSettings } from '@settings/settings-types';
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
