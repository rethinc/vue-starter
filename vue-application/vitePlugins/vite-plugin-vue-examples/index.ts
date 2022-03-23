import { PluginOption, ViteDevServer } from 'vite'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'
import * as path from 'path'

export interface ViewExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
  globalStyle?: string
}

export default (
  configuration: ViewExamplesPluginConfiguration
): PluginOption => {
  const resolvedConfiguration = {
    ...configuration,
    rootExamplesPath: path.isAbsolute(configuration.examplesRootPath)
      ? configuration.examplesRootPath
      : path.resolve(configuration.examplesRootPath),
    globalStyle: configuration.globalStyle ?? '',
  }
  const exampleRoutesId = '@examples/routes'
  const resolvedExampleRoutesId = '\0' + exampleRoutesId
  const exampleGlobalScss = '@examples/global.scss'

  return {
    name: 'vue-examples',
    configureServer: (server: ViteDevServer) => {
      server.watcher.add(resolvedConfiguration.rootExamplesPath)
      server.watcher.on('all', async (event, changedFilePath) => {
        if (
          ['add', 'unlink'].includes(event) &&
          changedFilePath.startsWith(resolvedConfiguration.rootExamplesPath) &&
          changedFilePath.endsWith(configuration.exampleFileNameSuffix)
        ) {
          const module = server.moduleGraph.getModuleById(
            resolvedExampleRoutesId
          )
          if (module) {
            server.moduleGraph.invalidateAll()
            server.ws.send({ type: 'full-reload' })
          }
        }
      })
    },
    resolveId(id) {
      if (id === exampleRoutesId) {
        return resolvedExampleRoutesId
      }
      if (id === exampleGlobalScss) {
        return exampleGlobalScss
      }
    },
    load(id) {
      if (id === resolvedExampleRoutesId) {
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
      if (id === exampleGlobalScss) {
        return resolvedConfiguration.globalStyle
      }
    },
  }
}
