import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { exampleNodes } from '../examples'
import { createExampleRoutes } from './createExampleRoutes'

const exampleRoutes: RouteRecordRaw[] = createExampleRoutes(exampleNodes)

exampleRoutes.push({ path: '/', redirect: exampleRoutes[0].path })

export const viewExamplesRouter = createRouter({
  history: createWebHistory(),
  routes: exampleRoutes,
})
