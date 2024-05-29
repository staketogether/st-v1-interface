import { Asset } from '@/types/Asset'
import { useEffect, useState } from 'react'
import { erc20Abi, formatUnits } from 'viem'
import { useAccount, useBalance, useReadContract } from 'wagmi'

interface useBalanceOfProps {
  asset: Asset
  walletAddress?: `0x${string}`
}

export interface TokenBalance {
  rawBalance: bigint
  balance: string
}

export default function useBalanceOf({ asset, walletAddress }: useBalanceOfProps) {
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    rawBalance: BigInt(0),
    balance: '0'
  })

  const [chainId] = asset.chains
  const { address: accountAddress } = useAccount()

  const address = walletAddress ? walletAddress : accountAddress ?? '0x0'

  const {
    isLoading: nativeIsLoading,
    isFetching: nativeIsFetching,
    refetch: nativeRefetch,
    data: nativeData
  } = useBalance({
    address: address,
    chainId,
    query: {
      enabled: asset.type === 'native' && !!address
    }
  })

  useEffect(() => {
    if (nativeData && asset.type === 'native') {
      const balance = formatUnits(nativeData.value, asset.decimals)
      const rawBalance = nativeData.value

      setTokenBalance({ rawBalance, balance })
    }
  }, [nativeData, asset])

  const {
    data: erc20Data,
    isFetching: erc20Fetching,
    isLoading: erc20Loading,
    refetch: erc20Refetch
  } = useReadContract({
    abi: erc20Abi,
    address: asset.contractAddress,
    chainId: chainId,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: asset.type !== 'native' && !!address
    }
  })

  useEffect(() => {
    if (erc20Data && asset.type !== 'native') {
      const balance = formatUnits(erc20Data, asset.decimals)
      const rawBalance = erc20Data

      setTokenBalance({ rawBalance, balance })
    }
  }, [erc20Data, asset])

  const isLoading = asset.type === 'native' ? nativeIsLoading || nativeIsFetching : erc20Fetching || erc20Loading
  const refetch = asset.type === 'native' ? nativeRefetch : erc20Refetch

  return { isLoading, tokenBalance, refetch }
}
