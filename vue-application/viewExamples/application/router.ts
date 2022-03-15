import { createRouter, createWebHistory } from 'vue-router'

import ExamplesOverview from './overview/ExamplesOverview.vue'
import ViewExample from './viewExample/ViewExample.vue'
import ExampleNotFound from './viewExample/ExampleNotFound.vue'
import IconViewExample from '../examples/shared/IconViewExample.vue'

export const viewExamplesRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: ExamplesOverview,
      children: [
        {
          path: '/',
          redirect: '/application/shared/icons',
        },
      ],
    },
    {
      path: '/viewExample',
      component: ViewExample,
      children: [
        {
          path: 'application/shared/icons',
          component: IconViewExample,
        },
        {
          path: ':pathMatch(.*)*',
          component: ExampleNotFound,
        },
      ],
    },
  ],
})
