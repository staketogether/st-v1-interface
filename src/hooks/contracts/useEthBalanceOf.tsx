import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import chainConfig from '../../config/chain'
import useActiveChain from "@/hooks/useActiveChain";

export default function useEthBalanceOf(address?: `0x${string}`) {
  const { chainId } = useActiveChain()
  const [balance, setBalance] = useState<bigint>(0n)

  const { data, isFetching, refetch } = useBalance({
    address,
    chainId
  })

  const ethBalance = data?.value || 0n

  useEffect(() => {
    setBalance(ethBalance)
  }, [ethBalance])

  return { balance, isLoading: isFetching, refetch }
}
