import { openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import { ProductAsset } from '@/types/ProductAsset'
import { useTranslation } from 'react-i18next'
import GenericErrorComponent from './GenericErrorComponent'

export function TimeOutCheckout({ asset }: { asset: ProductAsset }) {
  const { t } = useTranslation()
  return <GenericErrorComponent message={t('v2.ramp.checkout.timeOut')} subTitle={t('try')} onClose={() => openQuoteEthModal(asset)} />
}
