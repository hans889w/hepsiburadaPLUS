import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_', // VITE_ önekli değişkenleri tanımlar
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://api.hepsiburada.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist', // Firebase Hosting ile uyumlu olsun
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('components')) {
            return 'components';
          }
        },
      },
    },
  },
});