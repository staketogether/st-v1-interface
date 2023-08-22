import { DelegationMap } from '@/types/Delegation'
import { useCallback, useEffect, useState } from 'react'
import useSharesByWei from '@/hooks/contracts/useSharesByWei'
import useStAccount from '@/hooks/subgraphs/useStAccount'
import { ethers } from "ethers";

interface UseCalculateDelegationSharesProps {
  weiAmount: bigint
  pools: `0x${string}`[]
  accountAddress?: `0x${string}`
  onlyUpdatedPools?: boolean
  subtractAmount?: boolean
}

export const useCalculateDelegationPercentage = ({
                                                   weiAmount,
                                                   accountAddress,
                                                   pools,
                                                   onlyUpdatedPools,
                                                   subtractAmount
                                                 }: UseCalculateDelegationSharesProps) => {
  const [delegations, setDelegations] = useState<DelegationMap[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { account, accountDelegations } = useStAccount(accountAddress || '0x000000')
  const { loading: loadingNewAccountShares, shares: newShares } = useSharesByWei(weiAmount)
  const accountShares = BigInt(account?.shares || 0n)
  const newAccountShares = subtractAmount ? accountShares - newShares : accountShares + newShares

  const calculateDelegationShares = useCallback(async () => {
    setLoading(true)

    if (weiAmount === 0n) {
      setDelegations([])
      setLoading(false)
      return
    }

    if (loadingNewAccountShares) {
      return
    }

    const oneEther = ethers.parseEther('1')
    let remainingNewPercentage = oneEther

    // Calculate current pools percentage by its shares
    const currentDelegations = !account
      ? []
      : accountDelegations.map(delegation => {
        const poolToBeUpdated = pools.find(pool => pool === delegation.delegated.address.toLowerCase())
        let shares = BigInt(delegation.delegationShares)
        // If the pool is in the list of pools to be updated, then the shares will be updated
        if (poolToBeUpdated) {
          if (subtractAmount) {
            shares -= newShares
          } else {
            shares += newShares
          }
        }
        // Calculate the percentage of the pool
        const poolSharesPercentage = shares * oneEther / newAccountShares
        // Reduce the remaining new shares by the pool percentage
        remainingNewPercentage -= poolSharesPercentage

        return {
          pool: delegation.delegated.address,
          percentage: poolSharesPercentage
        }
      })

    const remainingPools = pools.filter(pool => {
      return currentDelegations.find(delegation => delegation.pool.toLowerCase() === pool) === undefined
    })

    console.log('remaining pools', remainingPools)
    // If there are remaining pools, then the remaining new percentage will be distributed equally among them
    remainingPools.map(pool => {
      const proportionalPercentage = remainingNewPercentage / BigInt(remainingPools.length)
      console.log('proportionalPercentage', proportionalPercentage.toString())
      console.log('remainingPools.length', remainingPools.length)
      currentDelegations.push({
        pool,
        percentage: proportionalPercentage
      })
    })

    const filteredDelegations = currentDelegations.filter(delegation => {
      return onlyUpdatedPools ? pools.find(pool => pool === delegation.pool.toLowerCase()) !== undefined : true
    })

    setDelegations(filteredDelegations)
    setLoading(false)
    // TODO: Necessary to add the pool dep again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weiAmount, loadingNewAccountShares, newAccountShares, account, accountDelegations, subtractAmount, onlyUpdatedPools])

  useEffect(() => {
    calculateDelegationShares()
  }, [calculateDelegationShares])

  return {
    delegations,
    loading
  }
}
