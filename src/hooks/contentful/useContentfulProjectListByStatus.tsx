import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolsListByStatus } from '@/queries/contentful/queryContentfulPoolsListByStatus'
import { ContentfulPool } from '@/types/ContentfulPool'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

type useContentfulProjectListByStatusProps = {
  locale?: 'en-US' | 'pt'
  status: 'approved' | 'rejected' | 'pending'
  pagination?: { first: number; skip: number }
  projectAddress?: string
  projectName?: string
}

export default function useContentfulProjectListByStatus({
  locale = 'en-US',
  projectAddress,
  projectName,
  status,
  pagination = { first: 10, skip: 0 }
}: useContentfulProjectListByStatusProps) {
  const [projectList, setProjectList] = useState<ContentfulPool[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery<{ poolCollection: { items: ContentfulPool[] } }>(
    queryContentfulPoolsListByStatus,
    {
      variables: {
        locale,
        status,
        first: pagination.first,
        skip: pagination.skip,
        walletContains: projectAddress || null,
        nameContains: projectName || null
      },
      client: contentfulClient
    }
  )

  const loadMore = (variables: { poolAddress: string; first: number; skip: number }) => {
    setLoadingFetchMore(true)
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoadingFetchMore(false)
        if (!fetchMoreResult) {
          return prev
        }
        return {
          poolCollection: {
            items: [...prev.poolCollection.items, ...fetchMoreResult.poolCollection.items]
          }
        }
      }
    })
  }

  useEffect(() => {
    setProjectList(data?.poolCollection.items || [])
  }, [data])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading, setIsLoading])

  return {
    projectList,
    initialLoading: isLoading,
    loadingFetchMore: loadingFetchMore || isLoading,
    loadMore
  }
}
