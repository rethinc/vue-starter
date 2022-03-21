import { PluginOption, ViteDevServer } from 'vite'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'
import * as path from 'path'

export interface ViewExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
}

export default (
  configuration: ViewExamplesPluginConfiguration
): PluginOption => {
  const virtualModuleId = '@exampleRoutes'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  const resolvedConfiguration = {
    ...configuration,
    rootExamplesPath: path.isAbsolute(configuration.examplesRootPath)
      ? configuration.examplesRootPath
      : path.resolve(configuration.examplesRootPath),
  }

  return {
    name: 'vue-view-examples',
    configureServer: (server: ViteDevServer) => {
      server.watcher.add(resolvedConfiguration.rootExamplesPath)
      server.watcher.on('all', async (event, changedFilePath) => {
        if (
          ['add', 'unlink'].includes(event) &&
          changedFilePath.startsWith(resolvedConfiguration.rootExamplesPath) &&
          changedFilePath.endsWith(configuration.exampleFileNameSuffix)
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
        const routeFile = mapExampleFilesToRoutes(
          resolvedConfiguration.rootExamplesPath,
          configuration.exampleFileNameSuffix
        )
        return `
          ${routeFile.imports.join('\n')}
          export const exampleRoutes = [
            ${routeFile.routes.join(',\n')}
          ]`
      }
    },
  }
}
