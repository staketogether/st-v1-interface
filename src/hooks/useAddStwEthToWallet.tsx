import chainConfig from '@/config/chain'
import useLocaleTranslation from './useLocaleTranslation'
import { getContractsByProductName } from '@/config/product'
import { getWalletClient } from 'wagmi/actions'
import { config } from '@/config/wagmi'

export default function useAddStwEthToWallet() {
  const { isTestnet } = chainConfig()
  const { Withdrawals } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })
  const { t } = useLocaleTranslation()
  const addToWalletAction = async () => {
    const client = getWalletClient(config)
    const resolveClient = await client
    try {
      await resolveClient.watchAsset?.({
        type: 'ERC20',
        options: {
          address: Withdrawals,
          symbol: t('wse.symbol'),
          image:
            'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
          decimals: 18
        }
      })
    } catch {
      return
    }
  }
  return { addToWalletAction }
}
