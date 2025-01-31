import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import suidPlugin from "@suid/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools({ autoname: true }),
    suidPlugin(),
    solid(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "client-pwa",
        short_name: "client-pwa",
        description: "PWA version of client",
        theme_color: "#ffffff",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
