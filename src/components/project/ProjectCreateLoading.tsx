import React from 'react'
import styled from 'styled-components'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../shared/LottieAnimation'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Button from '../shared/Button'

export default function ProjectCreateLoading() {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <div>
        <LottieAnimation animationData={loadingAnimation} height={60} loop />
        <h2>{t('v2.createProject.form.loadingMessage')}</h2>
        <Button icon={<></>} type='submit' label={`${t('v2.stake.confirmModal.proceedInYourWallet')}`} />
      </div>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding: 48px 0;

    > div {
      h2 {
        font-size: ${({ theme }) => theme.font.size[18]};
        color: ${({ theme }) => theme.color.primary};
        font-weight: 500;
      }
      h2:nth-child(3) {
        font-size: ${({ theme }) => theme.font.size[16]};
      }
      display: flex;
      text-align: center;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
    }
  `
}
