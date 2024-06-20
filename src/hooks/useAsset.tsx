import { globalConfig } from '@/config/global'
import axios from 'axios'
import useSWR from 'swr'
import { Asset } from '@/types/Asset'

interface UseGetAssetStatsProps {
  chainId?: number
  assetId?: string
}

export default function useAsset({ chainId, assetId }: UseGetAssetStatsProps) {
  const { backendUrl } = globalConfig
  const isValid = !!(chainId && assetId)
  const fetcher = () => axios.get<Asset>(`${backendUrl}/api/assets/${chainId}/${assetId}`).then(res => res.data)

  const swrKey = [isValid ? `assets` : null, chainId, assetId, { dedupingInterval: 300000 }]

  const { data, error, mutate, isLoading } = useSWR<Asset>(swrKey, fetcher)

  return { asset: data, isLoading, mutate, error }
}
