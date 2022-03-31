import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router'
import { exampleRoutes } from '@examples/routes'
import ExampleNotFound from './viewExample/ExampleNotFound.vue'

export const viewExamplesIFrameRouter = createRouter({
  history: createWebHistory(),
  routes: [
    ...exampleRoutes,
    {
      path: '/:pathMatch(.*)*',
      component: ExampleNotFound,
      beforeEnter: (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
      ) => {
        const route = to.query.exampleRoute as string | undefined
        if (route) {
          next(route)
        } else {
          next()
        }
      },
    },
  ],
})
