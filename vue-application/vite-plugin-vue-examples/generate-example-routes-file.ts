import { mapExampleFilesToRoutes } from './map-example-files-to-routes'

export const generateExampleRoutesFile = (
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
