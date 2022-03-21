import { createApp } from 'vue'
import App from './App.vue'
import { viewExamplesIFrameRouter } from './application/router'

createApp(App).use(viewExamplesIFrameRouter).mount('#app')
