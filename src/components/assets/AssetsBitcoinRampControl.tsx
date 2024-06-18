import { Asset } from '@/types/Asset'
import useBtcConnectWallet from '@/hooks/btc-wallet/useBtcConnectWallet'
import { AddressPurpose } from 'sats-connect'
import useTransakRamp from '@/hooks/useTransakRamp'
import { useEffect } from 'react'

interface AssetsBitcoinRampControlProps {
  asset: Asset,
  type: 'buy' | 'sell'
}

const AssetsBitcoinRampControl = ({ asset, type }: AssetsBitcoinRampControlProps) => {
  const { btcWalletAddress } = useBtcConnectWallet()

  const { init } = useTransakRamp({
    asset,
    productsAvailed: type === 'buy' ? 'BUY' : 'SELL',
    network: 'mainnet',
    containerId: 'transak_widget',
    walletAddress: btcWalletAddress.find(item => item.purpose === AddressPurpose.Ordinals)?.address
  })

  useEffect(() => {
    init()
  }, [init])

  return (<div id='transak_widget' style={{ height: '450px' }} />)
}

export default AssetsBitcoinRampControl