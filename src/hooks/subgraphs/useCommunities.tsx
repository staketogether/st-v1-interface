import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryCommunities } from '../../queries/queryCommunities'
import { queryCommunitiesDelegations } from '../../queries/queryCommunitiesDelegations'
import { Community } from '../../types/Community'

export default function useCommunities(delegations?: boolean) {
  const [communities, setCommunities] = useState<Community[]>([])
  const [communitiesIsLoading, setCommunitiesIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ communities: Community[] }>(
    delegations ? queryCommunitiesDelegations : queryCommunities
  )

  useEffect(() => {
    setCommunities(data?.communities || [])
  }, [data])

  useEffect(() => {
    setCommunitiesIsLoading(loading)
  }, [loading, setCommunitiesIsLoading])

  return { communities, communitiesIsLoading }
}
