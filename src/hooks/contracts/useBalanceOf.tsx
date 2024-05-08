import { useEffect, useState } from 'react'
import { erc20Abi, formatUnits } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

interface useBalanceOfProps {
  contractAddress: `0x${string}`
  walletAddress?: `0x${string}`
  chainId: number
  decimals: number
}

interface TokenBalance {
  rawBalance: bigint
  balance: string
}

export default function useBalanceOf({ contractAddress, walletAddress, chainId, decimals }: useBalanceOfProps) {
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    rawBalance: BigInt(0),
    balance: '0'
  })

  const { address: accountAddress } = useAccount()

  const address = walletAddress ? walletAddress : accountAddress ?? '0x0'
  const { data, isFetching, isLoading, refetch } = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    chainId: chainId,
    functionName: 'balanceOf',
    args: [address]
  })

  useEffect(() => {
    if (data) {
      const balance = formatUnits(data, decimals)
      const rawBalance = data

      setTokenBalance({ rawBalance, balance })
    }
  }, [data, decimals])

  return { isLoading: isFetching || isLoading, refetch, tokenBalance }
}
