import react from '@vitejs/plugin-react';
import { defineConfig, UserConfigExport } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { ViteUserConfig as VitestUserConfigInterface } from 'vitest/config';

type ViteConfig = UserConfigExport & Pick<VitestUserConfigInterface, 'test'>;
const vitestConfig: ViteConfig = {
  test: {
    environment: 'jsdom',
    setupFiles: './test-utils/vitest.setup.ts',
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/*.ts?', '**/*-types.ts'],
      reporter: [['text', { file: './coverage.txt' }], 'json'],
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  },
};

const config: ViteConfig = {
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  test: vitestConfig.test,
};

export default defineConfig(config);
