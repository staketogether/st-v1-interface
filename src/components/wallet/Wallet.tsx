import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { useEffect } from 'react'
import WalletDisconnectedButton from './WalletConnectButton'
import WalletEvmConnectedButton from './WalletEvmConnectedButton'
import WalletSidebarEvmConnected from './WalletSidebarEvmConnected'
import WalletBitcoinConnectedButton from './WalletBitcoinConnectedButton'

interface WalletProps {
  evmWalletAddress: `0x${string}` | undefined
  bitcoinWalletAddress: string | undefined
  accountIsConnected: boolean
  walletChainId?: number
  isBtcConnected: boolean
}

export default function Wallet({ evmWalletAddress, bitcoinWalletAddress, accountIsConnected, walletChainId, isBtcConnected }: WalletProps) {
  const { registerConnectWallet } = useMixpanelAnalytics()
  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()

  useEffect(() => {
    if (accountIsConnected && evmWalletAddress && walletChainId) {
      setOpenSidebarConnectWallet(false)
      registerConnectWallet(evmWalletAddress, walletChainId)
    }
  }, [evmWalletAddress, accountIsConnected, walletChainId, registerConnectWallet, setOpenSidebarConnectWallet])
  if (accountIsConnected && evmWalletAddress && walletChainId && bitcoinWalletAddress && !isBtcConnected) {
    return (
      <>
        <WalletEvmConnectedButton address={evmWalletAddress} />
        <WalletSidebarEvmConnected address={evmWalletAddress} walletChainId={walletChainId} />
      </>
    )
  }

  if (accountIsConnected && bitcoinWalletAddress && isBtcConnected) {
    return (
      <>
        <WalletBitcoinConnectedButton address={bitcoinWalletAddress} />
      </>
    )
  }

  return <WalletDisconnectedButton />
}
