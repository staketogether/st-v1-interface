import chainConfig from '@/config/chain'
import { useAccount } from 'wagmi'
import useLocaleTranslation from './useLocaleTranslation'
import useActiveChain from "@/hooks/useActiveChain";

export default function useAddStwEthToWallet() {
  const { connector, isConnected } = useAccount()
  const { config: chain } = useActiveChain()
  const { contracts } = chain
  const { t } = useLocaleTranslation()
  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: contracts.Withdrawals,
        symbol: t('wse.symbol'),
        image: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
