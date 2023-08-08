import chainConfig from '@/config/chain'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { useEffect } from 'react'
import useConnectedAccount from '../../../hooks/useConnectedAccount'
import WalletDisconnectedButton from './WalletConnectButton'
import WalletConnectedButton from './WalletConnectedButton'
import WalletSidebarConnected from './WalletSidebarConnected'

export default function Wallet() {
  const { account, accountIsConnected } = useConnectedAccount()
  const { registerConnectWallet } = useMixpanelAnalytics()
  const chain = chainConfig()

  useEffect(() => {
    if (accountIsConnected && account) {
      registerConnectWallet(account, chain.chainId)
    }
  }, [account, accountIsConnected, chain.chainId, registerConnectWallet])

  return accountIsConnected && account ? (
    <>
      <WalletConnectedButton address={account} showBalance={false} showNetwork />
      <WalletSidebarConnected address={account} />
    </>
  ) : (
    <WalletDisconnectedButton />
  )
}
