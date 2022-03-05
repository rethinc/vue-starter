import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SelectedExampleIFrameView from './view-examples-content/SelectedExampleIFrameView.vue'
import { examples } from './examples'

const routes: RouteRecordRaw[] = []

examples.forEach((exampleComponents, path) => {
  exampleComponents.forEach((example) => {
    routes.push({
      path: `/${path}/${example.name}`,
      component: SelectedExampleIFrameView,
      props: { selectedExample: { path, name: example.name } },
    })
  })
})

routes.push({ path: '', redirect: routes[0].path })

export const viewExamplesRouter = createRouter({
  history: createWebHistory(),
  routes: routes,
})
