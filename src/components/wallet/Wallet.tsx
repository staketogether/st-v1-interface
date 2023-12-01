import chainConfig from '@/config/chain'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { useEffect } from 'react'
import WalletDisconnectedButton from './WalletConnectButton'
import WalletConnectedButton from './WalletConnectedButton'
import WalletSidebarConnected from './WalletSidebarConnected'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'

type WalletProps = {
  account: `0x${string}` | undefined
  accountIsConnected: boolean
}

export default function Wallet({ account, accountIsConnected }: WalletProps) {
  const { registerConnectWallet } = useMixpanelAnalytics()
  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const chain = chainConfig()

  useEffect(() => {
    if (accountIsConnected && account) {
      setOpenSidebarConnectWallet(false)
      registerConnectWallet(account, chain.chainId)
    }
  }, [account, accountIsConnected, chain.chainId, registerConnectWallet, setOpenSidebarConnectWallet])

  return accountIsConnected && account ? (
    <>
      <WalletConnectedButton address={account} />
      <WalletSidebarConnected address={account} />
    </>
  ) : (
    <WalletDisconnectedButton />
  )
}
