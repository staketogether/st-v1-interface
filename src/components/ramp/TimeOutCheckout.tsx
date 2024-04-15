import { openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import { useTranslation } from 'react-i18next'
import GenericErrorComponent from './GenericErrorComponent'
import { ProductAssetName } from '@/types/ProductAsset'

export function TimeOutCheckout({ stakingProduct }: { stakingProduct: ProductAssetName }) {
  const { t } = useTranslation()
  return (
    <GenericErrorComponent
      message={t('v2.ramp.checkout.timeOut')}
      subTitle={t('try')}
      onClose={() => openQuoteEthModal(stakingProduct)}
    />
  )
}
