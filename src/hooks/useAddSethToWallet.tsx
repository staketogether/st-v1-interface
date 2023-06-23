import { useAccount } from 'wagmi'
import chainConfig from '@/config/chain'
import useTranslation from './useTranslation'

export default function useAddSethToWallet() {
  const { connector, isConnected } = useAccount()
  const { contracts } = chainConfig()
  const { t } = useTranslation()
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
