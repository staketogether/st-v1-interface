import dynamic from 'next/dynamic'
const AdvancedRealTimeChart = dynamic(
  () => import('react-ts-tradingview-widgets').then(w => w.AdvancedRealTimeChart),
  {
    ssr: false
  }
)

export default function TradingViewComponent() {
  return (
    <AdvancedRealTimeChart
      symbol='ETHUSD'
      hide_side_toolbar
      hide_top_toolbar
      hide_legend
      height={500}
      calendar={false}
      range='12M'
      interval='1'
      width={'100%'}
      theme='light'
      timezone='America/Sao_Paulo'
      copyrightStyles={{ parent: { display: 'none' }, link: { background: 'red' } }}
      style='3'
      disabled_features={['create_volume_indicator_by_default']}
    />
  )
}
