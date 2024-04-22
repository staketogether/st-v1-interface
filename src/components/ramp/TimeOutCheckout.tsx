import { openQuoteEthModal } from '@/hooks/ramp/useControlModal'
import { useTranslation } from 'react-i18next'
import GenericErrorComponent from './GenericErrorComponent'
import { Asset } from '@/types/Asset'

export function TimeOutCheckout({ asset }: { asset: Asset }) {
  const { t } = useTranslation()
  return <GenericErrorComponent message={t('v2.ramp.checkout.timeOut')} subTitle={t('try')} onClose={() => openQuoteEthModal(asset)} />
}
