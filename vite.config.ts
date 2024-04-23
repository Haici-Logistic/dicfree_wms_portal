import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import banner from '@jswork/vite-plugin-html-banner';
import pkg from './package.json';
import dayjs from 'dayjs';

const externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'antd': 'antd',
  'dayjs': 'dayjs',
  '@ant-design/icons': 'icons'
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    banner(),
    VitePWA({
      workbox: {
        globIgnores: ['*/fallback.js'],
        ignoreURLParametersMatching: [/^utm_/, /^v$/],
        navigateFallbackDenylist: [/^\/api/, /^\/upload/, /^\/index\.html/, /^\/web-assets/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdnjs-scripts'
            }
          },
          {
            urlPattern: /^https:\/\/unpkg\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-scripts',
              cacheableResponse: {
                statuses: [0, 200, 302] // Make sure 0 is included in this list.
              }
            }
          },
          {
            urlPattern: /^https:\/\/tva1\.js\.work/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tva1-images',
              cacheableResponse: {
                statuses: [0, 200] // Make sure 0 is included in this list.
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.dicfree\.cn\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'dicfree-assets'
            }
          }
        ]
      }
    }),
    viteExternalsPlugin(externals)
  ],
  define: {
    'process.env': {
      VERSION: pkg.gtcVersion,
      BUILD_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://111.229.34.137:9082',
        changeOrigin: true
      },
      '/upload': {
        target: 'https://wms-beta.dicfree.cn',
        changeOrigin: true
      }
    }
  },
  build: {
    // sourcemap: true,
    rollupOptions: {
      // plugins: [visualizer()],
      external: ['react', 'react-dom', 'antd', '@ant-design/icons', 'dayjs'],
      output: {
        format: 'umd',
        globals: externals
      }
    }
  }
});
