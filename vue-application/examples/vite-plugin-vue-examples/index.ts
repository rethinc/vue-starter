import * as path from 'path'
import { PluginOption, ViteDevServer } from 'vite'
import { generateExampleRoutesFile } from './generate-example-routes-file'
import { generateGlobalScssFile } from './generate-global-scss-file'

export interface VueExamplesPluginConfiguration {
  examplesRootPath: string
  exampleFileNameSuffix: string
  exampleAppPath: string
  globalScssFile?: string
}

export default (
  customConfiguration: Partial<VueExamplesPluginConfiguration>
): PluginOption => {
  const examplesRootPath = customConfiguration.examplesRootPath
    ? path.resolve(customConfiguration.examplesRootPath)
    : path.resolve('src')
  const configuration: VueExamplesPluginConfiguration = {
    ...customConfiguration,
    examplesRootPath,
    exampleFileNameSuffix: '.example.vue',
    exampleAppPath: '/vue-examples/',
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
            server.moduleGraph.invalidateModule(module)
            server.hot.send({ type: 'full-reload' })
          }
        }
      })
    },
    resolveId(id) {
      switch (id) {
        case routesId:
          return resolvedRoutesId
        case globalScssId:
          return globalScssId
      }
    },
    load(id) {
      switch (id) {
        case resolvedRoutesId:
          return generateExampleRoutesFile(
            configuration.examplesRootPath,
            configuration.exampleFileNameSuffix
          )
        case globalScssId:
          return generateGlobalScssFile(configuration.globalScssFile)
      }
    },
  }
}
