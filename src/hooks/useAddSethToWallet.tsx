import { config } from '@/config/wagmi'
import { ProductStakingSymbol } from '@/types/ProductStaking'
import { getWalletClient } from 'wagmi/actions'

type useAddSethToWalletProps = {
  productSymbol: ProductStakingSymbol
  contractAddress: `0x${string}`
}

export default function useAddSethToWallet({ productSymbol, contractAddress }: useAddSethToWalletProps) {
  const productSymbolIcons = {
    stpETH: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    strETH:
      'https://raw.githubusercontent.com/staketogether/st-v1-interface/faa3dcdbf60ea06f922c3c9dd1ed1d8f20fa1cbb/public/assets/stpRETHIcon.svg',
    stpPOL: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    stpSOL: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    stpTIA: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    stpNear: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    stpDOT: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    stpATOM: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    stpBTC: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
    stpCHZ: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png'
  }

  const addToWalletAction = async () => {
    try {
      const client = getWalletClient(config)
      const resolveClient = await client
      await resolveClient.watchAsset?.({
        type: 'ERC20',
        options: {
          address: contractAddress,
          symbol: productSymbol,
          image: productSymbolIcons[productSymbol],
          decimals: 18
        }
      })
    } catch {
      return
    }
  }
  return { addToWalletAction }
}
