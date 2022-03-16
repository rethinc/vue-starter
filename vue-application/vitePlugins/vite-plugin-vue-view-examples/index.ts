import { PluginOption } from 'vite'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'

export default (examplesPath: string): PluginOption => {
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
        const routeFile = mapExampleFilesToRoutes(examplesPath)
        return `
          ${routeFile.imports.join('\n')}
          export const exampleRoutes = [
            ${routeFile.routes.join(',\n')}
          ]`
      }
    },
  }
}
