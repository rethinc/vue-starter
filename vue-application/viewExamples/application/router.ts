import { createRouter, createWebHistory } from 'vue-router'

import ExamplesOverview from './overview/ExamplesOverview.vue'
import ViewExample from './viewExample/ViewExample.vue'
import ExampleNotFound from './viewExample/ExampleNotFound.vue'
import { exampleRoutes } from '@exampleRoutes'

console.log(exampleRoutes[0].path)

export const viewExamplesRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: ExamplesOverview,
      children: [
        {
          path: '/',
          redirect: `/${exampleRoutes[0].path}`,
        },
      ],
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
