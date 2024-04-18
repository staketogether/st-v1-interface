import { getStakingContracts } from '@/config/products/staking'
import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import chainConfig from '../../config/chain'

export default function useStwEthBalance(address: `0x${string}`) {
  const { chainId, isTestnet } = chainConfig()
  const { Withdrawals } = getStakingContracts({ name: 'ethereum-stake', isTestnet })
  const [balance, setBalance] = useState<bigint>(0n)

  const { data, isFetching, refetch } = useBalance({
    chainId,
    address: address,
    token: Withdrawals
  })

  const ethBalance = data?.value ?? 0n

  useEffect(() => {
    setBalance(ethBalance)
  }, [ethBalance])

  return { balance, isLoading: isFetching, refetch }
}
