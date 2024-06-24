import Wallet, { Address, AddressPurpose, BitcoinNetworkType, Provider, getProviderById, getProviders, request } from 'sats-connect'
import { useLocalStorage } from 'usehooks-ts'

export default function useBtcConnectWallet() {
  const [addressInfo, setAddressInfo] = useLocalStorage<Address[]>('bitcoin-addresses', [])

  const btcWalletIsConnected = addressInfo.length > 0

  const btcWalletDisconnect = () => {
    Wallet.disconnect()
    setAddressInfo([])
  }

  const btcConnectors = getProviders()

  const handleGetInfo = async () => {
    try {
      const response = await request('getInfo', null)
      if (response.status === 'success') {
        console.log(response.result)
      } else {
        alert('Error getting info. Check console for error logs')
        console.error(response.error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const btcConnect = async (provider: Provider) => {
    const providerObject = getProviderById(provider.id)
    const response = await providerObject.request('getAccounts', {
      purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
      // message: 'Cool app wants to know your addresses!',
      network: {
        type: BitcoinNetworkType.Mainnet
      }
    })

    if (response.result.length) {
      setAddressInfo(response.result as Address[])
    }
  }

  return { btcWalletDisconnect, btcConnect, btcConnectors, btcWalletAddress: addressInfo, btcWalletIsConnected, handleGetInfo }
}
