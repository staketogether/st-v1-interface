import chainConfig from '@/config/chain'
import { useAccount } from 'wagmi'
import useLocaleTranslation from './useLocaleTranslation'
import { getContractsByProductName } from '@/config/product'

export default function useAddStwEthToWallet() {
  const { connector, isConnected } = useAccount()
  const { isTestnet } = chainConfig()
  const { Withdrawals } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })
  const { t } = useLocaleTranslation()
  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: Withdrawals,
        symbol: t('wse.symbol'),
        image: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
