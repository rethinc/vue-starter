import * as fs from 'fs'

const packageJsonPath = process.argv[2]
const productName = process.argv[3]
if (!packageJsonPath || !productName) {
  console.log(
    'USAGE node extendPackageJson.mjs <project-name> <package-json-path>'
  )
  process.exit(1)
}

const packageJson = {
  name: productName,
  version: '0.0.0',
  type: 'module',
  scripts: {
    dev: 'vite',
    build: 'vue-tsc --noEmit && vite build',
    preview: 'vite preview',
    format: 'eslint . --fix',
    lint: 'eslint .',
    test: 'jest',
    viewExamples: 'vite -c vite.viewExamples.config.ts --port 3001',
    generateIcons:
      'node --experimental-specifier-resolution=node --loader ts-node/esm ./scripts/generateIcons.ts',
  },
}

const PackageJsonFileContent = JSON.stringify(packageJson, null, 1)
fs.writeFileSync(packageJsonPath, PackageJsonFileContent)
