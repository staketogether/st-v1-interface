import { queryAssetsList } from '../queries/queryAsset'
import { stBackendClient } from '@/config/apollo'
import { AssetData } from '@/types/NewAsset'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

interface useAssetsListProps {
  offset?: number
  chainId: number
  limit?: number
  orderBy?: 'market_cap' | 'price' | 'volume'
  orderDirection?: 'desc' | 'asc'
  category?: 'Decentralized Finance (DeFi)' | 'Fan Token' | 'Stablecoins' | null
}

export default function useAssetsList({
  offset = 0,
  chainId,
  limit = 10,
  orderBy = 'market_cap',
  orderDirection = 'asc',
  category
}: useAssetsListProps) {
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)
  const { data, loading, fetchMore } = useQuery<{ assets: AssetData[] }>(queryAssetsList, {
    client: stBackendClient,
    variables: {
      offset,
      chainId,
      limit,
      orderBy,
      orderDirection,
      category
    }
  })

  const loadMore: (variables: useAssetsListProps) => Promise<void> = async variables => {
    if (loading || loadingFetchMore) return
    return
    setLoadingFetchMore(true)

    await fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoadingFetchMore(false)

        if (!fetchMoreResult) return prev
        return {
          assets: {
            ...fetchMoreResult.assets
          }
        }
      }
    })
  }
  return { AssetsList: data?.assets ?? [], initialLoading: loading, loadMoreLoading: loadingFetchMore, fetchMore: loadMore }
}
