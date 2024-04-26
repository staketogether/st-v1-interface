import { globalConfig } from '@/config/global'
import axios from 'axios'
import useSWR from 'swr'
import { AssetStats } from '@/types/AssetStats'

interface UseGetAssetStatsProps {
  chainId: number
  contractAddress: string
}

export default function useGetAssetStats({ chainId, contractAddress }: UseGetAssetStatsProps) {
  const { backendUrl } = globalConfig

  const fetcher = () =>
    axios
      .get<AssetStats>(`${backendUrl}/api/asset-stats/${chainId}/${contractAddress}`)
      .then(res => res.data)

  const swrKey = [`assets-stats`, chainId, contractAddress]

  const { data, error, mutate, isLoading } = useSWR<AssetStats>(swrKey, fetcher)

  return { assetStats: data, isLoading, mutate, error }
}
