import { PiArrowsClockwise, PiCheckCircleFill, PiClockLight } from "react-icons/pi"
import { useTheme } from "styled-components"
import WrapProcessingStep from "./WrapProcessingStep"

export default function ProcessingCheckoutStep() {
  const theme = useTheme()
  const validationSteps = [
    {
      icon: <PiCheckCircleFill size={32} color={theme.color.green[500]} />,
      text: 'Pagamento identificado',
      disable: false
    },
    {
      icon: <PiClockLight size={32} color={theme.color.secondary} />,
      text: 'Mintagem BRLA na Blockchain',
      disable: false
    },
    {
      icon: <PiArrowsClockwise size={32} color={theme.color.secondary} />,
      text: 'Mintagem BRLA na Blockchain',
      disable: true
    }
  ]

  return (<WrapProcessingStep validationSteps={validationSteps} title={'Processando pagamento'} />)
}
