export const transformMainFile = (
  mainSource: string,
  globalScssFile?: string
) => {
  const globalScssFileImport = globalScssFile
    ? `import '${globalScssFile}'`
    : ''
  return `${globalScssFileImport}\n` + mainSource
}
