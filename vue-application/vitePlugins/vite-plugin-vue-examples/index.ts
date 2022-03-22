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
  const exampleIFrameAppId = '@examples/IFrameApp.vue'

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
      if (id === exampleIFrameAppId) {
        return exampleIFrameAppId
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
      if (id === exampleIFrameAppId) {
        return `
        <template>
          <RouterView />
        </template>
        
        <script lang="ts">
        import { defineComponent } from 'vue'
        
        export default defineComponent({
          name: 'App',
        })
        </script>
        
        <style lang="scss">
        ${resolvedConfiguration.globalStyle}
        </style>
        `
      }
    },
  }
}
