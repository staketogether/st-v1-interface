import { globalConfig } from '@/config/global'
import { config } from '@/config/wagmi'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import useGetQuotUsdForCurrency from '@/hooks/useGetUsdConversionRatesPrice'
import useSettingsCurrency from '@/hooks/useSettingCurrency'
import { ApolloProvider } from '@apollo/client'
import isPropValid from '@emotion/is-prop-valid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import axios from 'axios'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'
import { WagmiProvider } from 'wagmi'
import validEnv from '../config/env'
import '../styles/reset.css'
import { lightTheme } from '../styles/theme'
import { ethereumMainnetClient } from '@/config/apollo'
import hotjar from '@hotjar/browser'

const App = ({ Component, pageProps }: AppProps) => {
  validEnv()
  const { backendUrl } = globalConfig
  const { init: initMixpanel } = useMixpanelAnalytics()
  const queryClient = new QueryClient()

  useSettingsCurrency()
  useGetQuotUsdForCurrency()

  useEffect(() => {
    initMixpanel()
  }, [initMixpanel])

  useEffect(() => {
    const hotjarId = Number(process.env.NEXT_PUBLIC_HOTJAR_ID!)
    const hotjarVersion = 6;

    hotjar.init(hotjarId, hotjarVersion);
  }, [])

  return (
    <ApolloProvider client={ethereumMainnetClient}>
      <ThemeProvider theme={lightTheme}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
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
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    fetcher: (uri: string) => axios.get(`${backendUrl}/${uri}`).then(res => res.data)
                  }}
                >
                  <Component {...pageProps} />
                </SWRConfig>
              </ConfigProvider>
            </StyleSheetManager>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default appWithTranslation(App)
