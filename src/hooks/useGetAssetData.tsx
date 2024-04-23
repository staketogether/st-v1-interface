import { globalConfig } from '@/config/global'
import axios from 'axios'
import useSWR from 'swr'
import { MobulaMarketAssetResponse } from '@/types/MobulaMarketAsset'

interface UseGetAssetDataProps {
  asset: string
  blockchain: string
  symbol: string
}

export default function useGetAssetData({ asset, blockchain, symbol }: UseGetAssetDataProps) {
  const { backendUrl } = globalConfig

  const fetcher = () =>
    axios
      .get<MobulaMarketAssetResponse>(`${backendUrl}/api/mobula/market-asset-data`, {
        params: {
          asset: asset ? asset : null,
          blockchain: blockchain ? blockchain : null,
          symbol: symbol ? symbol : null
        }
      })
      .then(res => res.data)

  const swrKey = [`mobula/market-asset-data`, asset, blockchain, symbol]

  const { data, error, mutate, isLoading } = useSWR<MobulaMarketAssetResponse>(swrKey, fetcher)

  return { assetData: data?.data, isLoading, mutate, error }
}
