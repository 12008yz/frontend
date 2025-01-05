import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    polyfills: ['polyfills.js'],
  },
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/': '' },
      },
    },
    cors: true,
  },
});