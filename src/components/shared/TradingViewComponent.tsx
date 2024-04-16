import { TradingViewFiatData } from '@/types/ProductAsset'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

const AdvancedRealTimeChart = dynamic(
  () => import('react-ts-tradingview-widgets').then(w => w.AdvancedRealTimeChart),
  { ssr: false }
)

type TradingViewComponentProps = {
  tradingView: {
    symbol: string
    fiat: TradingViewFiatData
  }
}

const TradingViewComponent = ({ tradingView }: TradingViewComponentProps) => {
  const { query } = useRouter()
  const { currency } = query

  const currencies = useMemo(() => tradingView.fiat, [tradingView.fiat])

  const selectedCurrency = useMemo(
    () =>
      (currency as keyof typeof currencies)
        ? currencies[currency as keyof typeof currencies]
        : tradingView.symbol,
    [currency, currencies, tradingView.symbol]
  )

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <AdvancedRealTimeChart
        symbol={selectedCurrency}
        hide_side_toolbar
        hide_top_toolbar
        hide_legend
        height={320}
        calendar={false}
        range='12M'
        interval='1'
        width={'100%'}
        theme='light'
        copyrightStyles={{ parent: { display: 'none' }, link: { background: 'red' } }}
        style='3'
        disabled_features={['create_volume_indicator_by_default']}
      />
    </div>
  )
}

export default React.memo(TradingViewComponent)
