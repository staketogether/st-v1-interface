import chainConfig from '@/config/chain'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { ApolloProvider } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
// import { Montserrat } from 'next/font/google'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import { Cloudflare } from '../components/shared/scripts/Cloudflare'
import { GoogleTag } from '../components/shared/scripts/GoogleTag'
import { Hotjar } from '../components/shared/scripts/Hotjar'
import { apolloClient } from '../config/apollo'
import validEnv from '../config/env'
import { config } from '../config/wagmi'
import '../styles/reset.css'
import { lightTheme } from '../styles/theme'
import useSettingsCurrency from '@/hooks/useSettingCurrency'

// const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500'] })

const App = ({ Component, pageProps }: AppProps) => {
  validEnv()
  const router = useRouter()
  const { init: initMixpanel, registerPageView } = useMixpanelAnalytics()
  const chain = chainConfig()
  useSettingsCurrency()
  useEffect(() => {
    initMixpanel()
  }, [initMixpanel])

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      registerPageView(chain.chainId)
    })
  }, [chain.chainId, registerPageView, router.events])

  return (
    <div>
      <GoogleTag />
      <Hotjar />
      <Cloudflare />
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={lightTheme}>
          <WagmiConfig config={config}>
            <NextNProgress color={lightTheme.color.secondary} options={{ showSpinner: false }} />
            <Component {...pageProps} />
          </WagmiConfig>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  )
}

export default appWithTranslation(App)
