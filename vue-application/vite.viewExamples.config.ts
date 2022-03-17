import { defineConfig } from 'vite'
import colorizableIcons from './vitePlugins/vite-plugin-colorizable-icons'
import vueViewExamples from './vitePlugins/vite-plugin-vue-view-examples'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [
    colorizableIcons({
      colorizableIconsDirectory:
        'application/shared/icons/assets/svg-colorizable',
    }),
    vue(),
    vueViewExamples({
      rootExamplesPath: 'src/application',
      exampleFileNameSuffix: '.example.vue',
    }),
  ],
  root: 'viewExamples',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
