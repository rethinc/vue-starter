import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router'
import { exampleRoutes } from '@examples/routes'
import ExamplesOverview from './overview/ExamplesOverview.vue'

const firstExampleRoute = exampleRoutes[0]

export const viewExamplesRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: ExamplesOverview,
      beforeEnter: (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
      ) => {
        const exampleRoute = to.query.exampleRoute
        if (firstExampleRoute && !exampleRoute) {
          next({
            path: to.path,
            query: { exampleRoute: firstExampleRoute.path },
          })
          return
        }
        next()
      },
    },
  ],
})
