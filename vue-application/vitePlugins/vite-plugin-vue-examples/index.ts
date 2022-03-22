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
  const resolvedConfiguration = {
    ...configuration,
    rootExamplesPath: path.isAbsolute(configuration.examplesRootPath)
      ? configuration.examplesRootPath
      : path.resolve(configuration.examplesRootPath),
  }
  const exampleRoutesId = '@examples/routes'

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
          const module = server.moduleGraph.getModuleById(exampleRoutesId)
          if (module) {
            server.moduleGraph.invalidateAll()
            server.ws.send({ type: 'full-reload' })
          }
        }
      })
    },
    resolveId(id) {
      if (id === exampleRoutesId) {
        return exampleRoutesId
      }
    },
    load(id) {
      if (id === exampleRoutesId) {
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
