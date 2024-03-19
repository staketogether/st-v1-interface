import { useAccount } from 'wagmi'
import { ProductSymbol } from '@/types/Product'

type useAddSethToWalletProps = {
  productSymbol: ProductSymbol
  contractAddress: `0x${string}`
}

export default function useAddSethToWallet({ productSymbol, contractAddress }: useAddSethToWalletProps) {
  const { connector, isConnected } = useAccount()

  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: contractAddress,
        symbol: productSymbol,
        image: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
