import { useEffect, useState } from 'react'
import useConnectedAccount from '../../../hooks/useConnectedAccount'
import WalletConnectedButton from './WalletConnectedButton'
import WalletDisconnectedButton from './WalletDisconnectedButton'
import WalletSidebar from './WalletSidebar'

export default function Wallet() {
  const { account, accountIsConnected } = useConnectedAccount()

  const [wallet, setWallet] = useState(<WalletDisconnectedButton />)

  useEffect(() => {
    if (accountIsConnected && account) {
      setWallet(
        <>
          <WalletConnectedButton address={account} />
          <WalletSidebar address={account} />
        </>
      )
    } else {
      setWallet(<WalletDisconnectedButton />)
    }
  }, [account, accountIsConnected])

  return wallet
}
