import { createRouter, createWebHistory } from 'vue-router'

import EntryPoint from '@/application/entry-point/EntryPoint.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: EntryPoint,
    },
  ],
})
