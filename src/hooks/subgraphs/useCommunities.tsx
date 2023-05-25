import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryCommunities } from '../../queries/queryCommunities'
import { Community } from '../../types/Community'

export default function useCommunities() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [communitiesIsLoading, setCommunitiesIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ communities: Community[] }>(queryCommunities)

  useEffect(() => {
    setCommunities(data?.communities || [])
  }, [data])

  useEffect(() => {
    setCommunitiesIsLoading(loading)
  }, [loading, setCommunitiesIsLoading])

  return { communities, communitiesIsLoading }
}
