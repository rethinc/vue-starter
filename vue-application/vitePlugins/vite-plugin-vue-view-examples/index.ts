import { PluginOption, ViteDevServer } from 'vite'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'
import * as path from 'path'

export default (rootExamplesPath: string): PluginOption => {
  const virtualModuleId = '@exampleRoutes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  const absoluteRootExamplePath = path.isAbsolute(rootExamplesPath)
    ? rootExamplesPath
    : path.resolve(rootExamplesPath)

  return {
    name: 'vue-view-examples',
    configureServer: (server: ViteDevServer) => {
      server.watcher.add(absoluteRootExamplePath)
      server.watcher.on('all', async (event, changedFilePath) => {
        if (
          ['add', 'unlink'].includes(event) &&
          changedFilePath.startsWith(absoluteRootExamplePath)
        ) {
          const module = server.moduleGraph.getModuleById(
            resolvedVirtualModuleId
          )
          if (module) {
            server.moduleGraph.invalidateAll()
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
        const routeFile = mapExampleFilesToRoutes(absoluteRootExamplePath)
        return `
          ${routeFile.imports.join('\n')}
          export const exampleRoutes = [
            ${routeFile.routes.join(',\n')}
          ]`
      }
    },
  }
}
