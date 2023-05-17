import { useEffect, useState } from 'react'
import chainConfig from '../../config/chain'
import { useCethBalanceOf as useCethBalanceOfContract } from '../../types/Contracts'

export default function useCethBalanceOf(address?: `0x${string}`) {
  const { contracts } = chainConfig()

  const [balance, setBalance] = useState<string>('0')

  const cethReq = useCethBalanceOfContract({
    address: contracts.StakeTogether,
    args: [address as `0x${string}`],
    enabled: !!address,
    watch: true
  })

  const cethBalance = cethReq.data?.toString() || '0'

  useEffect(() => {
    setBalance(cethBalance)
  }, [cethBalance])

  return balance
}
