import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ViewExample from '../application/viewExample/ViewExample.vue'

createApp(App)
  .use(
    createRouter({
      history: createWebHistory(),
      routes: [{ path: '/:pathMatch(.*)*', component: ViewExample }],
    })
  )
  .mount('#app')
