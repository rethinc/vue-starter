import Checkmark from '@/assets/icons/colorizable/checkmark.svg?raw'

import BellCheckmark from '@/assets/icons/original/bell-checkmark.svg?raw'

export enum IconColorizable {
  Checkmark = 'IconColorizable_Checkmark',
}

export enum IconOriginal {
  BellCheckmark = 'IconOriginal_BellCheckmark',
}

export type IconType = IconColorizable | IconOriginal

export const iconByType = (iconType: IconType): string => {
  switch (iconType) {
    case IconColorizable.Checkmark:
      return Checkmark

    case IconOriginal.BellCheckmark:
      return BellCheckmark
  }
}
