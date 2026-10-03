import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),

    federation({
      name: 'shell',

      remotes: {
        product: {
          type: 'module',
          name: 'product',
          entry: 'https://d3oiopgmakh4ga.cloudfront.net/remoteEntry.js',
        },

        order: {
          type: 'module',
          name: 'order',
          entry: 'http://localhost:5175/remoteEntry.js',
        },
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
      port: 5173,
    },
  
})
