import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherPooledEthByShares } from '../../types/Contracts'

export default function usePooledEthByShares(sharesAmount: BigNumber) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<string>('0')

  const pooledEthBySharesReq = useStakeTogetherPooledEthByShares({
    address: contracts.StakeTogether,
    args: [sharesAmount],
    watch: true
  })

  const pooledEthByShares = pooledEthBySharesReq.data?.toString() || '0'

  useEffect(() => {
    setBalance(pooledEthByShares)
  }, [pooledEthByShares])

  return balance
}
