const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt'],
    localeDetection: true
  },
  trailingSlash: true,
  localePath: path.resolve('./src/locales')
}
