import { BrlaBuyEthStep, qrCodeVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useVerifyActivity from '@/hooks/ramp/useVerifyActivity'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import { PiCheckCircleFill, PiCircleLight, PiClockLight } from 'react-icons/pi'
import { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'

export default function ProcessingCheckoutStep() {
  const theme = useTheme()
  const timeToRedirect = 3000
  const { t } = useLocaleTranslation()
  const qrCode = useReactiveVar(qrCodeVar)

  const { activity } = useVerifyActivity(ProviderType.brla, qrCode?.id)

  if (activity?.status === 'success') {
    setTimeout(() => stepsControlBuyCryptoVar(BrlaBuyEthStep.Success), timeToRedirect)
  }

  useEffect(() => {
    if (activity?.status === 'error') {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.Error)
    }
  }, [activity?.status])

  const isPaymentIdentified = activity?.status === 'posted' || activity?.status === 'success'

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {

    const icons = {
      waiting: <PiCircleLight size={32} color={theme.color.secondary} />,
      process: <PiClockLight size={32} color={theme.color.secondary} />,
      success: <PiCheckCircleFill size={32} color={theme.color.green[500]} />
    }

    return icons[moment]
  }
  const validationSteps = [
    {
      icon: getIcon(isPaymentIdentified ? 'success' : 'process'),
      text: t('v2.ramp.paymentIdentified'),
    },
    {
      icon: !isPaymentIdentified ? getIcon('waiting') : getIcon(activity?.status === 'success' ? 'success' : 'process'),
      text: t('v2.ramp.mintingBRLA'),
      disable: activity?.status !== 'success'
    }
  ]

  return <WrapProcessingStep validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} />
}
