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
  excludeProjectAddress?: `0x${string}`[]
}

export default function useContentfulProjectListByStatus({
  locale = 'en-US',
  projectAddress,
  projectName,
  status,
  pagination = { first: 10, skip: 0 },
  excludeProjectAddress
}: useContentfulProjectListByStatusProps) {
  const [projectList, setProjectList] = useState<ContentfulPool[]>([])
  const [totalProjects, setTotalProjects] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingFetchMore, setLoadingFetchMore] = useState<boolean>(false)

  const { data, loading, fetchMore } = useQuery<{ poolCollection: { total: number; items: ContentfulPool[] } }>(
    queryContentfulPoolsListByStatus,
    {
      variables: {
        locale,
        status,
        first: pagination.first,
        skip: pagination.skip,
        walletContains: projectAddress || null,
        nameContains: projectName || null,
        walletNotIn: excludeProjectAddress || null
      },
      client: contentfulClient
    }
  )

  const loadMore = (variables: { first: number; skip: number }) => {
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
            ...fetchMoreResult.poolCollection,
            items: [...prev.poolCollection.items, ...fetchMoreResult.poolCollection.items]
          }
        }
      }
    })
  }

  useEffect(() => {
    setProjectList(data?.poolCollection.items || [])
    setTotalProjects(data?.poolCollection.total || 0)
  }, [data])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading, setIsLoading])

  return {
    projectList,
    initialLoading: isLoading,
    totalProjects,
    loadingFetchMore: loadingFetchMore || isLoading,
    loadMore
  }
}
