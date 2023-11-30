import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import chainConfig from '../../config/chain'
import useActiveChain from "@/hooks/useActiveChain";

export default function useStwEthBalance(address: `0x${string}`) {
  const { config: chain } = useActiveChain()
  const { chainId, contracts } = chain
  const [balance, setBalance] = useState<bigint>(0n)

  const { data, isFetching, refetch } = useBalance({
    chainId,
    address: address,
    token: contracts.Withdrawals
  })

  const ethBalance = data?.value || 0n

  useEffect(() => {
    setBalance(ethBalance)
  }, [ethBalance])

  return { balance, isLoading: isFetching, refetch }
}
