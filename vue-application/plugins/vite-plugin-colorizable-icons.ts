import { readFileSync } from 'fs'
// TODO: Create typescript .d.ts for svgo file because npm libray @types/svgo does not support the latest version of svgo:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as svgo from 'svgo'
import { PluginOption } from 'vite'

export interface ColorizableIconsPluginConfiguration {
  colorizableIconsDirectory: string
}

export default (
  configuration: ColorizableIconsPluginConfiguration
): PluginOption => {
  const escapedColorizableIconsDirectory =
    configuration.colorizableIconsDirectory.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )
  const fileMatch = new RegExp(
    `${escapedColorizableIconsDirectory}.*\\.svg\\?raw$`
  )

  return {
    name: 'colorizeSvgIcons',
    enforce: 'pre',

    load(id: string) {
      if (fileMatch.test(id)) {
        const idWithoutQuery = id.replace(/\?raw$/, '')
        const svgCode = readFileSync(idWithoutQuery).toString()
        const optimizedSvg = svgo.optimize(svgCode, {
          plugins: [{ name: 'convertColors', params: { currentColor: true } }],
        })
        return `export default ${JSON.stringify(optimizedSvg.data)}`
      }
    },
  }
}
