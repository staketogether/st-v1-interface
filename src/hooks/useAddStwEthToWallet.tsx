import { config } from '@/config/wagmi'
import { getWalletClient } from 'wagmi/actions'
import useLocaleTranslation from './useLocaleTranslation'
import { getStakingById } from '@/config/product/staking'

export default function useAddStwEthToWallet() {

  const staking = getStakingById('eth-staking')
  const { Withdrawals } = staking.contracts

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
          image: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
          decimals: 18
        }
      })
    } catch {
      return
    }
  }
  return { addToWalletAction }
}
