import { PluginOption, ViteDevServer } from 'vite'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'

export interface VueExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
  exampleAppPath: string
  globalScssFile?: string
}

export default (
  customConfiguration: Partial<VueExamplesPluginConfiguration>
): PluginOption => {
  const configuration = {
    examplesRootPath: 'src',
    exampleFileNameSuffix: '.example.vue',
    exampleAppPath: '/vue-examples/',
    ...customConfiguration,
  }
  const routesId = '@examples/routes'
  const resolvedRoutesId = '\0' + routesId
  const globalScssId = '@examples/global.scss'

  return {
    name: 'vue-view-examples',
    configureServer: (server: ViteDevServer) => {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith(configuration.exampleAppPath)) {
          req.url = req.url.replace(
            new RegExp(`${configuration.exampleAppPath}`),
            '/examples/'
          )
        }
        next()
      })
      server.watcher.add(configuration.examplesRootPath)
      server.watcher.on('all', async (event, changedFilePath) => {
        if (
          ['add', 'unlink'].includes(event) &&
          changedFilePath.startsWith(configuration.examplesRootPath) &&
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
    },
    load(id) {
      if (id === resolvedRoutesId) {
        const routeFile = mapExampleFilesToRoutes(
          configuration.examplesRootPath,
          configuration.exampleFileNameSuffix
        )
        return `
          ${routeFile.imports.join('\n')}
          export const exampleRoutes = [
            ${routeFile.routes.join(',\n')}
          ]`
      }
      if (id === globalScssId) {
        return configuration.globalScssFile
          ? `@import '${configuration.globalScssFile}'`
          : ''
      }
    },
  }
}
