import chainConfig from '@/config/chain'
import { globalConfig } from '@/config/global'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import useGetCurrencyPerEthPrice from '@/hooks/useGetCurrencyPrice'
import useGetQuotUsdForCurrency from '@/hooks/useGetUsdConversionRatesPrice'
import useSettingsCurrency from '@/hooks/useSettingCurrency'
import { ApolloProvider } from '@apollo/client'
import isPropValid from '@emotion/is-prop-valid'
import { ConfigProvider } from 'antd'
import axios from 'axios'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'
import { WagmiConfig } from 'wagmi'
import { apolloClient } from '../config/apollo'
import validEnv from '../config/env'
import { config } from '../config/wagmi'
import '../styles/reset.css'
import { lightTheme } from '../styles/theme'

const App = ({ Component, pageProps }: AppProps) => {
  validEnv()
  const { backendUrl } = globalConfig

  const router = useRouter()
  const { init: initMixpanel, registerPageView } = useMixpanelAnalytics()
  const chain = chainConfig()

  useSettingsCurrency()
  useGetCurrencyPerEthPrice()
  useGetQuotUsdForCurrency()

  useEffect(() => {
    initMixpanel()
  }, [initMixpanel])

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      registerPageView(chain.chainId)
    })
  }, [chain.chainId, registerPageView, router.events])

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={lightTheme}>
        <WagmiConfig config={config}>
          <StyleSheetManager shouldForwardProp={isPropValid}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: lightTheme.colorV2.blue[1],
                  borderRadius: 8
                },
                components: {
                  Modal: {
                    zIndexBase: 10005,
                    zIndexPopupBase: 10005
                  },
                  Slider: {
                    trackBg: lightTheme.colorV2.blue[1],
                    trackHoverBg: lightTheme.colorV2.blue[2]
                  }
                }
              }}
            >
              <SWRConfig
                value={{
                  revalidateIfStale: false,
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false,
                  errorRetryCount: 1,
                  shouldRetryOnError: false,
                  fetcher: (uri: string) => axios.get(`${backendUrl}/${uri}`).then(res => res.data)
                }}
              >
                <Component {...pageProps} />
              </SWRConfig>
            </ConfigProvider>
          </StyleSheetManager>
        </WagmiConfig>
      </ThemeProvider>
    </ApolloProvider>

  )
}

export default appWithTranslation(App)
