import { isDev, isTest, getSettings, isProd } from '@settings';

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

    describe('isProd', () => {
        it('should be false when test env', () => {
            process.env.NODE_ENV = 'test';
            const result = isProd();

            expect(result).toBeFalsy();
        });

        it('should be true when prod env', async () => {
            process.env.NODE_ENV = 'production';

            const result = isProd();

            expect(result).toBeTruthy();
        });

        it('should be false when dev env', async () => {
            process.env.NODE_ENV = 'development';

            const result = isProd();

            expect(result).toBeFalsy();
        });
    });

    describe('App settings', () => {
        // beforeEach(() => {
        //     jest.resetModules();
        // });

        it('should get env values', async () => {
            process.env.NODE_ENV = 'production';
            process.env.PORT = '4000';
            process.env.API_KEY = 'the.key';
            process.env.HOST = 'host.abcd';

            expect(getSettings()).toEqual({
                port: 4000,
                host: 'host.abcd',
                apiKey: 'the.key',
            });
        });

        it('should get default values when env has no values', async () => {
            delete process.env.NODE_ENV;
            delete process.env.PORT;
            delete process.env.API_KEY;
            delete process.env.HOST;

            expect(await getSettings()).toEqual({
                port: 3000,
                host: 'localhost',
                apiKey: '<tobefilled>',
            });
        });

        // it('should get default values when env running as undefined', async () => {
        //     delete process.env.NODE_ENV;

        //     const settingsMod = await import('@settings');
        //     await settingsMod.loadSettings();

        //     expect(await settingsMod.getSettings()).toEqual(defaultSettings);
        // });

        // it('should get prod values when env running as prod', async () => {
        //     process.env.NODE_ENV = 'production';

        //     const settingsMod = await import('@settings');
        //     await settingsMod.loadSettings();

        //     expect(await settingsMod.getSettings()).toEqual(prodSettings);
        // });

        // it('should get default values when env set to garbage', async () => {
        //     // @ts-expect-error: unassigned value
        //     process.env.NODE_ENV = 'garbage';

        //     const settingsMod = await import('@settings');

        //     expect(await settingsMod.getSettings()).toEqual(defaultSettings);
        // });
    });
});
