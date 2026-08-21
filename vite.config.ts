import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            icons: ['lucide-react'],
            motion: ['motion'],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: true as any,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/*.exe', '**/*.zip', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/public/**', '**/flutter_app/**', '**/node_modules/**', '**/.git/**'],
      },
    },
  };
});