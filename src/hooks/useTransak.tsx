import { Transak, TransakConfig } from '@transak/transak-sdk'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import useLocaleTranslation from './useLocaleTranslation'
import { useRouter } from 'next/router'
import useConnectedAccount from './useConnectedAccount'

export default function useTransak() {
  const { t } = useLocaleTranslation()
  const theme = useTheme()
  const defaultTransakConfig: TransakConfig = useMemo(
    () => ({
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY as string,
      environment: Transak.ENVIRONMENTS.STAGING,
      network: 'ethereum',
      exchangeScreenTitle: t('buyCryptoTitle'),
      defaultNetwork: 'ethereum',
      colorMode: 'DARK',
      themeColor: theme.colorV2.blue[1],
      textColors: theme.colorV2.white,
      productsAvailed: ['BUY'],
      hideMenu: true,
      cryptoCurrencyList: 'ETH'
    }),
    [t, theme]
  )

  const [transakConfig, setTransakConfig] = useState<TransakConfig>(defaultTransakConfig)
  const [transak, setTransak] = useState(new Transak(transakConfig))

  const { web3AuthUserInfo, account } = useConnectedAccount()
  const { locale } = useRouter()

  useEffect(() => {
    const newTransakConfig: TransakConfig = {
      ...defaultTransakConfig,
      defaultFiatCurrency: locale === 'pt' ? 'BRL' : 'USD',
      disableWalletAddressForm: account ? true : false,
      walletAddress: account || undefined,
      email: web3AuthUserInfo?.email || undefined
    }
    setTransakConfig(newTransakConfig)
  }, [account, defaultTransakConfig, locale, web3AuthUserInfo?.email])

  useEffect(() => {
    setTransak(new Transak(transakConfig))
  }, [transakConfig])

  useEffect(() => {
    Transak.on('*', data => {
      console.log(data)
    })

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      console.log('Transak SDK closed!')
    })

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, orderData => {
      console.log(orderData)
    })

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
      console.log(orderData)
      transak.close()
    })

    return () => {
      transak.close()
    }
  }, [transak, transakConfig])

  const onInit = () => {
    transak.init()
  }

  const onClose = () => {
    transak.close()
  }
  return { transak, onInit, onClose }
}
