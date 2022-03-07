import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { pluginIconColorizable } from './vitePlugins/pluginIconColorizable'

export default defineConfig({
  plugins: [pluginIconColorizable(), vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
