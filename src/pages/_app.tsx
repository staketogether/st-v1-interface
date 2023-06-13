import { Analytics } from '@/components/shared/scripts/Analytics'
import { ApolloProvider } from '@apollo/client'
import { lightTheme as lightThemeRainbow, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import { Hotjar } from '../components/shared/scripts/Hotjar'
import { apolloClient } from '../config/apollo'
import validEnv from '../config/env'
import { chains, wagmiClient } from '../config/wagmi'
import '../styles/globals.css'
import { lightTheme } from '../styles/theme'
import chainConfig from '@/config/chain'
import NextNProgress from 'nextjs-progressbar'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500'] })

const App = ({ Component, pageProps }: AppProps) => {
  validEnv()
  const router = useRouter()
  const { init: initMixpanel, registerPageView } = useMixpanelAnalytics()
  const chain = chainConfig()

  useEffect(() => {
    initMixpanel()
  }, [initMixpanel])

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      registerPageView(chain.chainId)
    })
  }, [chain.chainId, registerPageView, router.events])

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
              <Analytics />
              <Hotjar />
              <NextNProgress color={lightTheme.color.secondary} options={{ showSpinner: false }} />
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { id, name, value, label } = metric

  if (window.gtag === undefined) {
    return
  }

  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js Custom Metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true
  })
}

export default appWithTranslation(App)
