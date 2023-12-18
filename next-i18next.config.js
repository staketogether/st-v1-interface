const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt']
  },
  trailingSlash: true,
  localePath: path.resolve('./src/locales')
}
