import chainConfig from '@/config/chain'
import { useAccount } from 'wagmi'
import useLocaleTranslation from './useLocaleTranslation'

export default function useAddSethToWallet() {
  const { connector, isConnected } = useAccount()
  const { contracts } = chainConfig()
  const { t } = useLocaleTranslation()
  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: contracts.StakeTogether,
        symbol: t('lsd.symbol'),
        image: '/assets/icons/seth-icon.svg',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
