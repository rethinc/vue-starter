import * as fs from 'fs'
import * as path from 'path'
import { describe, it, expect, beforeEach } from 'vitest'
import { mapExampleFilesToRoutes } from './mapExampleFilesToRoutes'

describe('mapExampleDirectoryToRoutes', () => {
  const exampleRootPath = '/tmp/testParseExampleDir'
  const exampleFileNameSuffix = '.example.vue'

  beforeEach(() => {
    if (fs.existsSync(exampleRootPath)) {
      fs.rmSync(exampleRootPath, { recursive: true })
    }
    fs.mkdirSync(exampleRootPath)
  })

  it('should add import for example file', () => {
    const exampleFilePattern = '.example.vue'
    const exampleFileName = 'Dummy.example.vue'
    createFileInPath(exampleRootPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(
      exampleRootPath,
      exampleFilePattern
    )

    expect(routeFile.imports).toStrictEqual([
      `import ExampleDummyexamplevue from '${exampleRootPath}/${exampleFileName}'`,
    ])
  })

  it('should add route definition for example file', () => {
    const exampleFileName = 'Dummy.example.vue'
    createFileInPath(exampleRootPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(
      exampleRootPath,
      exampleFileNameSuffix
    )

    expectRoutes(routeFile.routes).toEqual([
      `{
          path: '/Dummy',
          component: ExampleDummyexamplevue,
       }`,
    ])
  })

  it('should add import for example file recursively', () => {
    const exampleFileName = 'Dummy.example.vue'
    const directoryPath = createDirectoryInPath(exampleRootPath, 'directory')
    createFileInPath(directoryPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(
      exampleRootPath,
      exampleFileNameSuffix
    )

    expect(routeFile.imports).toStrictEqual([
      `import ExampledirectoryDummyexamplevue from '${directoryPath}/${exampleFileName}'`,
    ])
  })

  it('should add route definition for example file recursively', () => {
    const exampleFileName = 'Dummy.example.vue'
    const directoryPath = createDirectoryInPath(exampleRootPath, 'directory')
    createFileInPath(directoryPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(
      exampleRootPath,
      exampleFileNameSuffix
    )

    expectRoutes(routeFile.routes).toEqual([
      `{
          path: '/directory/Dummy',
          component: ExampledirectoryDummyexamplevue,
       }`,
    ])
  })

  it('should add route definition for example file recursively 2 level deep', () => {
    const exampleFileName = 'Dummy.example.vue'
    const level1Path = createDirectoryInPath(exampleRootPath, 'level1')
    const level2Path = createDirectoryInPath(level1Path, 'level2')
    createFileInPath(level2Path, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(
      exampleRootPath,
      exampleFileNameSuffix
    )

    expectRoutes(routeFile.routes).toEqual([
      `{
          path: '/level1/level2/Dummy',
          component: Examplelevel1level2Dummyexamplevue,
       }`,
    ])
  })

  it('should ignore vue file when not matching file name suffix', () => {
    const exampleFileName = 'Dummy.vue'
    createFileInPath(exampleRootPath, exampleFileName)

    const routeFile = mapExampleFilesToRoutes(
      exampleRootPath,
      exampleFileNameSuffix
    )

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
    routes.map((route) => route.replace(/[ \n]*/g, ''))
})
