import useTranslation from '@/hooks/useTranslation'
import styled from 'styled-components'
import useV2Modal from '../../hooks/useV2Modal'
import Modal from '../shared/Modal'

export default function V2Modal() {
  const { openModal, setOpenModal } = useV2Modal()
  const { t } = useTranslation()

  const onClose = () => {
    setOpenModal(false)
  }

  const onClick = () => {
    window.open('https://twitter.com/0xstakeTogether', '_blank')
  }

  return (
    <Modal
      title={<Header>{t('v2.title')}</Header>}
      isOpen={openModal}
      onClose={onClose}
      showCloseIcon={true}
    >
      <Container>
        <div>
          <p>{t('v2.p1')}</p>
          <p>{t('v2.p2')}</p>
          <p>{t('v2.p3')}</p>
          <p>{t('v2.p4')}</p>
        </div>
      </Container>
      <Button onClick={onClick}>{t('v2.cta')}</Button>
    </Modal>
  )
}

const { Container, Header, Button } = {
  Header: styled.div`
    display: grid;

    font-size: ${({ theme }) => theme.font.size[18]};
    color: ${({ theme }) => theme.color.primary};
  `,
  Container: styled.div`
    p {
      font-size: ${({ theme }) => theme.font.size[16]};
      line-height: 18px;
      margin-bottom: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
    }
  `,
  Button: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[400]};
    transition: background-color 0.2s ease;
    height: 48px;

    font-size: ${({ theme }) => theme.font.size[16]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[600]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `
}
