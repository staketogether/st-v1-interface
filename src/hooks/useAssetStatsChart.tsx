import { globalConfig } from '@/config/global'
import axios from 'axios'
import useSWR from 'swr'
import { AssetStatsChart } from '@/types/AssetStatsChart'

interface UseAssetStatsChartProps {
  chainId: number
  contractAddress: string
  currency: 'brl' | 'eur' | 'usd'
  days: number
  interval: '5m' | 'hourly' | 'daily'
}

export default function useAssetStatsChart({ chainId, contractAddress, currency, days, interval }: UseAssetStatsChartProps) {
  const { backendUrl } = globalConfig

  const fetcher = () =>
    axios
      .get<AssetStatsChart>(`${backendUrl}/api/asset-stats/${chainId}/${contractAddress}/chart`, {
        params: {
          currency,
          days,
          interval
        }
      })
      .then(res => res.data)

  const swrKey = [`assets-stats`, chainId, contractAddress, days, interval, currency]

  const { data, error, mutate, isLoading } = useSWR<AssetStatsChart>(swrKey, fetcher)

  return { assetStats: data, isLoading, mutate, error }
}
