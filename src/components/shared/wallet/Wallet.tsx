import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import WalletConnectedButton from './WalletConnectedButton'
import WalletDisconnectedButton from './WalletDisconnectedButton'
import WalletSidebar from './WalletSidebar'

export default function Wallet() {
  const { address, isConnected } = useAccount()

  const [wallet, setWallet] = useState(<WalletDisconnectedButton />)

  useEffect(() => {
    if (isConnected && address) {
      setWallet(
        <>
          <WalletConnectedButton address={address} />
          <WalletSidebar address={address} />
        </>
      )
    } else {
      setWallet(<WalletDisconnectedButton />)
    }
  }, [address, isConnected])

  return wallet
}
