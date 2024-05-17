import { config } from '@/config/wagmi'
import { getWalletClient } from 'wagmi/actions'

export interface AddSethToWalletProps {
  contractAddress: string
  symbol: string
  decimals: number
  image: string
}

export default function useAddTokenToWallet() {
  const addToWalletAction = async ({ contractAddress, symbol, decimals, image }: AddSethToWalletProps) => {
    try {
      const client = getWalletClient(config)
      const resolveClient = await client
      await resolveClient.watchAsset?.({
        type: 'ERC20',
        options: {
          address: contractAddress,
          symbol: symbol,
          image: image,
          decimals: decimals
        }
      })
    } catch {
      return
    }
  }
  return { addToWalletAction }
}
