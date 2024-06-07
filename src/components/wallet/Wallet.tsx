import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { useEffect } from 'react'
import WalletDisconnectedButton from './WalletConnectButton'
import WalletConnectedButton from './WalletConnectedButton'
import WalletSidebarConnected from './WalletSidebarConnected'
import { AddressPurpose } from 'sats-connect'

interface WalletProps {
  account: `0x${string}` | undefined
  accountIsConnected: boolean
  walletChainId?: number
}

export default function Wallet({ account, accountIsConnected, walletChainId }: WalletProps) {
  const { registerConnectWallet } = useMixpanelAnalytics()
  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const handleBitcoinWallet = async () => {
    const { default: wallet, getDefaultProvider, setDefaultProvider } = await import('sats-connect')

    const provider = getDefaultProvider()

    if (!provider) {
      const response = await wallet.request("getAccounts", {
        purposes: [AddressPurpose.Stacks, AddressPurpose.Payment],
      });

      if (response.status === 'success') {
        setDefaultProvider(response.result[1].address)
      }
    }

    console.log(provider)
  }

  useEffect(() => {
    handleBitcoinWallet()
  }, [])

  useEffect(() => {
    if (accountIsConnected && account && walletChainId) {
      setOpenSidebarConnectWallet(false)
      registerConnectWallet(account, walletChainId)
    }
  }, [account, accountIsConnected, walletChainId, registerConnectWallet, setOpenSidebarConnectWallet])

  return accountIsConnected && account && walletChainId ? (
    <>
      <WalletConnectedButton address={account} />
      <WalletSidebarConnected address={account} walletChainId={walletChainId} />
    </>
  ) : (
    <WalletDisconnectedButton />
  )
}
