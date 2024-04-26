import useAssetStatsChart from '@/hooks/useAssetStatsChart'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import { Asset } from '@/types/Asset'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'

interface PriceChartProps {
  asset: Asset
}

export default function PriceChart({ asset }: PriceChartProps) {
  const { locale } = useRouter()
  const getLocale = () => {
    return locale === 'en' ? 'en-US' : 'pt-BR'
  }

  const { assetStats, isLoading } = useAssetStatsChart({
    chainId: asset.chains[0],
    contractAddress: asset.contractAddress,
    currency: 'usd',
    days: 30,
    interval: 'daily'
  })

  const { handleQuotePrice } = useCoinUsdToUserCurrency()

  const data = assetStats?.prices.length
    ? assetStats.prices.map(item => {
        const dateTime = DateTime.fromMillis(item[0]).toRelative({
          locale: getLocale(),
          style: 'short'
        })
        return {
          timestamp: dateTime,
          price: item[1]
        }
      })
    : []

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
            style={{ fontSize: 11 }}
          >
            <CartesianGrid strokeDasharray='2 2' />
            <Tooltip
              wrapperStyle={{ fontSize: 11 }}
              labelStyle={{ color: '#373b8a' }}
              labelFormatter={(item, payload) => {
                return <span>{payload[0]?.payload.timestamp}</span>
              }}
              formatter={(value: number) => handleQuotePrice(value)}
              contentStyle={{ borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 2 }}
            />
            <Area type='monotone' dataKey='price' stroke='#774bc7' fill='#b993ff' />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
