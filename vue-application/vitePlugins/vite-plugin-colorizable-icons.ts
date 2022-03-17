import { PluginOption } from 'vite'
// TODO: Create typescript .d.ts for svgo file because npm libray @types/svgo does not support the latest version of svgo:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as svgo from 'svgo'
import { readFileSync } from 'fs'

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
        const svgCode = readFileSync(idWithoutQuery)
        const optimizedSvg = svgo.optimize(svgCode, {
          plugins: [{ name: 'convertColors', params: { currentColor: true } }],
        })
        if (optimizedSvg.error === undefined) {
          return `export default ${JSON.stringify(optimizedSvg.data)}`
        }
      }
    },
  }
}
