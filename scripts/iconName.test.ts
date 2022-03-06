import { iconNameFromFile } from './iconName'

describe('iconName', () => {
  describe('iconNameFromFile', () => {
    it('should return name of file without file extension', () => {
      const fileName = 'icon.svg'

      const iconName = iconNameFromFile(fileName)

      expect(iconName).toBe('icon')
    })

    it.each([
      ['icon-name.svg', 'icon_name'],
      ['icon*name.svg', 'icon_name'],
      ['icon!name.svg', 'icon_name'],
      ['icon!*-name.svg', 'icon_name'],
    ])(
      'should replace all non numerical or letters from %s characters with one underline',
      (fileName: string, expectedIconName: string) => {
        const iconName = iconNameFromFile(fileName)

        expect(iconName).toBe(expectedIconName)
      }
    )
  })
})
