import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { UserConfigExport } from 'vitest/config';

const config: UserConfigExport = defineConfig({
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
  test: {
    globals: true,
    environment: 'jsdom',
    sourceMap: true,
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
});

export default config;
