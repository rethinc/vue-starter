import * as path from 'path'
import { PluginOption, ViteDevServer } from 'vite'
import { generateExampleRoutesFile } from './generate-example-routes-file'
import { generateMainFile } from './generate-main-file'

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
    exampleFileNameSuffix: '.example.vue',
    exampleAppPath: '/vue-examples/',
    ...customConfiguration,
    examplesRootPath,
  }
  const routesId = 'virtual:vue-examples-routes'
  const resolvedRoutesId = '\0' + routesId
  const mainId = '/examples/main.ts'
  const resolvedMainId = '\0' + '/examples/main.ts'

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
        case mainId:
          return resolvedMainId
      }
    },
    load(id) {
      switch (id) {
        case resolvedRoutesId:
          return generateExampleRoutesFile(
            configuration.examplesRootPath,
            configuration.exampleFileNameSuffix
          )
        case resolvedMainId:
          return generateMainFile(configuration.globalScssFile)
      }
    },
  }
}
