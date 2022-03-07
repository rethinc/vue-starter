import { defineConfig } from 'vite'
import appConfig from './vite.config'

export default defineConfig({
  ...appConfig,
  root: 'viewExamples',
  publicDir: '../public',
})
