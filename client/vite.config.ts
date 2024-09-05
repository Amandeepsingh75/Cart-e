import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1": "https://cart-e-server.vercel.app",
    },
  },
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps
  },
});
