import react from '@vitejs/plugin-react';
import { defineConfig, UserConfigExport } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
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
    },
  },
} as UserConfigExport);
