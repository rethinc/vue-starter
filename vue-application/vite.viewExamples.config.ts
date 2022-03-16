import { defineConfig } from 'vite'
import colorizableIcons from './vitePlugins/vite-plugin-colorizable-icons'
import vueViewExamples from './vitePlugins/vite-plugin-vue-view-examples'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [
    colorizableIcons(),
    vue(),
    vueViewExamples('./viewExamples/application/examples'),
  ],
  root: 'viewExamples',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
