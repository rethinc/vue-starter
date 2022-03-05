import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/application/router'

createApp(App).use(router).mount('#app')
