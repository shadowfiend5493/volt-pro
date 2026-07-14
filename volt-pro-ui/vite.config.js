import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Browser calls /api on Vite; Vite forwards it to Spring Boot to avoid local CORS issues.
      '/api': 'http://localhost:8080',
    },
  },
})
