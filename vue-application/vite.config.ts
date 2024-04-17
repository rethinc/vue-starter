/// <reference types="vitest" />
import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueExamples from 'vite-plugin-vue-examples'
import colorizableIcons from './plugins/vite-plugin-colorizable-icons'

export default defineConfig({
  plugins: [
    colorizableIcons({
      colorizableIconsDirectory: 'application/icons/assets/svg-colorizable',
    }),
    vue(),
    vueExamples({
      exampleFileNameSuffix: '.example.vue',
      examplesAppPath: '/examples/',
      globalStylesheetPaths: ['@/assets/styles/global.scss'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
