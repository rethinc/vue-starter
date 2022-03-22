import { createApp } from 'vue'
import App from '@examples/IFrameApp.vue'
import { viewExamplesIFrameRouter } from './application/router'

createApp(App).use(viewExamplesIFrameRouter).mount('#app')
