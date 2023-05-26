import type { AppSettings } from 'src/settings/settings-types';
import { logger } from '@common/logger';

export let appSettings: AppSettings;

export function getSettings() {
    if (!appSettings) {
        loadSettings();
    }

    return appSettings;
}

export function loadSettings() {
    if (process.env.NODE_ENV === 'test') {
        appSettings = {
            apiKey: 'key1',
            observationsSitesUrl: 'obs_sites_url',
            observationsUrl: 'obs_url',
            postCodeInfoUrl: 'post_url',
        };
    } else {
        appSettings = {
            apiKey: process.env.API_KEY,
            observationsSitesUrl: process.env.OBSERVATIONS_SITES_URL,
            observationsUrl: process.env.OBSERVATIONS_URL,
            postCodeInfoUrl: process.env.POSTCODE_INFO_URL,
        };
    }

    logger.info(`Loaded settings for ${process.env.NODE_ENV}`);
}
