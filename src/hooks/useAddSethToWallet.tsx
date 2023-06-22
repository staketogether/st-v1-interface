import { useAccount } from 'wagmi'
import chainConfig from '@/config/chain'

export default function useAddSethToWallet() {
  const { connector, isConnected } = useAccount()
  const { contracts } = chainConfig()
  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: contracts.StakeTogether,
        symbol: 'SETH',
        image: '/assets/icons/seth-icon.svg',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
