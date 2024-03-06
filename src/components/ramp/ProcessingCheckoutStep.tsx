import { BrlaBuyEthStep, qrCodeVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useVerifyActivity from '@/hooks/ramp/useVerifyActivity'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import { PiCheckCircleFill, PiClockLight } from 'react-icons/pi'
import { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'
import { useEffect } from 'react'

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

  const validationSteps = [
    {
      icon: <PiCheckCircleFill size={32} color={theme.color.green[500]} />,
      text: t('v2.ramp.paymentIdentified'),
      disable: activity?.status !== 'posted' && activity?.status !== 'queued' && activity?.status !== 'success'
    },
    {
      icon: <PiClockLight size={32} color={theme.color.secondary} />,
      text: t('v2.ramp.mintingBRLA'),
      disable: activity?.status !== 'queued' && activity?.status === 'posted'
    }
  ]

  return <WrapProcessingStep validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} />
}
