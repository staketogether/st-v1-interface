import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import chainConfig from '../../config/chain'

export default function useEthBalanceOf(address?: `0x${string}`) {
  const { chainId } = chainConfig()

  const [balance, setBalance] = useState<string>('0')

  const { data } = useBalance({
    address,
    chainId
  })

  const ethBalance = data?.value?.toString() || '0'

  useEffect(() => {
    setBalance(ethBalance)
  }, [ethBalance])

  return balance
}
