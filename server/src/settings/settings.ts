import type { AppSettings } from 'src/settings/settings-types';
import fs from 'fs/promises';
import { logger } from 'common/logger';

let appSettings: AppSettings;

async function getFile(fileName: string): Promise<string | null> {
    try {
        return await fs.readFile(`config/${fileName}`, 'utf-8');
    } catch (err: unknown) {
        return null;
    }
}

export async function getSettings() {
    if (!appSettings) {
        await loadSettings();
    }

    return appSettings;
}

export async function loadSettings() {
    // uses current NODE_ENV to load settings

    const settings = (await getFile(`${process.env.NODE_ENV}.json`)) ?? (await getFile(`default.json`));

    if (!settings) {
        throw new Error(`Unable to load settings for ${process.env.NODE_ENV}`);
    }

    appSettings = JSON.parse(settings);

    logger.info(`Loaded settings for ${process.env.NODE_ENV}`);
}

export function isDev() {
    return process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development';
}

export function isTest() {
    return process.env.NODE_ENV === 'test';
}
