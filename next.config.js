const path = require('path')

module.exports = {
  webpack(config, option) {
    config.resolve = {
      alias: {
        '@public': path.join(__dirname, 'public'),
        '@components': path.join(__dirname, 'components'),
        '@contexts': path.join(__dirname, 'contexts'),
      },
      ...config.resolve
    }

    return config
  }
}
