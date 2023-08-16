import { DelegationMap } from "@/types/Delegation";
import { useCallback, useEffect, useState } from "react";
import useSharesByWei from "@/hooks/contracts/useSharesByWei";
import useStAccount from "@/hooks/subgraphs/useStAccount";

interface UseCalculateDelegationSharesProps {
  weiAmount: bigint
  pools: `0x${string}`[],
  accountAddress?: `0x${string}`
  onlyUpdatedPools?: boolean
  subtractAmount?: boolean
}

export const useCalculateDelegationShares = ({ weiAmount, accountAddress, pools, onlyUpdatedPools, subtractAmount }: UseCalculateDelegationSharesProps) => {
  const [delegations, setDelegations] = useState<DelegationMap[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { loading: loadingNewShares, shares: newShares } = useSharesByWei(weiAmount)
  const {account, accountDelegations} = useStAccount(accountAddress || '0x000000')

  const calculateDelegationShares = useCallback(async () => {
    setLoading(true)

    if (weiAmount === 0n) {
      setDelegations([])
      setLoading(false)
      return
    }

    if (loadingNewShares) {
      return
    }

    let remainingNewShares = BigInt(newShares)

    const delegations = !account ? [] : accountDelegations.map(delegation => {
      const shares = BigInt(delegation.delegationShares)
      const poolSharesPercentage = (shares * 100n) / BigInt(account.shares)
      const newSharesProportional = (newShares * poolSharesPercentage) / 100n
      const poolToBeUpdated = pools.find(pool => pool === delegation.delegated.address.toLowerCase())
      // If the pool is not in the list of pools to be updated, then the shares will remain the same
      let delegationShares = shares

      // If the pool is in the list of pools to be updated, then the remaining new shares will be reduced by the proportional amount
      if (poolToBeUpdated) {
        remainingNewShares -= newSharesProportional
        delegationShares = subtractAmount ? shares - newSharesProportional : shares + newSharesProportional
      }

      return {
        pool: delegation.delegated.address,
        shares: delegationShares
      }
    })

    const remainingPools = pools.filter(pool => {
      return delegations.find(delegation => delegation.pool.toLowerCase() === pool) === undefined
    })

    // If there are remaining pools, then the remaining new shares will be distributed equally among them
    remainingPools.map(pool => {
      const poolProportionalShares = remainingNewShares / BigInt(remainingPools.length)
      delegations.push({
        pool,
        shares: poolProportionalShares
      })
    })

    const filteredDelegations = delegations.filter(delegation => {
      return onlyUpdatedPools ? pools.find(pool => pool === delegation.pool.toLowerCase()) !== undefined : true
    })

    setDelegations(filteredDelegations)
    setLoading(false)
    // TODO: Necessary to add the pool dep again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weiAmount, loadingNewShares, newShares, account, accountDelegations, subtractAmount, onlyUpdatedPools])

  useEffect(() => {
    calculateDelegationShares()
  }, [calculateDelegationShares]);

  return {
    delegations,
    loading
  }
}
