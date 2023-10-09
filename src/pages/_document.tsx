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
          <meta
            name='description'
            content='Invista em Ethereum com a Stake Together e maximize seus lucros enquanto apoia seus projetos favoritos através da Blockchain'
          />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://beta.staketogether.app' />
          <meta property='og:title' content='Stake Together - Staking de Ethereum' />
          <meta
            property='og:description'
            content='Invista em Ethereum com a Stake Together e maximize seus lucros enquanto apoia seus projetos favoritos através da Blockchain'
          />
          <meta property='og:image' content={`/assets/icons/stake-together/meta.png`} />
          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content='https://beta.staketogether.app' />
          <meta property='twitter:title' content='Stake Together - Staking de Ethereum' />
          <meta
            property='twitter:description'
            content='Invista em Ethereum com a Stake Together e maximize seus lucros enquanto apoia seus projetos favoritos através da Blockchain'
          />
          <meta property='twitter:image' content={`/assets/icons/stake-together/meta.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
