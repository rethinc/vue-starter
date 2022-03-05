import * as fs from 'fs'
import * as path from 'path'
import { exec } from 'child_process'

const projectRootDirectory = process.cwd()

const iconColorizableDirectory = path.resolve(
  projectRootDirectory,
  'src/assets/icons/colorizable'
)
const iconOriginalDirectory = path.resolve(
  projectRootDirectory,
  'src/assets/icons/original'
)

interface ProcessedIcons {
  importContent: string
  enumContent: string
  switchContent: string
}

const processIcons = (
  files: string[],
  importPath: string,
  enumName: string
): ProcessedIcons => {
  let importContent = ''
  let enumContent = ''
  let switchContent = ''
  files.forEach((fileName) => {
    const iconName = fileName
      .substring(0, fileName.lastIndexOf('.'))
      .replace(/[^a-zA-Z0-9]/g, '_')
    const enumCaseName = iconName[0].toUpperCase() + iconName.slice(1)
    importContent += `import ${iconName} from '${importPath}/${fileName}?raw'\n`
    enumContent += `${enumCaseName} = '${enumName}_${enumCaseName}',`
    switchContent += `
    case ${enumName}.${enumCaseName}:
      return ${iconName}
    `
  })
  return { importContent, enumContent, switchContent }
}

const processedColorizableIcons = processIcons(
  fs.readdirSync(iconColorizableDirectory),
  '@/assets/icons/colorizable',
  'IconColorizable'
)

const processedOriginalIcons = processIcons(
  fs.readdirSync(iconOriginalDirectory),
  '@/assets/icons/original',
  'IconOriginal'
)

const iconProviderFile = path.resolve(
  projectRootDirectory,
  'src/application/shared/icons/IconProvider.ts'
)

fs.mkdirSync(path.dirname(iconProviderFile), { recursive: true })
fs.writeFileSync(
  iconProviderFile,
  `
    ${processedColorizableIcons.importContent}
    ${processedOriginalIcons.importContent}
    
    export enum IconColorizable {
      ${processedColorizableIcons.enumContent}    
    }
    
    export enum IconOriginal{
      ${processedOriginalIcons.enumContent}    
    }
    
    export type IconType = IconColorizable | IconOriginal
    
    export const iconByType = (iconType: IconType): string => {
      switch (iconType) {
        ${processedColorizableIcons.switchContent}    
        ${processedOriginalIcons.switchContent}    
     }
    }
  `
)

exec(`npx prettier --write "${iconProviderFile}"`)
