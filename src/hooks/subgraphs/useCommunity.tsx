import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryCommunity } from '../../queries/queryCommunity'
import { Community } from '../../types/Community'

export default function useCommunity(address: string) {
  const [community, setCommunity] = useState<Community | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const { data, loading: communityLoading } = useQuery<{ community: Community }>(queryCommunity, {
    variables: { id: address }
  })

  useEffect(() => {
    setCommunity(data?.community)
  }, [data])

  useEffect(() => {
    setLoading(communityLoading)
  }, [communityLoading, setLoading])

  return { community, loading }
}
