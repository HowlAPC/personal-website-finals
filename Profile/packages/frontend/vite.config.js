import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Redirects localhost:5173/api to localhost:3000/api
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})