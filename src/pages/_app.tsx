import chainConfig from '@/config/chain'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import useSettingsCurrency from '@/hooks/useSettingCurrency'
import { ApolloProvider } from '@apollo/client'
import isPropValid from '@emotion/is-prop-valid'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { WagmiConfig } from 'wagmi'
import { apolloClient } from '../config/apollo'
import validEnv from '../config/env'
import { config } from '../config/wagmi'
import '../styles/reset.css'
import { lightTheme } from '../styles/theme'
import { ConfigProvider } from 'antd'

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
    <>
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
                    }
                  }
                }}
              >
                <Component {...pageProps} />
              </ConfigProvider>
            </StyleSheetManager>
          </WagmiConfig>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default appWithTranslation(App)
