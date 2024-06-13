import { clearRampVars } from '@/hooks/ramp/useRampControlModal'
import { useTranslation } from 'react-i18next'
import GenericErrorComponent from './GenericErrorComponent'

export function TimeOutCheckout({ type }: { type: 'buy' | 'sell' }) {
  const { t } = useTranslation()
  return (
    <GenericErrorComponent message={t('v2.ramp.checkout.timeOut')} subTitle={t('try')} onClose={() => clearRampVars(type)} type={type} />
  )
}
