import { createApp } from 'vue'
import App from './App.vue'
import { viewExamplesRouter } from './application/router'

createApp(App).use(viewExamplesRouter).mount('#app')
