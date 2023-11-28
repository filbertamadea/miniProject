// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      // strategies: 'generateSW',
      srcDir: 'src',
      filename: 'sw.js',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/6564bb89ceac41c0761eba72.mockapi.io\/api\/miniproject/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'mockapi-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 3 // <== 3 second for dev only
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              backgroundSync: {
              name: 'miniProjectQueue',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          },
        ],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'MiniProject',
        short_name: 'MP',
        description: 'Description of MiniProject',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
