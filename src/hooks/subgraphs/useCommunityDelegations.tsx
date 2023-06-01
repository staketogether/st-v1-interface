import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Delegation } from "@/types/Delegation"
import { queryCommunityDelegations } from "@/queries/queryCommunityDelegations"

export default function useCommunityDelegations(communityId: string) {
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { data, loading: queryLoading } = useQuery<{ delegations: Delegation[] }>(queryCommunityDelegations, {
    variables: { communityId: communityId?.toLowerCase()},
    skip: !communityId
  })

  useEffect(() => {
    setDelegations(data?.delegations || [])
  }, [data])

  useEffect(() => {
    setLoading(queryLoading)
  }, [queryLoading, setLoading])

  return { delegations, loading }
}
