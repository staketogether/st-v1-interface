import { Analytics } from '@/components/shared/scripts/Analytics'
import { ApolloProvider } from '@apollo/client'
import { RainbowKitProvider, lightTheme as lightThemeRainbow } from '@rainbow-me/rainbowkit'
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
import useConnectedAccount from '@/hooks/useConnectedAccount'
import { Router, useRouter } from 'next/router'
import chainConfig from '@/config/chain'
import { useEffect } from 'react'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import NProgress from 'nprogress'
import '../styles/nprogressStayle.css'
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500'] })

const App = ({ Component, pageProps }: AppProps) => {
  validEnv()
  const router = useRouter()
  const { init: initMixpanel, registerPageView, isInitialized: hasMixpanelInit } = useMixpanelAnalytics()
  const { account } = useConnectedAccount()
  const chain = chainConfig()

  useEffect(() => {
    if (hasMixpanelInit) {
      return
    }

    initMixpanel()
  }, [initMixpanel, hasMixpanelInit])

  useEffect(() => {
    if (!hasMixpanelInit || !account) {
      return
    }

    router.events.on('routeChangeComplete', () => {
      registerPageView(account, chain.chainId)
    })
  }, [account, chain.chainId, hasMixpanelInit, registerPageView, router.events])

  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

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
