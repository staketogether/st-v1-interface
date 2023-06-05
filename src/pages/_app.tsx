import { ApolloProvider } from '@apollo/client'
import { RainbowKitProvider, lightTheme as lightThemeRainbow } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'

import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import { apolloClient } from '../config/apollo'
import validEnv from '../config/env'
import { chains, wagmiClient } from '../config/wagmi'
import '../styles/globals.css'
import { lightTheme } from '../styles/theme'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500'] })

const App = ({ Component, pageProps }: AppProps) => {
  validEnv()

  return (
    <div className={montserrat.className}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={lightTheme}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              theme={lightThemeRainbow()}
              modalSize='compact'
              showRecentTransactions
            >
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  )
}

export function reportWebVitals(metric: {id: string, name: string, startTime: number, value: number, label: string}) {
  const { id, name, value, label } = metric

  if (window.gtag === undefined) {
    return
  }
  
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

export default appWithTranslation(App)
