import { createRouter, createWebHashHistory } from 'vue-router'
import { exampleRoutes } from 'virtual:vue-examples-routes'
import ExampleNotFound from './ExampleNotFound.vue'

export const viewExamplesRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: exampleRoutes.length > 0 ? exampleRoutes[0].path : '',
      children: [
        ...exampleRoutes,
        {
          path: '/:pathMatch(.*)*',
          component: ExampleNotFound,
        },
      ],
    },
  ],
})
