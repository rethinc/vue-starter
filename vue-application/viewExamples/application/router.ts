import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ExamplesOverview from './overview/ExamplesOverview.vue'
import { exampleRoutes } from '@exampleRoutes'

const firstExampleRoute = exampleRoutes[0]
const redirectRoute: RouteRecordRaw[] = firstExampleRoute
  ? [
      {
        path: '/',
        redirect: exampleRoutes[0].path,
      },
    ]
  : []

export const viewExamplesRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: ExamplesOverview,
    },
    ...redirectRoute,
  ],
})
