import { defineConfig } from 'vite'
import colorizableIcons from './vitePlugins/vite-plugin-colorizable-icons'
import vueViewExamples from './vitePlugins/vite-plugin-vue-view-examples'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [
    colorizableIcons(),
    vue(),
    vueViewExamples('src/application', '.example.vue'),
  ],
  root: 'viewExamples',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
