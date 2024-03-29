export const generateMainFile = (globalScssFile?: string) => {
  const globalScssFileImport = globalScssFile
    ? `import '${globalScssFile}'`
    : ''
  return `
import { createApp } from 'vue'
import App from '/examples/App.vue'
import { viewExamplesRouter } from '/examples/application/router'
${globalScssFileImport}

createApp(App).use(viewExamplesRouter).mount('#app')
`
}
