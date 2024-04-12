import { openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import { ProductStakingName } from '@/types/ProductStaking'
import { useTranslation } from 'react-i18next'
import GenericErrorComponent from './GenericErrorComponent'

export function TimeOutCheckout({ stakingProduct }: { stakingProduct: ProductStakingName }) {
  const { t } = useTranslation()
  return (
    <GenericErrorComponent
      message={t('v2.ramp.checkout.timeOut')}
      subTitle={t('try')}
      onClose={() => openQuoteEthModal(stakingProduct)}
    />
  )
}
