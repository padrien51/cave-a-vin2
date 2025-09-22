import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Utilise le polling pour la détection des changements de fichiers
      usePolling: true,
    },
  },
})