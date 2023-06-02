import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useStakeTogetherBalanceOf } from '../../types/Contracts'

export default function useCethBalanceOf(address: `0x${string}`) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<string>('0')

  const cethReq = useStakeTogetherBalanceOf({
    address: contracts.StakeTogether,
    args: [address],
    enabled: !!address
  })

  const cethBalance = cethReq.data?.toString() || '0'

  useEffect(() => {
    setBalance(cethBalance)
  }, [cethBalance])

  return balance
}
