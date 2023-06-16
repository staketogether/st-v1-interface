import { BigNumber } from 'ethers'
import chainConfig from '../../config/chain'
import { useStakeTogetherPooledEthByShares } from '../../types/Contracts'
import { useEffect, useState } from 'react'

export default function usePooledEthByShares(sharesAmount: BigNumber) {
  const [pooledEthByShares, setPooledEthByShares] = useState('0')
  const { contracts } = chainConfig()

  const { data, isFetching } = useStakeTogetherPooledEthByShares({
    address: contracts.StakeTogether,
    args: [sharesAmount]
  })

  useEffect(() => {
    if (data) {
      setPooledEthByShares(data.toString())
    }
  }, [data])

  return {
    pooledEthByShares,
    loading: isFetching
  }
}
