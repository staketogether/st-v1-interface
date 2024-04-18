import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { ContentfulPool, ContentfulWithLocale } from '@/types/ContentfulPool'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface ContentfulPoolDetailsProps {
  poolAddress: `0x${string}` | undefined
  locale?: string
  fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'no-cache' | 'standby'
}

export default function useContentfulPoolDetails({ poolAddress, locale, fetchPolicy }: ContentfulPoolDetailsProps) {
  const [poolDetail, setPoolDetail] = useState<ContentfulWithLocale | null>(null)
  const [poolsIsLoading, setPoolsIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const requestLocale = locale ? locale : router.locale === 'en' ? 'en-US' : router.locale
  const { data, loading } = useQuery<{ poolCollection: { items: ContentfulPool[] } }>(queryContentfulPoolByAddress, {
    variables: {
      walletAddress: poolAddress?.toLocaleLowerCase(),
      locale: requestLocale
    },
    client: contentfulClient,
    fetchPolicy: fetchPolicy ? fetchPolicy : 'cache-first',
    skip: !poolAddress
  })

  useEffect(() => {
    const dataPool = data?.poolCollection.items[0]
    if (dataPool) {
      setPoolDetail({ ...data?.poolCollection.items[0], locale: requestLocale })
    } else {
      setPoolDetail(null)
    }
  }, [data, requestLocale])

  useEffect(() => {
    setPoolsIsLoading(loading)
  }, [loading, setPoolsIsLoading])

  return { poolDetail: poolDetail, loading: poolsIsLoading }
}
