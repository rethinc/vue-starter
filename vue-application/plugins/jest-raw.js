module.exports = {
  process: (_, filename) => {
    console.log(filename)
    return `module.exports = { default: '${filename}'}`
  },
}
