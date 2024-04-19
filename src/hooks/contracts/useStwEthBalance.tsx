import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import chainConfig from '../../config/chain'
import { getStakingById } from '@/config/product/staking'

export default function useStwEthBalance(address: `0x${string}`) {
  const { chainId } = chainConfig()

  const { Withdrawals } = getStakingById('eth-staking').contracts

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
