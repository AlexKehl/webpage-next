module.exports = (on, config) => {
  Object.assign(config, {
    specPattern: 'cypress/e2e',
  })

  return config
}
