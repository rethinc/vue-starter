import { createApp } from 'vue'
import App from './App.vue'
import { viewExamplesIFrameRouter } from './application/router'

import '@examples/global.scss'

createApp(App).use(viewExamplesIFrameRouter).mount('#app')
