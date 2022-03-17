import { PluginOption, ViteDevServer } from 'vite'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'
import * as path from 'path'

export default (examplesPath: string): PluginOption => {
  const virtualModuleId = '@exampleRoutes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  const absoluteExamplePath = path.resolve(examplesPath)

  return {
    name: 'vue-view-examples',
    configureServer: (server: ViteDevServer) => {
      server.watcher.on('all', async (event, changedFilePath) => {
        if (
          ['add', 'unlink'].includes(event) &&
          changedFilePath.startsWith(absoluteExamplePath)
        ) {
          const module = server.moduleGraph.getModuleById(
            resolvedVirtualModuleId
          )
          if (module) {
            server.moduleGraph.invalidateModule(module)
            server.ws.send({ type: 'full-reload' })
          }
        }
      })
    },
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
