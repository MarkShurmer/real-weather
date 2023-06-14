import defaultSettings from '@config/default.json';
import prodSettings from '@config/production.json';
import { isDev, isTest } from '@settings';

jest.mock('@common/logger');

describe('Settings', () => {
    describe('isDev', () => {
        it('should be false when test env', () => {
            const result = isDev();

            expect(result).toBeFalsy();
        });

        it('should be false when prod env', async () => {
            process.env.NODE_ENV = 'production';

            const result = isDev();

            expect(result).toBeFalsy();
        });

        it('should be true when dev env', async () => {
            process.env.NODE_ENV = 'development';

            const result = isDev();

            expect(result).toBeTruthy();
        });

        it('should be true when env undefined', async () => {
            delete process.env.NODE_ENV;

            const result = isDev();

            expect(result).toBeTruthy();
        });
    });

    describe('isTest', () => {
        it('should be true when test env', () => {
            process.env.NODE_ENV = 'test';
            const result = isTest();

            expect(result).toBeTruthy();
        });

        it('should be false when prod env', async () => {
            process.env.NODE_ENV = 'production';

            const result = isTest();

            expect(result).toBeFalsy();
        });

        it('should be false when dev env', async () => {
            process.env.NODE_ENV = 'development';

            const result = isTest();

            expect(result).toBeFalsy();
        });
    });

    type BufferEncoding =
        | 'ascii'
        | 'utf8'
        | 'utf-8'
        | 'utf16le'
        | 'ucs2'
        | 'ucs-2'
        | 'base64'
        | 'base64url'
        | 'latin1'
        | 'binary'
        | 'hex';

    describe('App settings', () => {
        beforeEach(async () => {
            jest.resetModules();
        });

        it('should get prod values when env running as prod and use api key', async () => {
            process.env.NODE_ENV = 'production';
            process.env.API_KEY = 'abcd';
            const settingsMod = await import('@settings');

            expect(await settingsMod.getSettings()).toEqual({
                ...prodSettings,
                apiKey: 'abcd',
            });
            delete process.env.API_KEY;
        });

        it('should get default values when env running as undefined', async () => {
            delete process.env.NODE_ENV;

            const settingsMod = await import('@settings');
            await settingsMod.loadSettings();

            expect(await settingsMod.getSettings()).toEqual(defaultSettings);
        });

        it('should get prod values when env running as prod', async () => {
            process.env.NODE_ENV = 'production';

            const settingsMod = await import('@settings');
            await settingsMod.loadSettings();

            expect(await settingsMod.getSettings()).toEqual(prodSettings);
        });

        it('should get default values when env set to garbage', async () => {
            // @ts-expect-error: unassigned value
            process.env.NODE_ENV = 'garbage';

            const settingsMod = await import('@settings');

            expect(await settingsMod.getSettings()).toEqual(defaultSettings);
        });
    });
});
