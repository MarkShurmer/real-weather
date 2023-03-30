import * as settings from 'settings';
import defaultSettings from '@config/default.json';
import testSettings from '@config/test.json';
import prodSettings from '@config/production.json';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('common/logger');

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

  describe('App settings', () => {
    //let settingsMod: typeof settings;

    beforeEach(async () => {
      vi.resetModules();
    });

    it('should get test values when env running as test', async () => {
      process.env.NODE_ENV = 'test';
      const settingsMod = await import('settings');
      await settingsMod.loadSettings();

      expect(await settings.getSettings()).toEqual(testSettings);
    });

    it('should get default values when env running as undefined', async () => {
      delete process.env.NODE_ENV;
      const settingsMod = await import('settings');
      await settingsMod.loadSettings();

      expect(await settings.getSettings()).toEqual(defaultSettings);
    });

    it('should get prod values when env running as prod', async () => {
      process.env.NODE_ENV = 'production';
      const settingsMod = await import('settings');
      await settingsMod.loadSettings();

      expect(await settings.getSettings()).toEqual(prodSettings);
    });

    it('should get default values when env set to garbage', async () => {
      process.env.NODE_ENV = 'garbage';
      const settingsMod = await import('settings');
      await settingsMod.loadSettings();

      expect(await settings.getSettings()).toEqual(defaultSettings);
    });
  });
});
