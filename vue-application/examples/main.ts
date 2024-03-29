import { createApp } from 'vue'
import App from './App.vue'
import { viewExamplesRouter } from './application/router'
import '@examples/global.scss'

createApp(App).use(viewExamplesRouter).mount('#app')
