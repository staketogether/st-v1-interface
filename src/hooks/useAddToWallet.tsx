import { useAccount } from 'wagmi'
import chainConfig from '@/config/chain'

export default function useAddSETToWallet() {
  const { connector, isConnected } = useAccount()
  const { contracts } = chainConfig()
  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: contracts.StakeTogether,
        symbol: 'SETH',
        //TODO: add SETH icon url
        image: 'sethIcon',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
