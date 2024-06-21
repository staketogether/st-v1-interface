import { useEffect, useState } from 'react'
import { erc20Abi, formatUnits } from 'viem'
import { useAccount, useBalance, useReadContract } from 'wagmi'

interface useBalanceOfProps {
  contractAddress?: string
  type: 'native' | 'erc20'
  chainId: number
  decimals?: number
  walletAddress?: `0x${string}`
}

export interface TokenBalance {
  rawBalance: bigint
  balance: string
}

export default function useBalanceOf({ contractAddress, decimals, type, chainId, walletAddress }: useBalanceOfProps) {
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    rawBalance: BigInt(0),
    balance: '0'
  })

  const { address: accountAddress } = useAccount()

  const address = walletAddress ? walletAddress : accountAddress ?? '0x0'

  const {
    isLoading: nativeIsLoading,
    isFetching: nativeIsFetching,
    refetch: nativeRefetch,
    data: nativeData
  } = useBalance({
    address,
    chainId,
    query: {
      enabled: type === 'native' && !!address
    }
  })

  useEffect(() => {
    if (nativeData && type === 'native' && decimals) {
      const balance = formatUnits(nativeData.value, decimals)
      const rawBalance = nativeData.value

      setTokenBalance({ rawBalance, balance })
    }
  }, [nativeData, type, decimals])

  const {
    data: erc20Data,
    isFetching: erc20Fetching,
    isLoading: erc20Loading,
    refetch: erc20Refetch
  } = useReadContract({
    abi: erc20Abi,
    address: contractAddress as `0x${string}`,
    chainId: chainId,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: type !== 'native' && !!address
    }
  })

  useEffect(() => {
    if (erc20Data !== undefined && type !== 'native' && decimals) {
      const balance = formatUnits(erc20Data, decimals)
      const rawBalance = erc20Data

      setTokenBalance({ rawBalance, balance })
    }
  }, [erc20Data, type, decimals])

  const isLoading = type === 'native' ? nativeIsLoading || nativeIsFetching : erc20Fetching || erc20Loading
  const refetch = type === 'native' ? nativeRefetch : erc20Refetch

  return { isLoading, tokenBalance, refetch }
}
