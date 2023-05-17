import shareIcon from '@assets/icons/share.svg'
import { notification } from 'antd'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import styled from 'styled-components'

export function ShareButton() {
  const { t } = useTranslation('common')
  const openNotification = () => {
    navigator.clipboard.writeText(window.location.href)
    notification.open({
      message: t('copyClipboard'),
      duration: 2
    })
  }
  return (
    <Container onClick={() => openNotification()}>
      <Title>{t('shared.share')}</Title>
      <Image src={shareIcon} width={10} height={10} alt='' />
    </Container>
  )
}
const { Container, Title } = {
  Container: styled.div`
    display: grid;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    grid-template-columns: auto auto;
    cursor: pointer;
    padding: 0 24px;
  `,
  Title: styled.span`
    color: ${({ theme }) => theme.color.purple[400]};
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
  `
}
