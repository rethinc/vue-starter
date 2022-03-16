import { PluginOption } from 'vite'

export default (): PluginOption => {
  const virtualModuleId = '@exampleRoutes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vue-view-examples',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
import IconViewExample from './viewExamples/examples/shared/IconViewExample.vue'
export const exampleRoutes = [
  {
    path: 'application/shared/icons',
    component: IconViewExample,
  },
]`
      }
    },
  }
}
