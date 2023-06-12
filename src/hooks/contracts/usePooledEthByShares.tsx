import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherPooledEthByShares } from '../../types/Contracts'

export default function usePooledEthByShares(sharesAmount: BigNumber) {
  const { contracts } = chainConfig()

  const pooledEthBySharesReq = useStakeTogetherPooledEthByShares({
    address: contracts.StakeTogether,
    args: [sharesAmount]
  })

  const balance = useMemo(() => {
    return pooledEthBySharesReq.data?.toString() || '0'
  }, [pooledEthBySharesReq.data])

  return balance
}
