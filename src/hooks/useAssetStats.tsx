import { globalConfig } from '@/config/global'
import axios from 'axios'
import useSWR from 'swr'
import { AssetStats } from '@/types/AssetStats'

interface UseGetAssetStatsProps {
  chainId?: number
  contractAddress?: string
}

export default function useAssetStats({ chainId, contractAddress }: UseGetAssetStatsProps) {
  const { backendUrl } = globalConfig
  const isValid = !!(chainId && contractAddress)
  const fetcher = () => axios.get<AssetStats>(`${backendUrl}/api/assets/${chainId}/${contractAddress}`).then(res => res.data)

  const swrKey = [isValid ? `assets-stats` : null, chainId, contractAddress, { dedupingInterval: 300000 }]

  const { data, error, mutate, isLoading } = useSWR<AssetStats>(swrKey, fetcher)

  return { assetStats: data, isLoading, mutate, error }
}
