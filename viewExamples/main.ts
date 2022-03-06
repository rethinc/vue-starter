import { createApp } from 'vue'
import App from './App.vue'
import { viewExamplesRouter } from './router'

const app = createApp(App)
app.use(viewExamplesRouter)
app.mount('#app')
