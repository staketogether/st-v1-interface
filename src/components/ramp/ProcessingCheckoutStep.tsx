import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import { PiArrowsClockwise, PiCheckCircleFill, PiClockLight } from "react-icons/pi"
import { useTheme } from "styled-components"
import WrapProcessingStep from "./WrapProcessingStep"

export default function ProcessingCheckoutStep() {
  const theme = useTheme()
  const { t } = useLocaleTranslation()
  const validationSteps = [
    {
      icon: <PiCheckCircleFill size={32} color={theme.color.green[500]} />,
      text: t('v2.ramp.paymentIdentified'),
      disable: false
    },
    {
      icon: <PiClockLight size={32} color={theme.color.secondary} />,
      text: t('v2.ramp.mintingBRLA'),
      disable: false
    },
    {
      icon: <PiArrowsClockwise size={32} color={theme.color.secondary} />,
      text: t('v2.ramp.swapBrlToEth'),
      disable: true
    }
  ]


  return (<WrapProcessingStep validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} />)
}
