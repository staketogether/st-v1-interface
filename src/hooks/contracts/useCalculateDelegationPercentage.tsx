import { DelegationMap } from '@/types/Delegation'
import { useCallback, useEffect, useState } from 'react'
import useSharesByWei from '@/hooks/contracts/useSharesByWei'
import useStAccount from '@/hooks/subgraphs/useStAccount'
import { ethers } from 'ethers'

interface UseCalculateDelegationSharesProps {
  weiAmount: bigint
  pools: `0x${string}`[]
  accountAddress?: `0x${string}`
  subtractAmount?: boolean
}

export const useCalculateDelegationPercentage = ({
  weiAmount,
  accountAddress,
  pools,
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
    let currentDelegations = !account
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
          // Calculate the dividend of the shares
          const dividend = shares * oneEther
          // Calculate the pool percentage
          const poolSharesPercentage =
            dividend === 0n || newAccountShares === 0n ? 0n : dividend / newAccountShares
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

    // If there are remaining pools, then the remaining new percentage will be distributed equally among them
    remainingPools.map(pool => {
      const proportionalPercentage = remainingNewPercentage / BigInt(remainingPools.length)
      currentDelegations.push({
        pool,
        percentage: proportionalPercentage
      })
    })

    // If there are remaining new percentage, then it will be added to the pool with the biggest percentage
    if (remainingNewPercentage > 0n && remainingPools.length === 0) {
      currentDelegations = currentDelegations
        // Sort the delegations by percentage
        .sort((a, b) => Number(a.percentage) - Number(b.percentage))
        // Add the remaining new percentage to the pool with the biggest percentage
        .map((delegation, index) => {
          if (index === currentDelegations.length - 1) {
            return {
              pool: delegation.pool,
              // If the new account shares is 0, then it means that the user is withdrawing all his shares
              percentage:
                newAccountShares > 0n ? delegation.percentage + remainingNewPercentage : delegation.percentage
            }
          }

          return delegation
        })
    }

    setDelegations(currentDelegations.filter(delegation => delegation.percentage > 0n))
    setLoading(false)
    // TODO: Necessary to add the pool dep again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weiAmount, loadingNewAccountShares, newAccountShares, account, accountDelegations, subtractAmount])

  useEffect(() => {
    calculateDelegationShares()
  }, [calculateDelegationShares])

  return {
    delegations,
    loading
  }
}
