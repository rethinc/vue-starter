import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ExamplesOverview from './overview/ExamplesOverview.vue'
import ViewExample from './viewExample/ViewExample.vue'
import ExampleNotFound from './viewExample/ExampleNotFound.vue'
import { exampleRoutes } from '@exampleRoutes'

const firstExampleRoute = exampleRoutes[0]
const rootChildren: RouteRecordRaw[] = firstExampleRoute
  ? [
      {
        path: '/',
        redirect: `/${exampleRoutes[0].path}`,
      },
    ]
  : []

export const viewExamplesRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: ExamplesOverview,
      children: rootChildren,
    },
    {
      path: '/viewExampleIFrame',
      component: ViewExample,
      children: [
        ...exampleRoutes,
        {
          path: ':pathMatch(.*)*',
          component: ExampleNotFound,
        },
      ],
    },
  ],
})
