import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      manifest: {
        name: 'জিসান ট্রেডার্স',
        short_name: 'জিসান',
        description: 'বগুড়ার বিশ্বহরিগাছা বাজারে অবস্থিত জিসান ট্রেডার্স। নির্মাণ সামগ্রী ও দৈনন্দিন প্রয়োজনীয় পণ্য।',
        theme_color: '#10b981',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'https://api.dicebear.com/7.x/initials/svg?seed=JT&backgroundColor=10b981&color=ffffff',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: 'https://api.dicebear.com/7.x/initials/svg?seed=JT&backgroundColor=10b981&color=ffffff',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
