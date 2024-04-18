import { globalConfig } from '@/config/global'
import { ProductMarketAssetData } from '@/types/ProductStaking'
import axios from 'axios'
import useSWR from 'swr'

interface UseGetAssetDataProps {
  asset: string
  blockchain: string
  symbol: string
}

export default function useGetAssetData({ asset, blockchain, symbol }: UseGetAssetDataProps) {
  const { backendUrl } = globalConfig

  const fetcher = () =>
    axios
      .get<ProductMarketAssetData>(`${backendUrl}/api/mobula/market-asset-data`, {
        params: {
          asset: asset ? asset : null,
          blockchain: blockchain ? blockchain : null,
          symbol: symbol ? symbol : null
        }
      })
      .then(res => res.data)

  const swrKey = [`mobula/market-asset-data`, asset, blockchain, symbol]

  const { data, error, mutate, isLoading } = useSWR<ProductMarketAssetData>(swrKey, fetcher)

  return { assetData: data?.data, isLoading, mutate, error }
}
