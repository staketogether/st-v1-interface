import { contentfulClient } from '@/config/apollo'
import { queryPoolByAddress } from '@/queries/contentful/queryPoolByAddress'
import { PoolDetail } from '@/types/PoolDetail'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function usePoolDetailByAddress(poolAddress: `0x${string}` | undefined) {
  const [poolDetail, setPoolDetail] = useState<PoolDetail | null>(null)
  const [poolsIsLoading, setPoolsIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const { data, loading } = useQuery<{ poolCollection: { items: PoolDetail[] } }>(queryPoolByAddress, {
    variables: { walletAddress: poolAddress, locale: router.locale === 'en' ? 'en-US' : router.locale },
    client: contentfulClient,
    skip: !poolAddress
  })

  useEffect(() => {
    setPoolDetail(data?.poolCollection.items[0] || null)
  }, [data])

  useEffect(() => {
    setPoolsIsLoading(loading)
  }, [loading, setPoolsIsLoading])

  return { poolDetail: poolDetail, loading: poolsIsLoading }
}
