// vite.config.js

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@fortawesome/fontawesome-free': resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free')
    }
  }
});
