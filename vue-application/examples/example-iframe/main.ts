import { createApp } from 'vue'
import { globalPlugins } from '@examples/globalPlugins'
import App from './App.vue'
import { viewExamplesIFrameRouter } from './application/router'
import '@examples/global.scss'

const app = createApp(App).use(viewExamplesIFrameRouter)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalPlugins.forEach((plugin) => {
  app.use(plugin)
})
app.mount('#app')
