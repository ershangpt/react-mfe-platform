import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),

    federation({
      name: 'order',

      exposes: {
        './OrderApp': './src/OrderApp.tsx',
      },

      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),

    
  ],
  server: {
      port: 5175,
    },
});