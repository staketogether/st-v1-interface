import chainConfig from '@/config/chain'
import { useAccount } from 'wagmi'
import useLocaleTranslation from './useLocaleTranslation'
import { getContractsByProductName } from '@/config/product'

//TODO ANTES DE LANÇAR REVISAR ESSE COMPONENTE PARA ADAPTAR POR PRODUTO
export default function useAddSethToWallet() {
  const { connector, isConnected } = useAccount()
  const { isTestnet } = chainConfig()
  const { StakeTogether } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })
  const { t } = useLocaleTranslation()
  const addToWalletAction = () => {
    if (connector && isConnected) {
      connector.watchAsset?.({
        address: StakeTogether,
        //ADICIONAR SYMBOL DO PRODUTO
        symbol: t('lsd.symbol'),
        //ADICIONAR IMAGEM DO PRODUTO
        image: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
        decimals: 18
      })
    }
  }
  return { addToWalletAction }
}
