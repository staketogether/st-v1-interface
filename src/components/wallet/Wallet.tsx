import chainConfig from '@/config/chain'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { useEffect } from 'react'
import WalletDisconnectedButton from './WalletConnectButton'
import WalletConnectedButton from './WalletConnectedButton'
import WalletSidebarConnected from './WalletSidebarConnected'

type WalletProps = {
  account: `0x${string}` | undefined
  accountIsConnected: boolean
}

export default function Wallet({ account, accountIsConnected }: WalletProps) {
  const { registerConnectWallet } = useMixpanelAnalytics()
  const chain = chainConfig()

  useEffect(() => {
    if (accountIsConnected && account) {
      registerConnectWallet(account, chain.chainId)
    }
  }, [account, accountIsConnected, chain.chainId, registerConnectWallet])

  return accountIsConnected && account ? (
    <>
      <WalletConnectedButton address={account} />
      <WalletSidebarConnected address={account} />
    </>
  ) : (
    <WalletDisconnectedButton />
  )
}
