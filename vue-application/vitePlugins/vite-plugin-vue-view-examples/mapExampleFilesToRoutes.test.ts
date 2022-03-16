import * as fs from 'fs'
import * as path from 'path'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'

describe('mapExampleDirectoryToRoutes', () => {
  const exampleRootPath = '/tmp/testParseExampleDir'

  beforeEach(() => {
    if (fs.existsSync(exampleRootPath)) {
      fs.rmSync(exampleRootPath, { recursive: true })
    }
    fs.mkdirSync(exampleRootPath)
  })

  it('should add import for example file', () => {
    const exampleFileName = 'DummyExample.vue'
    createFileInPath(exampleRootPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(exampleRootPath)

    expect(routeFile.imports).toStrictEqual([
      `import DummyExample from '${exampleRootPath}/DummyExample.vue'`,
    ])
  })

  it('should add route definition for example file', () => {
    const exampleFileName = 'DummyExample.vue'
    createFileInPath(exampleRootPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(exampleRootPath)

    expectRoutes(routeFile.routes).toEqual([
      `{
          path: 'Dummy',
          component: DummyExample,
       }`,
    ])
  })

  it('should add import for example file recursively', () => {
    const exampleFileName = 'DummyExample.vue'
    const directoryPath = createDirectoryInPath(exampleRootPath, 'directory')
    createFileInPath(directoryPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(exampleRootPath)

    expect(routeFile.imports).toStrictEqual([
      `import DummyExample from '${directoryPath}/DummyExample.vue'`,
    ])
  })

  it('should add route definition for example file recursively', () => {
    const exampleFileName = 'DummyExample.vue'
    const directoryPath = createDirectoryInPath(exampleRootPath, 'directory')
    createFileInPath(directoryPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(exampleRootPath)

    expectRoutes(routeFile.routes).toEqual([
      `{
          path: 'directory/Dummy',
          component: DummyExample,
       }`,
    ])
  })

  it('should add route definition for example file recursively 2 level deep', () => {
    const exampleFileName = 'DummyExample.vue'
    const level1Path = createDirectoryInPath(exampleRootPath, 'level1')
    const level2Path = createDirectoryInPath(level1Path, 'level2')
    createFileInPath(level2Path, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(exampleRootPath)

    expectRoutes(routeFile.routes).toEqual([
      `{
          path: 'level1/level2/Dummy',
          component: DummyExample,
       }`,
    ])
  })

  it('should ignore non vue files', () => {
    const exampleFileName = 'DummyExample.ts'
    createFileInPath(exampleRootPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(exampleRootPath)

    expect(routeFile.imports).toStrictEqual([])
    expect(routeFile.routes).toStrictEqual([])
  })

  it('should ignore vue file without Example suffix', () => {
    const exampleFileName = 'Dummy.vue'
    createFileInPath(exampleRootPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(exampleRootPath)

    expect(routeFile.imports).toStrictEqual([])
    expect(routeFile.routes).toStrictEqual([])
  })

  const createFileInPath = (
    directoryPath: string,
    fileName: string
  ): string => {
    const filePath = path.resolve(directoryPath, fileName)
    fs.closeSync(fs.openSync(filePath, 'w'))
    return filePath
  }

  const createDirectoryInPath = (
    directoryPath: string,
    directoryName: string
  ): string => {
    const createdDirectoryPath = path.resolve(directoryPath, directoryName)
    fs.mkdirSync(createdDirectoryPath)
    return createdDirectoryPath
  }

  const expectRoutes = (
    actualRoutes: string[]
  ): { toEqual: (expectedRoutes: string[]) => void } => {
    return {
      toEqual: (expectedRoutes) => {
        expect(removeSpaces(actualRoutes)).toStrictEqual(
          removeSpaces(expectedRoutes)
        )
      },
    }
  }

  const removeSpaces = (routes: string[]) =>
    routes.map((route) => route.replace(/ +/g, ''))
})
