import * as fs from 'fs'
import * as path from 'path'

export interface RouteFile {
  imports: string[]
  routes: string[]
}

export const mapExampleFilesToRoutes = (
  examplesRootPath: string,
  exampleFileNameSuffix: string
): RouteFile => {
  const exampleFilePattern = exampleFileNameSuffix.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )
  return collectImportsAndRoutes(
    new RegExp(`(.*)${exampleFilePattern}$`),
    examplesRootPath,
    examplesRootPath,
    '/'
  )
}

const collectImportsAndRoutes = (
  exampleFilePattern: RegExp,
  examplesRootPath: string,
  currentDirectoryPath: string,
  routePath: string
): { imports: string[]; routes: string[] } => {
  const imports: string[] = []
  const routes: string[] = []

  fs.readdirSync(currentDirectoryPath).forEach((fileOrDirectoryName) => {
    const fileOrDirectoryPath = path.resolve(
      currentDirectoryPath,
      fileOrDirectoryName
    )
    if (isDirectory(fileOrDirectoryPath)) {
      const importsAndRoutes = collectImportsAndRoutes(
        exampleFilePattern,
        examplesRootPath,
        fileOrDirectoryPath,
        `${routePath}${fileOrDirectoryName}/`
      )
      imports.push(...importsAndRoutes.imports)
      routes.push(...importsAndRoutes.routes)
    } else {
      const matches = fileOrDirectoryName.match(exampleFilePattern)
      if (matches && matches.length === 2) {
        const exampleName = matches[1]
        const relativeExamplePath = fileOrDirectoryPath.replace(
          new RegExp(`^${examplesRootPath}`),
          ''
        )
        const importName = `Example${relativeExamplePath}`.replace(
          /[^A-z0-9]+/g,
          ''
        )
        imports.push(createImport(importName, fileOrDirectoryPath))
        routes.push(createRoute(`${routePath}${exampleName}`, importName))
      }
    }
  })
  return { imports, routes }
}

export const createImport = (importName: string, path: string) =>
  `import ${importName} from '${path}'`

export const createRoute = (path: string, component: string) =>
  `{path: '${path}',component:${component},}`

const isDirectory = (fileOrDirectoryPath: string) =>
  fs.statSync(fileOrDirectoryPath).isDirectory()
