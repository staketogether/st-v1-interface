import { useCallback, useState } from 'react'
import { AddressPurpose } from 'sats-connect'
const wallet = await import('sats-connect')

export default function useBitcoinAccount() {
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const connect = useCallback(async () => {
    const response = await wallet.request("getAccounts", {
      purposes: [AddressPurpose.Payment],
    })

    if (response.status === 'success') {
      wallet.setDefaultProvider(response.result[0].address)
      setAccount(response.result[0].address)
      setIsConnected(true)
    }
  }, [])

  const disconnect = useCallback(() => {
    wallet.removeDefaultProvider()
    localStorage.removeItem('sats-connect_defaultProvider')
    setAccount(undefined)
    setIsConnected(false)
  }, [])

  return { account, connect, isConnected, disconnect, wallet }
}