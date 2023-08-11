import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryAccountDelegations } from '../queries/queryAccountDelegations'
import { AccountDelegations } from '../types/Account'
import { DelegationMap } from '../types/Delegation'
import useSharesByPooledEth from './contracts/useSharesByPooledEth'

export default function useAccountDelegations(
  pool: `0x${string}`,
  amount: bigint,
  type: 'deposit' | 'withdraw',
  account?: `0x${string}`
) {
  const [delegations, setDelegations] = useState<DelegationMap[]>([])

  const { data, loading } = useQuery<{ account: AccountDelegations }>(queryAccountDelegations, {
    variables: { id: account?.toLowerCase(), skip: !account }
  })

  const sharesByEth = useSharesByPooledEth(amount)

  useEffect(() => {
    const updateShares = (delegations: DelegationMap[], sharesAmount: bigint) => {
      // Todo: implement shares

      return delegations
    }

    let newDelegations =
      data?.account.delegations.map(delegation => ({
        pool: delegation.delegated.address,
        shares: delegation.delegationShares
      })) || []

    const sharesAmount = sharesByEth.balance || 0n

    newDelegations = updateShares(newDelegations, sharesAmount)

    setDelegations(newDelegations)
  }, [data?.account.delegations, sharesByEth.balance, pool, type])

  return { delegations, loading }
}
