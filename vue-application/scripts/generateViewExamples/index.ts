import * as fs from 'fs'
import * as path from 'path'

const projectRootDirectory = process.cwd()
const examplesRootDirectory = path.resolve(
  projectRootDirectory,
  'viewExamples/examples/'
)

const files = fs.readdirSync(examplesRootDirectory)
files.forEach((fileOrDirectoryName) => {
  const stats = fs.statSync(
    path.resolve(examplesRootDirectory, fileOrDirectoryName)
  )
  if (stats.isDirectory()) {
    console.log('is dir')
  } else {
    console.log('is file')
  }
})
