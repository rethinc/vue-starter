import * as fs from 'fs'
import * as path from 'path'

export interface RouteFile {
  imports: string[]
  routes: string[]
}

export const mapExampleFilesToRoutes = (
  rootDirectoryPath: string
): RouteFile => {
  return collectImportsAndRoutes(rootDirectoryPath, '')
}

const collectImportsAndRoutes = (
  directoryPath: string,
  routePath: string
): { imports: string[]; routes: string[] } => {
  const imports: string[] = []
  const routes: string[] = []

  fs.readdirSync(directoryPath).forEach((fileOrDirectoryName) => {
    const fileOrDirectoryPath = path.resolve(directoryPath, fileOrDirectoryName)
    if (isDirectory(fileOrDirectoryPath)) {
      const importsAndRoutes = collectImportsAndRoutes(
        fileOrDirectoryPath,
        `${routePath}${fileOrDirectoryName}/`
      )
      imports.push(...importsAndRoutes.imports)
      routes.push(...importsAndRoutes.routes)
    } else {
      const importName = removeFileExtension(path.basename(fileOrDirectoryName))
      if (isVueFile(fileOrDirectoryPath) && hasExampleSuffix(importName)) {
        const exampleName = removeExampleSuffix(importName)
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

const removeFileExtension = (path: string) =>
  path.substring(0, path.lastIndexOf('.'))

const removeExampleSuffix = (name: string) =>
  name.substring(0, name.lastIndexOf('Example'))

const isDirectory = (fileOrDirectoryPath: string) =>
  fs.statSync(fileOrDirectoryPath).isDirectory()

const isVueFile = (filePath: string) => path.extname(filePath) === '.vue'

const hasExampleSuffix = (name: string) => name.endsWith('Example')
