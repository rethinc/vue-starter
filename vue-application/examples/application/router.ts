import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ExampleNotFound from './ExampleNotFound.vue'

export const viewExamplesRouter = (exampleRoutes: RouteRecordRaw[]) => {
  return createRouter({
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
}
