import * as fs from 'fs'
import * as path from 'path'

export interface RouteFile {
  imports: string[]
  routes: string[]
}

export const mapExampleFilesToRoutes = (
  rootExamplePath: string,
  exampleFileNameSuffix: string
): RouteFile => {
  const exampleFilePattern = exampleFileNameSuffix.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )
  return collectImportsAndRoutes(
    rootExamplePath,
    new RegExp(`(.*)${exampleFilePattern}$`),
    '/'
  )
}

const collectImportsAndRoutes = (
  rootExamplePath: string,
  exampleFilePattern: RegExp,
  routePath: string
): { imports: string[]; routes: string[] } => {
  const imports: string[] = []
  const routes: string[] = []

  fs.readdirSync(rootExamplePath).forEach((fileOrDirectoryName) => {
    const fileOrDirectoryPath = path.resolve(
      rootExamplePath,
      fileOrDirectoryName
    )
    if (isDirectory(fileOrDirectoryPath)) {
      const importsAndRoutes = collectImportsAndRoutes(
        fileOrDirectoryPath,
        exampleFilePattern,
        `${routePath}${fileOrDirectoryName}/`
      )
      imports.push(...importsAndRoutes.imports)
      routes.push(...importsAndRoutes.routes)
    } else {
      const matches = fileOrDirectoryName.match(exampleFilePattern)
      if (matches && matches.length === 2) {
        const exampleName = matches[1]
        const importName = `${exampleName}Example`
        imports.push(createImport(importName, fileOrDirectoryPath))
        routes.push(createRoute(routePath, exampleName, importName))
      }
    }
  })
  return { imports, routes }
}

export const createImport = (importName: string, path: string) =>
  `import ${importName} from '${path}'`

export const createRoute = (
  routePath: string,
  exampleName: string,
  component: string
) =>
  `{
path: '${routePath}${exampleName}',
component:${component},
}`

const isDirectory = (fileOrDirectoryPath: string) =>
  fs.statSync(fileOrDirectoryPath).isDirectory()
