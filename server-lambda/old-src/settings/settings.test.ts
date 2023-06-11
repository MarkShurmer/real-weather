import * as settings from 'settings';
import defaultSettings from '@config/default.json';
import testSettings from '@config/test.json';
import prodSettings from '@config/production.json';
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { readFile } from 'fs/promises';
import { PathLike } from 'node:fs';

vi.mock('common/logger');
vi.mock('fs/promises');

describe('Settings', () => {
  describe('isDev', () => {
    it('should be false when test env', () => {
      const result = settings.isDev();

      expect(result).toBeFalsy();
    });

    it('should be false when prod env', async () => {
      process.env.NODE_ENV = 'production';

      const result = settings.isDev();

      expect(result).toBeFalsy();
    });

    it('should be true when dev env', async () => {
      process.env.NODE_ENV = 'development';

      const result = settings.isDev();

      expect(result).toBeTruthy();
    });

    it('should be true when env undefined', async () => {
      delete process.env.NODE_ENV;

      const result = settings.isDev();

      expect(result).toBeTruthy();
    });
  });

  describe('isTest', () => {
    it('should be true when test env', () => {
      process.env.NODE_ENV = 'test';
      const result = settings.isTest();

      expect(result).toBeTruthy();
    });

    it('should be false when prod env', async () => {
      process.env.NODE_ENV = 'production';

      const result = settings.isTest();

      expect(result).toBeFalsy();
    });

    it('should be false when dev env', async () => {
      process.env.NODE_ENV = 'development';

      const result = settings.isTest();

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
    const mockedReadFile =
      // eslint-disable-next-line no-unused-vars
      vi.mocked<(path: PathLike, enc: BufferEncoding) => Promise<string>>(
        readFile
      );

    beforeAll(() => {
      mockedReadFile.mockResolvedValue(JSON.stringify(defaultSettings));
    });

    beforeEach(async () => {
      vi.resetModules();
    });

    it('should get test values when env running as test', async () => {
      process.env.NODE_ENV = 'test';
      mockedReadFile.mockResolvedValueOnce(JSON.stringify(testSettings));
      const settingsMod = await import('settings');

      expect(await settingsMod.getSettings()).toEqual(testSettings);
    });

    it('should get test values when env running as test and use api key', async () => {
      process.env.NODE_ENV = 'test';
      process.env.API_KEY = 'abcd';
      mockedReadFile.mockResolvedValueOnce(JSON.stringify(testSettings));
      const settingsMod = await import('settings');

      expect(await settingsMod.getSettings()).toEqual({
        ...testSettings,
        apiKey: 'abcd',
      });
      delete process.env.API_KEY;
    });

    it('should get default values when env running as undefined', async () => {
      delete process.env.NODE_ENV;
      mockedReadFile.mockResolvedValueOnce(JSON.stringify(defaultSettings));
      const settingsMod = await import('settings');
      await settingsMod.loadSettings();

      expect(await settingsMod.getSettings()).toEqual(defaultSettings);
    });

    it('should get prod values when env running as prod', async () => {
      process.env.NODE_ENV = 'production';
      mockedReadFile.mockResolvedValueOnce(JSON.stringify(prodSettings));
      const settingsMod = await import('settings');
      await settingsMod.loadSettings();

      expect(await settingsMod.getSettings()).toEqual(prodSettings);
    });

    it('should get default values when env set to garbage', async () => {
      // @ts-expect-error: unassigned value
      process.env.NODE_ENV = 'garbage';
      mockedReadFile.mockResolvedValueOnce(JSON.stringify(defaultSettings));
      const settingsMod = await import('settings');

      expect(await settingsMod.getSettings()).toEqual(defaultSettings);
    });

    it('should get error when cannot load config', async () => {
      // @ts-expect-error: undefined where shouldnt be
      mockedReadFile.mockResolvedValue(undefined);

      await expect(async () => {
        await settings.loadSettings();
      }).rejects.toThrowError('Unable to load settings for garbage');
    });

    it('should get error when cannot load config due to exception', async () => {
      process.env.NODE_ENV = 'test';
      mockedReadFile.mockRejectedValue(new Error('A new error'));
      const settingsMod = await import('settings');

      await expect(async () => {
        await settingsMod.getSettings();
      }).rejects.toThrowError('Unable to load settings for test');
    });
  });
});
