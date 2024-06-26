import useAssetChart from '@/hooks/useAssetChart'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import loadingAnimation from '@assets/animations/loading-animation.json'
import { Grid } from 'antd'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styled from 'styled-components'
import LottieAnimation from './LottieAnimation'
import { Asset } from '@/types/Asset'

interface PriceChartProps {
  asset?: Asset
  assetId: string
  chainId: number
}

const { useBreakpoint } = Grid

type PriceChartFilter = '1W' | '1M' | '3M' | '1Y'

export default function PriceChart({ assetId, chainId }: PriceChartProps) {
  const [activeFilter, setActiveFilter] = useState<PriceChartFilter>('1M')
  const [chartData, setChartData] = useState<{ timestamp: string; price: number }[]>([])

  const { t } = useLocaleTranslation()
  const { xs, sm } = useBreakpoint()

  const filterChartOptions: PriceChartFilter[] = ['1W', '1M', '3M', '1Y']

  const filterChartLabels = {
    '1W': t('v3.chart.filter.oneWeek'),
    '1M': t('v3.chart.filter.oneMonth'),
    '3M': t('v3.chart.filter.threeMonths'),
    '1Y': t('v3.chart.filter.oneYear')
  }

  const handleFilter = () => {
    const filters: Record<PriceChartFilter, { day: number; interval: '5m' | 'hourly' | 'daily' }> = {
      '1W': { day: 7, interval: 'daily' },
      '1M': { day: 30, interval: 'daily' },
      '3M': { day: 90, interval: 'daily' },
      '1Y': { day: 365, interval: 'daily' }
    }

    return filters[activeFilter]
  }

  const { assetStats, isLoading } = useAssetChart({
    chainId,
    contractAddress: assetId,
    currency: 'usd',
    days: handleFilter().day,
    interval: handleFilter().interval,
    refreshInterval: 30 * 1000
  })

  const { handleQuotePrice } = useCoinUsdToUserCurrency()

  useEffect(() => {
    const statsChartData: { timestamp: string; price: number }[] = assetStats?.prices?.length
      ? assetStats.prices.map(item => {
          const dateTime = DateTime.fromMillis(item[0]).toLocaleString()
          return {
            timestamp: dateTime,
            price: item[1]
          }
        })
      : []

    setChartData(statsChartData)
  }, [assetStats?.prices])

  return (
    <>
      <Container>
        {isLoading ? (
          <LoadingChart>
            <LottieAnimation animationData={loadingAnimation} height={58} width={58} loop />
          </LoadingChart>
        ) : (
          <FormattedResponsiveContainer width='100%' minWidth={350} height={287}>
            <AreaChart
              data={chartData}
              margin={{
                top: 24,
                left: 24,
                right: !xs && !sm ? 39 : 6,
                bottom: 24
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
                formatter={(value: number) => [handleQuotePrice(value), t('v2.ramp.quote.price')]}
                contentStyle={{ borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 2 }}
              />
              <Area type='monotone' dataKey='price' stroke='#774bc7' fill='#b993ff' />
              <XAxis hide interval='equidistantPreserveStart' />
              <YAxis
                domain={['dataMin', 'auto']}
                orientation='right'
                tickFormatter={value => handleQuotePrice(Number(value))}
                dataKey='price'
                interval='equidistantPreserveStart'
              />
            </AreaChart>
          </FormattedResponsiveContainer>
        )}
        <FilterChartData>
          {filterChartOptions.map((option, i) => (
            <div className={`${activeFilter === option && 'active'}`} key={`${i}-${option}`} onClick={() => setActiveFilter(option)}>
              {filterChartLabels[option]}
            </div>
          ))}
        </FilterChartData>
      </Container>
    </>
  )
}

const { Container, LoadingChart, FilterChartData, FormattedResponsiveContainer } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    align-items: start;
  `,
  LoadingChart: styled.div`
    width: 100%;
    min-height: 287px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  FilterChartData: styled.div`
    border-radius: ${({ theme }) => theme.size[8]};
    border: 1px solid ${({ theme }) => theme.colorV2.gray[2]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    background: ${({ theme }) => theme.colorV2.white};

    align-items: center;
    display: flex;
    gap: ${({ theme }) => theme.size[4]};

    font-size: ${({ theme }) => theme.font.size[12]};
    padding: 0;

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 6px ${({ theme }) => theme.size[12]};
      border-radius: ${({ theme }) => theme.size[8]};
      cursor: pointer;
      transition: background 0.3s ease-out;

      &:hover,
      &.active {
        background: ${({ theme }) => theme.colorV2.purple[2]};

        color: ${({ theme }) => theme.colorV2.white};
      }
    }
  `,
  FormattedResponsiveContainer: styled(ResponsiveContainer)`
    background-color: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `
}
