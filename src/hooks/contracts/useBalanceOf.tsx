import { useEffect, useState } from 'react'
import { erc20Abi, formatUnits } from 'viem'
import { useAccount, useReadContracts } from 'wagmi'

interface useBalanceOfProps {
  contractAddress: `0x${string}`
  walletAddress?: `0x${string}`
  chainId: number
}

interface TokenBalance {
  rawBalance: bigint
  balance: string
  decimals: number
  symbol: string
}

export default function useBalanceOf({ contractAddress, walletAddress, chainId }: useBalanceOfProps) {
  const [tokenBalance, setTokenBalance] = useState<TokenBalance>({
    rawBalance: BigInt(0),
    balance: '0',
    decimals: 18,
    symbol: ''
  })

  const { address: accountAddress } = useAccount()
  const address = walletAddress ? walletAddress : accountAddress ?? '0x0'
  const { data, isFetching, isLoading, refetch } = useReadContracts({
    allowFailure: false,

    contracts: [
      {
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
        chainId
      },
      {
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'decimals',
        chainId
      },
      {
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'symbol',
        chainId
      }
    ]
  })

  useEffect(() => {
    if (data) {
      const balance = formatUnits(data[0], data[1])
      const decimals = data[1]
      const symbol = data[2]
      const rawBalance = data[0]

      setTokenBalance({ rawBalance, balance, decimals, symbol })
    }
  }, [data])

  return { isLoading: isFetching || isLoading, refetch, tokenBalance }
}
