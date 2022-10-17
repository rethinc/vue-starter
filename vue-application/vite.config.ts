/// <reference types="vitest" />
import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import colorizableIcons from './plugins/vite-plugin-colorizable-icons'
import examples from './plugins/vite-plugin-vue-examples'

export default defineConfig({
  plugins: [
    colorizableIcons({
      colorizableIconsDirectory: 'application/icons/assets/svg-colorizable',
    }),
    vue(),
    examples({
      examplesRootPath: 'src/application',
      exampleFileNameSuffix: '.example.vue',
      globalStyle: `
        @import 'src/assets/styles/global.scss';
      `,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
