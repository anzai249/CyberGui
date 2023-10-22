// import { fileURLToPath, URL } from 'node:url'
import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteRequire } from 'vite-require'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteRequire(), nodePolyfills(),
  topLevelAwait({
    // The export name of top-level await promise for each chunk module
    promiseExportName: '__tla',
    // The function to generate import names of top-level await promise in each chunk module
    promiseImportName: i => `__tla_${i}`
  })],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    port: 1108,
    proxy: {
      '/api': {
        target: 'http://localhost:1107',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ws': {
        target: 'http://localhost:1106',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
        ws: true
      }
    }
  },
  preview: {
    port: 1108,
    proxy: {
      '/api': {
        target: 'http://localhost:1107',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ws': {
        target: 'http://localhost:1106',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
        ws: true
      }
    }
  }
})
