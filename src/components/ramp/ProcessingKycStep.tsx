import { PiCircleLight, PiClockLight } from 'react-icons/pi';
import { useTheme } from "styled-components";
import WrapProcessingStep from './WrapProcessingStep';

export default function ProcessingKycStep() {

  const theme = useTheme()
  const validationSteps = [
    {
      icon: <PiClockLight size={32} color={theme.color.secondary} />,
      text: 'Processando Cadastro',
      disable: false
    },
    {
      icon: <PiCircleLight size={32} color={theme.color.secondary} />,
      text: 'Gerando QR Code',
      disable: true
    }
  ]

  return (<WrapProcessingStep validationSteps={validationSteps} title={'Processando Cadastro'} />)
}
