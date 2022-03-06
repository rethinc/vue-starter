import * as fs from 'fs'

const packageJsonPath = process.argv[2]
if (!packageJsonPath) {
  console.log('USAGE node extendPackageJson.mjs <package-json-path>')
  process.exit(1)
}
const packageJsonOriginalData = fs.readFileSync(packageJsonPath)
const packageJson = JSON.parse(packageJsonOriginalData)

packageJson['type'] = 'module'

packageJson['scripts']['format'] = 'eslint . --fix'
packageJson['scripts']['lint'] = 'eslint .'
packageJson['scripts']['test'] = 'jest'
packageJson['scripts']['viewExamples'] =
  'vite -c vite.viewExamples.config.ts --port 3001'
packageJson['scripts']['generate-icons'] =
  'node --experimental-specifier-resolution=node --loader ts-node/esm ./scripts/generate-icons.ts'

const extendedPackageJsonContent = JSON.stringify(packageJson, null, 1)
fs.writeFileSync(packageJsonPath, extendedPackageJsonContent)
