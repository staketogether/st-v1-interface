import { globalConfig } from '@/config/global'
import axios from 'axios'
import useSWR from 'swr'
import { AssetStats } from '@/types/AssetStats'

interface UseGetAssetStatsProps {
  chainId?: number
  id?: string
}

export default function useAsset({ chainId, id }: UseGetAssetStatsProps) {
  const { backendUrl } = globalConfig
  const isValid = !!(chainId && id)
  const fetcher = () => axios.get<AssetStats>(`${backendUrl}/api/assets/${chainId}/${id}`).then(res => res.data)

  const swrKey = [isValid ? `assets` : null, chainId, id, { dedupingInterval: 300000 }]

  const { data, error, mutate, isLoading } = useSWR<AssetStats>(swrKey, fetcher)

  return { asset: data, isLoading, mutate, error }
}
