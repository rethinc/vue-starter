import { defineConfig } from 'vite'
import appConfig from './vite.config'

export default defineConfig({
  ...appConfig,
  root: 'view-examples',
  publicDir: '../public',
})
