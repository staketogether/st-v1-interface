import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
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
          <Script
            id='facebook-pixel'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1367668057155824');
        fbq('track', 'PageView');
      `
            }}
          />
          <noscript>
            <img
              height='1'
              width='1'
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
