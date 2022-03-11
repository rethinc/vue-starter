import { createApp } from 'vue'
import App from './App.vue'
import { viewExamplesRouter } from './application/router'

const app = createApp(App)
app.use(viewExamplesRouter)
app.mount('#app')
