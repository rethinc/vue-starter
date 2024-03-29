import { mapExampleFilesToRoutes } from './map-example-files-to-routes'

export const generateExampleRoutes = (
  examplesRootPath: string,
  exampleFileNameSuffix: string
) => {
  const routeFile = mapExampleFilesToRoutes(
    examplesRootPath,
    exampleFileNameSuffix
  )
  return `
${routeFile.imports.join('\n')}
export const exampleRoutes = [
    ${routeFile.routes.join(',\n')}
]
`
}
