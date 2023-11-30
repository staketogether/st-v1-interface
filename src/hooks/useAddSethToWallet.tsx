import chainConfig from '@/config/chain'
import { useAccount } from 'wagmi'
import useLocaleTranslation from './useLocaleTranslation'
import useActiveChain from "@/hooks/useActiveChain";

export default function useAddSethToWallet() {
  const { connector, isConnected } = useAccount()
  const { config: chain } = useActiveChain()
  const { contracts } = chain
  const { t } = useLocaleTranslation()
  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: contracts.StakeTogether,
        symbol: t('lsd.symbol'),
        image: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
