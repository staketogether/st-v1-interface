import chainConfig from '@/config/chain'
import { getContractsByProductName } from '@/config/products/staking'
import { config } from '@/config/wagmi'
import { getWalletClient } from 'wagmi/actions'
import useLocaleTranslation from './useLocaleTranslation'

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
