import * as path from 'path'
import { PluginOption, ViteDevServer } from 'vite'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'

export interface GlobalPluginConfiguration {
  name: string
  path: string
}

export interface ViewExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
  globalStyle?: string
  globalPlugins?: GlobalPluginConfiguration[]
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
    globalPlugins: configuration.globalPlugins ?? [],
  }
  const routesId = '@examples/routes'
  const resolvedRoutesId = '\0' + routesId
  const globalScssId = '@examples/global.scss'
  const globalPluginsId = '@examples/globalPlugins'
  const resolvedGlobalPluginsId = '\0' + globalPluginsId

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
          const module = server.moduleGraph.getModuleById(resolvedRoutesId)
          if (module) {
            server.moduleGraph.invalidateAll()
            server.ws.send({ type: 'full-reload' })
          }
        }
      })
    },
    resolveId(id) {
      if (id === routesId) {
        return resolvedRoutesId
      }
      if (id === globalScssId) {
        return globalScssId
      }
      if (id === globalPluginsId) {
        return resolvedGlobalPluginsId
      }
    },
    load(id) {
      if (id === resolvedRoutesId) {
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
      if (id === globalScssId) {
        return resolvedConfiguration.globalStyle
      }
      if (id === resolvedGlobalPluginsId) {
        const imports: string[] = []
        const globalPluginsArray: string[] = []

        resolvedConfiguration.globalPlugins.forEach((pluginConfiguration) => {
          imports.push(
            `import { ${pluginConfiguration.name} } from '${pluginConfiguration.path}'`
          )
          globalPluginsArray.push(pluginConfiguration.name)
        })

        return `
          ${imports.join('\n')}
          export const globalPlugins = [${globalPluginsArray.join(',')}]`
      }
    },
  }
}
