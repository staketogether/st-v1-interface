import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function useConnectedAccount() {
  const { address, isConnected } = useAccount()

  const [account, setAccount] = useState<`0x${string}` | undefined>(undefined)
  const [accountIsConnected, setAccountIsConnected] = useState<boolean>(false)

  useEffect(() => {
    setAccount(address)
  }, [address])

  useEffect(() => {
    setAccountIsConnected(isConnected)
  }, [isConnected])

  return { account, accountIsConnected }
}
