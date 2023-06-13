import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherPooledEthByShares } from '../../types/Contracts'

export default function usePooledEthByShares(sharesAmount: BigNumber) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<string>('0')

  const pooledEthBySharesReq = useStakeTogetherPooledEthByShares({
    address: contracts.StakeTogether,
    args: [sharesAmount]
  })

  useEffect(() => {
    setBalance(pooledEthBySharesReq.data?.toString() || '0')
  }, [pooledEthBySharesReq.data])

  return balance
}
