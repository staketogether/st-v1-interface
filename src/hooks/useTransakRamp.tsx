import { Transak, TransakConfig } from '@transak/transak-sdk'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import useConnectedAccount from './useConnectedAccount'
import useLocaleTranslation from './useLocaleTranslation'
import useBuyRamp from '@/hooks/ramp/useBuyRamp'
import useSellToken from '@/hooks/ramp/useSellToken'
import { RampProviderType } from '@/types/rampProviderType'
import { PaymentMethodType } from '@/types/payment-method.type'
import { Asset } from '@/types/Asset'
import { notification } from 'antd'

interface TransakProps {
  onSuccess?: () => void
  onCreated?: () => void
  productsAvailed: 'BUY' | 'SELL',
  network: string,
  asset: Asset,
  containerId?: string,
  walletAddress?: string,
}

export default function useTransakRamp(config: TransakProps) {
  const theme = useTheme()
  const { t } = useLocaleTranslation()
  const { asset } = config
  const defaultTransakConfig: TransakConfig = useMemo(
    () => ({
      containerId: config.containerId,
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY!,
      environment: Transak.ENVIRONMENTS.STAGING,
      exchangeScreenTitle: config.productsAvailed === 'SELL'
        ? t('sellCryptoTitle').replace('Ether', asset.name)
        : t('buyCryptoTitle').replace('Ether', asset.name),
      network: config.network,
      colorMode: 'LIGHT',
      themeColor: theme.colorV2.blue[1],
      productsAvailed: config.productsAvailed,
      hideMenu: true,
    }),
    [asset.name, config.containerId, config.network, config.productsAvailed, t, theme.colorV2.blue]
  )

  const [transakConfig, setTransakConfig] = useState<TransakConfig>(defaultTransakConfig)
  const [transak, setTransak] = useState(new Transak(transakConfig))
  const [order, setOrder] = useState<unknown | undefined>(undefined)

  const { web3AuthUserInfo, account } = useConnectedAccount()
  const { locale } = useRouter()
  const [isClosed, setIsClosed] = useState(false)
  const fiatCurrencyCode = locale === 'pt' ? 'BRL' : 'USD'
  const isBuy = config.productsAvailed === 'BUY'
  const isSell = config.productsAvailed === 'SELL'

  const { error: buyingError } = useBuyRamp(
    'transak',
    !isBuy || order === undefined ? undefined : {
      amount: (order as any).amount,
      chainIdToReceive: asset.chains[0],
      fiatCurrencyCode,
      paymentMethod: PaymentMethodType.pix,
      receiverAddress: `${config.walletAddress}`,
      tokenToReceive: asset.symbol,
      accountAddress: `${config.walletAddress}`
    })
  const { error: sellingError } = useSellToken({
    fromChain: asset.chains[0],
    provider: RampProviderType.transak,
    fromToken: asset.symbol,
    walletAddress: `${config.walletAddress}`,
    pixKey: '09520405658',
    amount: !isSell || order === undefined ? 0 : (order as any).amount
  })

  useEffect(() => {
    const newTransakConfig: TransakConfig = {
      ...defaultTransakConfig,
      defaultFiatCurrency: locale === 'pt' ? 'BRL' : 'USD',
      disableWalletAddressForm: !!config.walletAddress,
      walletAddress: config.walletAddress,
      email: web3AuthUserInfo?.email ?? undefined
    }
    setTransakConfig(newTransakConfig)
  }, [account, config.walletAddress, defaultTransakConfig, locale, web3AuthUserInfo?.email])

  useEffect(() => {
    setTransak(new Transak(transakConfig))
  }, [transakConfig])

  useEffect(() => {
    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_INITIALISED, () => {
      console.log('Transak widget initialised')
    })

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      setIsClosed(true)
    })

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, orderData => {
      setOrder(orderData)
    })

    return () => {
      transak.cleanup()
      transak.close()
    }
  }, [config, transak, transakConfig])

  useEffect(() => {
    if (buyingError) {
      notification.error({ message: t('error'), description: t('errorBuyingCrypto').replace('Ether', asset.symbol) })
    }
  }, [asset.symbol, buyingError, t])

  useEffect(() => {
    if (sellingError) {
      notification.error({ message: t('error'), description: t('errorSellingCrypto').replace('Ether', asset.symbol) })
    }
  }, [asset.symbol, sellingError, t])

  const onInit = useCallback(() => {
    transak.init()
  }, [transak])

  const onClose = useCallback(() => {
    transak.close()
  }, [transak])

  return { transak, init: onInit, close: onClose, isClosed }
}
