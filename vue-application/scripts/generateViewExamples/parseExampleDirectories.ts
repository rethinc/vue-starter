import * as fs from 'fs'
import * as path from 'path'

interface ExampleDirectory {
  name: string
  files: string[]
  directories: ExampleDirectory[]
}

export const createExampleDirectory = (
  name: string,
  overrides: Partial<ExampleDirectory>
): ExampleDirectory => {
  return {
    name: name,
    files: [],
    directories: [],
    ...overrides,
  }
}

export const parseExampleDirectories = (
  rootDirectory: string
): ExampleDirectory[] => {
  const exampleDirectories: ExampleDirectory[] = []
  const files = fs.readdirSync(rootDirectory)
  files.forEach((fileOrDirectoryName) => {
    const stats = fs.statSync(path.resolve(rootDirectory, fileOrDirectoryName))
    if (stats.isDirectory()) {
      const exampleDirectoryPath = path.resolve(
        rootDirectory,
        fileOrDirectoryName
      )
      const exampleDirectory = parseExampleDirectory(exampleDirectoryPath)
      if (exampleDirectory) {
        exampleDirectories.push(exampleDirectory)
      }
    }
  })

  return exampleDirectories
}

const parseExampleDirectory = (
  exampleDirectoryPath: string
): ExampleDirectory | void => {
  const exampleDirectoryName = path.basename(exampleDirectoryPath)
  const exampleFiles: string[] = []
  const exampleDirectories: ExampleDirectory[] = []

  const files = fs.readdirSync(exampleDirectoryPath)
  files.forEach((fileOrDirectoryName) => {
    const fileOrDirectoryPath = path.resolve(
      exampleDirectoryPath,
      fileOrDirectoryName
    )
    const stats = fs.statSync(fileOrDirectoryPath)
    if (stats.isDirectory()) {
      const exampleDirectory = parseExampleDirectory(fileOrDirectoryPath)
      if (exampleDirectory) {
        exampleDirectories.push(exampleDirectory)
      }
    } else {
      const fileExtension = path.extname(fileOrDirectoryName)
      if (fileExtension === '.vue') {
        exampleFiles.push(fileOrDirectoryName)
      }
    }
  })

  if (exampleFiles.length === 0 && exampleDirectories.length === 0) {
    return
  }

  return createExampleDirectory(exampleDirectoryName, {
    files: exampleFiles,
    directories: exampleDirectories,
  })
}
