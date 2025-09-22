import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    // On s'assure que le serveur est bien exposé sur le bon port
    host: true, // Équivalent de --host
    strictPort: true,
    port: 5173, 
  },
})