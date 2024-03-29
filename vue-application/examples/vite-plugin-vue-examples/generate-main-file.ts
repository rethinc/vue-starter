export const generateMainFile = (globalScssFile?: string) => {
  const globalScssFileImport = globalScssFile
    ? `import '${globalScssFile}'`
    : ''
  return `
import { createApp } from 'vue'
import App from '/examples/App.vue'
import { viewExamplesRouter } from '/examples/application/router'
import { exampleRoutes } from '@examples/routes'
${globalScssFileImport}

createApp(App).use(viewExamplesRouter(exampleRoutes)).mount('#app')
`
}
