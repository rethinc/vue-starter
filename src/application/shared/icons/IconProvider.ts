import checkmark from '@/assets/icons/colorizable/checkmark.svg?raw'

import bell_checkmark from '@/assets/icons/original/bell-checkmark.svg?raw'

export enum IconColorizable {
  Checkmark = 'IconColorizable_Checkmark',
}

export enum IconOriginal {
  Bell_checkmark = 'IconOriginal_Bell_checkmark',
}

export type IconType = IconColorizable | IconOriginal

export const iconByType = (iconType: IconType): string => {
  switch (iconType) {
    case IconColorizable.Checkmark:
      return checkmark

    case IconOriginal.Bell_checkmark:
      return bell_checkmark
  }
}
