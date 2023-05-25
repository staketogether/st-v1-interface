import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryCommunities } from '../../queries/queryCommunities'
import getSearchCommunities from '../../services/getSearchCommunities'
import { Community, ENSCommunity } from '../../types/Community'

export default function useSearchCommunities() {
  const [searchCommunities, setSearchCommunities] = useState<ENSCommunity[]>([])
  const [searchCommunitiesIsLoading, setSearchCommunitiesIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ communities: Community[] }>(queryCommunities)

  useEffect(() => {
    const getEnsCommunities = async () => {
      const addresses = data?.communities.map(community => community.address) || []
      const communities = await getSearchCommunities(addresses)
      setSearchCommunities(communities)
    }

    getEnsCommunities()
  }, [data])

  useEffect(() => {
    setSearchCommunitiesIsLoading(loading)
  }, [loading])

  return { searchCommunities, searchCommunitiesIsLoading }
}
