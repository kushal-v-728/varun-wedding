import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Root base: fonts & images live in /public. See README for sub-path hosting.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // The Arena preview proxy serves the app from a *.e2b.app host.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
});
