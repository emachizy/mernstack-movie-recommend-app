import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  publicDir: "public",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // include file types explicitly
        globIgnores: ["**/node_modules/**/*", "sw.js", "workbox-*.js"],
      },
      manifest: {
        name: "Movie Recommendation App",
        short_name: "MovieApp",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#ff3131",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist", // make sure this matches your deployment output folder
  },
});
