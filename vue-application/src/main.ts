import { createApp } from 'vue'
import { router } from '@/application/router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
