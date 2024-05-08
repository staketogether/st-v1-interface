import { Asset } from '@/types/Asset'
import { useEffect, useState } from 'react'
import { erc20Abi, formatUnits } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

interface useBalanceOfProps {
  asset: Asset
  walletAddress?: `0x${string}`
  chainId: number
}

interface TokenBalance {
  rawBalance: bigint
  balance: string
}

export default function useBalanceOf({ asset, walletAddress, chainId }: useBalanceOfProps) {
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    rawBalance: BigInt(0),
    balance: '0'
  })

  const { address: accountAddress } = useAccount()

  const address = walletAddress ? walletAddress : accountAddress ?? '0x0'
  const { data, isFetching, isLoading, refetch } = useReadContract({
    abi: erc20Abi,
    address: asset.contractAddress,
    chainId: chainId,
    functionName: 'balanceOf',
    args: [address]
  })

  useEffect(() => {
    if (data) {
      const balance = formatUnits(data, asset.decimals)
      const rawBalance = data

      setTokenBalance({ rawBalance, balance })
    }
  }, [data, asset])

  return { isLoading: isFetching || isLoading, refetch, tokenBalance }
}
