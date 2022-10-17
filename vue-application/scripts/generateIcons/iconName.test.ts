import { describe, it, expect } from 'vitest'
import { iconNameFromFile } from './iconName'

describe('iconName', () => {
  describe('iconNameFromFile', () => {
    it.each([
      ['icon-name.svg', 'IconName'],
      ['icon*name.svg', 'IconName'],
      ['icon!name.svg', 'IconName'],
      ['icon!*-name.svg', 'IconName'],
      ['-iconName.svg', 'IconName'],
      ['iconName-.svg', 'IconName'],
    ])(
      'should convert filename %s to camel case icon name %s',
      (fileName: string, expectedIconName: string) => {
        const iconName = iconNameFromFile(fileName)

        expect(iconName).toBe(expectedIconName)
      }
    )
  })
})
