import { queryAssetsList } from '../queries/queryAsset'
import { stBackendClient } from '@/config/apollo'
import { AssetData } from '@/types/NewAsset'
import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

interface useAssetsListProps {
  offset?: number
  chainId: number
  limit?: number
  orderBy?: 'market_cap' | 'price' | 'price_change_24h'
  orderDirection?: 'desc' | 'asc'
  category?: 'Decentralized Finance (DeFi)' | 'Fan Token' | 'Stablecoins' | null
}

export default function useAssetsList({
  offset = 0,
  chainId,
  limit = 10,
  orderBy = 'market_cap',
  orderDirection = 'desc',
  category
}: useAssetsListProps) {
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true)
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

  useEffect(() => {
    setHasMoreItems(true)
  }, [category, orderDirection, chainId, orderBy])

  const loadMore = useCallback(
    async (variables: useAssetsListProps) => {
      if (loading || loadingFetchMore) {
        return
      }
      setLoadingFetchMore(true)

      await fetchMore({
        variables,
        updateQuery: (prev, { fetchMoreResult }) => {
          setLoadingFetchMore(false)
          if (fetchMoreResult.assets.length < limit) {
            setHasMoreItems(false)
          }
          if (!fetchMoreResult) return prev
          return {
            assets: [...prev.assets, ...fetchMoreResult.assets]
          }
        }
      })
    },
    [fetchMore, limit, loading, loadingFetchMore]
  )

  return {
    assetsList: data?.assets ?? [],
    hasMoreItems,
    initialLoading: loading,
    loadMoreLoading: loadingFetchMore,
    fetchMore: loadMore
  }
}
