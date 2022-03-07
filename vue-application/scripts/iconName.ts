export const iconNameFromFile = (fileName: string): string => {
  return fileName
    .substring(0, fileName.lastIndexOf('.'))
    .replace(/([a-zA-Z0-9])+/g, (x) => x[0].toUpperCase() + x.slice(1))
    .replace(/[^a-zA-Z0-9]+/g, '')
}
