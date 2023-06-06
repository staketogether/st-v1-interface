import chainConfig from '@/config/chain'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { useEffect, useState } from 'react'
import useConnectedAccount from '../../../hooks/useConnectedAccount'
import WalletConnectedButton from './WalletConnectedButton'
import WalletDisconnectedButton from './WalletDisconnectedButton'
import WalletSidebar from './WalletSidebar'

export default function Wallet() {
  const { account, accountIsConnected } = useConnectedAccount()
  const { registerConnectWallet } = useMixpanelAnalytics()
  const chain = chainConfig()

  const [wallet, setWallet] = useState(<WalletDisconnectedButton />)

  useEffect(() => {
    if (accountIsConnected && account) {
      registerConnectWallet(account, chain.chainId)
      setWallet(
        <>
          <WalletConnectedButton address={account} />
          <WalletSidebar address={account} />
        </>
      )
    } else {
      setWallet(<WalletDisconnectedButton />)
    }
  }, [account, accountIsConnected, chain.chainId, registerConnectWallet])

  return wallet
}
