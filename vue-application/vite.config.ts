import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import colorizableIcons from './vitePlugins/vite-plugin-colorizable-icons'
import examples from './vitePlugins/vite-plugin-vue-examples'

export default defineConfig({
  plugins: [
    colorizableIcons({
      colorizableIconsDirectory:
        'application/shared/icons/assets/svg-colorizable',
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
  optimizeDeps: {
    exclude: ['@examples/routes'],
  },
})
