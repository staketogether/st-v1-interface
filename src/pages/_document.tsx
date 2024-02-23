import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()]
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta name='title' content='Stake Together - Staking de Ethereum' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://app.staketogether.org' />
          <meta property='og:title' content='Stake Together - Staking de Ethereum' key='title' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
