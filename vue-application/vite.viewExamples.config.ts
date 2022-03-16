import { defineConfig } from 'vite'
import { pluginIconColorizable } from './vitePlugins/pluginIconColorizable'
import viewExamples from './vitePlugins/vite-plugin-vue-view-examples'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [pluginIconColorizable(), viewExamples(), vue()],
  root: 'viewExamples',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
