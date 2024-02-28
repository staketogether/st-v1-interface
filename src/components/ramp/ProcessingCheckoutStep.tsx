import { BrlaBuyEthStep, qrCodeVar, stepsControlBuyCrypto } from "@/hooks/ramp/useControlModal"
import useVerifyActivity from "@/hooks/ramp/useVerifyActivity"
import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import { ProviderType } from "@/types/provider.type"
import { useReactiveVar } from "@apollo/client"
import { PiCheckCircleFill, PiClockLight } from "react-icons/pi"
import { useTheme } from "styled-components"
import WrapProcessingStep from "./WrapProcessingStep"

export default function ProcessingCheckoutStep() {
  const theme = useTheme()
  const timeToRedirect = 3000
  const { t } = useLocaleTranslation()
  const qrCode = useReactiveVar(qrCodeVar)

  const { activity } = useVerifyActivity(ProviderType.brla, qrCode?.id)

  if (activity?.status === 'success') {
    setTimeout(() => stepsControlBuyCrypto(BrlaBuyEthStep.Success), timeToRedirect)
  }

  const isPaymentIdentified = activity?.status === 'posted'  || activity?.status === 'success'
  const paymentIdentifiedIcon = isPaymentIdentified ? <PiCheckCircleFill size={32} color={theme.color.green[500]} /> : <PiClockLight size={32} color={theme.color.secondary} />

  const isMintingBrla = activity?.status !== 'success'
  const mintingBrlaIcon = isMintingBrla ? <PiClockLight size={32} color={theme.color.secondary} /> : <PiCheckCircleFill size={32} color={theme.color.green[500]} />

  const validationSteps = [
    {
      icon: paymentIdentifiedIcon,
      text: t('v2.ramp.paymentIdentified'),
    },
    {
      icon: mintingBrlaIcon,
      text: t('v2.ramp.mintingBRLA'),
      disable: !isPaymentIdentified
    }
  ]


  return (<WrapProcessingStep validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} />)
}
