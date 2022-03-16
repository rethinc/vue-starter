import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import colorizableIcons from './vitePlugins/vite-plugin-colorizable-icons'

export default defineConfig({
  plugins: [colorizableIcons(), vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@exampleRoutes'],
  },
})
