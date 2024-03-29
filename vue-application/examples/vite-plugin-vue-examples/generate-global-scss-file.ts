export const generateGlobalScssFile = (globalScssFile?: string) => {
  return globalScssFile ? `@import '${globalScssFile}'` : ''
}
