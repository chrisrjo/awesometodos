import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Add "-swc" to the end here

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})