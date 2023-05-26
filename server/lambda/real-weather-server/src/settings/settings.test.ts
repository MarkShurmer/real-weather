import { AppSettings } from './settings-types';

jest.mock('@common/logger');

describe('Settings', () => {
    beforeEach(async () => {
        jest.resetModules();
    });

    it('should get from env vars', async () => {
        const settingsMod = await import('@settings');

        expect(settingsMod.getSettings()).toEqual({
            apiKey: 'key1',
            observationsSitesUrl: 'obs_sites_url',
            observationsUrl: 'obs_url',
            postCodeInfoUrl: 'post_url',
        } as AppSettings);
    });

    it('should get from env vars when diff node env', async () => {
        process.env.NODE_ENV = 'dev';
        process.env.API_KEY = 'key2';
        process.env.OBSERVATIONS_SITES_URL = 'sites2';
        process.env.OBSERVATIONS_URL = 'obs2';
        process.env.POSTCODE_INFO_URL = 'posts2';

        const settingsMod = await import('@settings');

        expect(await settingsMod.getSettings()).toEqual({
            apiKey: 'key2',
            observationsSitesUrl: 'sites2',
            observationsUrl: 'obs2',
            postCodeInfoUrl: 'posts2',
        } as AppSettings);
    });
});
