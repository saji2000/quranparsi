import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Optional: how service worker is registered
      workbox: {
        // Workbox options (see Workbox docs for details)
      },
      manifest: {
        name: "Quran Parsi",
        short_name: "Quran",
        description: "Quran's translation in Persian",
        theme_color: "#ffffff",
        icons: [
          {
            src: "./src/assets/react.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          // ... add other icon sizes
        ],
      },
    }),
  ],
});
