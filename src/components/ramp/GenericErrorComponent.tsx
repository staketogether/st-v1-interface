import { clearModal } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ReactNode } from 'react'
import { PiWarningOctagon } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '../shared/Button'

interface GenericErrorComponentProps {
  icon?: ReactNode
  message?: string
  subTitle?: string
  onClose?: () => void
}

export default function GenericErrorComponent({
  icon,
  message,
  subTitle,
  onClose
}: GenericErrorComponentProps) {
  const { t } = useLocaleTranslation()
  const handleClose = () => {
    if (onClose) {
      onClose()
      return
    }
    clearModal()
  }
  return (
    <Container>
      {icon ?? <AlertIcon />}
      <span>{message ?? t('genericErrorMessage')}</span>
      {subTitle && <span>{subTitle}</span>}
      <Button label={'close'} block onClick={handleClose} />
    </Container>
  )
}
const { Container, AlertIcon } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};
    text-align: center;
    > span {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: 18px;
      font-weight: 500;
      max-width: 317px;
    }
  `,
  AlertIcon: styled(PiWarningOctagon)`
    font-size: 60px;
    color: ${({ theme }) => theme.colorV2.purple[1]};
  `
}
