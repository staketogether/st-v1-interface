import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { ContentfulPool } from '@/types/ContentfulPool'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useContentfulPoolDetails(poolAddress: `0x${string}` | undefined) {
  const [poolDetail, setPoolDetail] = useState<ContentfulPool | null>(null)
  const [poolsIsLoading, setPoolsIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const { data, loading } = useQuery<{ poolCollection: { items: ContentfulPool[] } }>(
    queryContentfulPoolByAddress,
    {
      variables: {
        walletAddress: poolAddress?.toLocaleLowerCase(),
        locale: router.locale === 'en' ? 'en-US' : router.locale
      },
      client: contentfulClient,
      skip: !poolAddress
    }
  )

  useEffect(() => {
    setPoolDetail(data?.poolCollection.items[0] || null)
  }, [data])

  useEffect(() => {
    setPoolsIsLoading(loading)
  }, [loading, setPoolsIsLoading])

  return { poolDetail: poolDetail, loading: poolsIsLoading }
}
