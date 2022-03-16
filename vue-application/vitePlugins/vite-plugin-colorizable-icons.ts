import { PluginOption } from 'vite'
import svgo from 'svgo'
import { readFileSync } from 'fs'

export default (): PluginOption => {
  const fileMatch =
    /application\/shared\/icons\/assets\/svg-colorizable\/.*\.svg\?raw$/

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
