export const iconNameFromFile = (fileName: string) => {
  return fileName
    .substring(0, fileName.lastIndexOf('.'))
    .replace(/[^a-zA-Z0-9]+/g, '_')
}
