import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Delegation } from "@/types/Delegation";
import { queryAccountDelegations } from "@/queries/queryAccountDelegations";

export default function useStAccountDelegations(account: string) {
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { data, loading: queryLoading } = useQuery<{ delegations: Delegation[] }>(queryAccountDelegations, {
    variables: { account: account.toLowerCase()}
  })

  useEffect(() => {
    setDelegations(data?.delegations || [])
  }, [data])

  useEffect(() => {
    setLoading(queryLoading)
  }, [queryLoading, setLoading])

  return { delegations, loading }
}
