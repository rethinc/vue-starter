import * as fs from 'fs'
import * as path from 'path'
import {
  parseExampleDirectories,
  createExampleDirectory,
} from './parseExampleDirectories'

describe('parseExampleDirectories', () => {
  const exampleRootDirPath = '/tmp/testParseExampleDir'

  beforeEach(() => {
    if (fs.existsSync(exampleRootDirPath)) {
      fs.rmdirSync(exampleRootDirPath, { recursive: true })
    }
    fs.mkdirSync(exampleRootDirPath)
  })

  it('should map folders containing vue Example files', () => {
    const exampleDirPath = createDirectoryInPath(
      exampleRootDirPath,
      'exampleDir'
    )
    createFileInPath(exampleDirPath, 'ExampleFile.vue')

    const exampleDirs = parseExampleDirectories(exampleRootDirPath)

    expect(exampleDirs).toStrictEqual([
      createExampleDirectory('exampleDir', {
        files: ['ExampleFile.vue'],
      }),
    ])
  })

  it('should not map folders not containing other files', () => {
    const exampleDirPath = createDirectoryInPath(
      exampleRootDirPath,
      'exampleDir'
    )
    createFileInPath(exampleDirPath, 'other.ts')

    const exampleDirs = parseExampleDirectories(exampleRootDirPath)

    expect(exampleDirs).toStrictEqual([])
  })

  it('should map folders containing folders with example files', () => {
    const directoryLevel1 = createDirectoryInPath(exampleRootDirPath, 'level1')
    const directoryLevel2 = createDirectoryInPath(directoryLevel1, 'level2')
    const exampleFile = path.resolve(directoryLevel2, 'ExampleFile.vue')
    createFileInPath(directoryLevel2, exampleFile)

    const exampleDirs = parseExampleDirectories(exampleRootDirPath)

    expect(exampleDirs).toStrictEqual([
      createExampleDirectory('level1', {
        directories: [
          createExampleDirectory('level2', {
            files: ['ExampleFile.vue'],
          }),
        ],
      }),
    ])
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
})
