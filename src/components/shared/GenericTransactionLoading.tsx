import React from 'react'
import styled from 'styled-components'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from './LottieAnimation'
import successAnimation from '@assets/animations/success-animation.json'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Button from './Button'

type GenericTransactionLoadingProps = {
  title: string
  showWalletMessage?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  successButtonLabel?: string
  loadingButtonLabel?: string
  onSuccessAction?: () => void
}

export default function GenericTransactionLoading({
  title,
  isLoading = true,
  isSuccess,
  successButtonLabel,
  loadingButtonLabel,
  onSuccessAction
}: GenericTransactionLoadingProps) {
  const { t } = useLocaleTranslation()
  const buttonMessage = isSuccess ? successButtonLabel : loadingButtonLabel
  return (
    <Container>
      <div>
        {isLoading && !isSuccess && <LottieAnimation animationData={loadingAnimation} height={60} loop />}
        {!isLoading && isSuccess && <LottieAnimation animationData={successAnimation} height={60} />}
        <h2>{title}</h2>

        <Button
          icon={<></>}
          type='submit'
          label={buttonMessage || t('v2.stake.confirmModal.proceedInYourWallet')}
          onClick={() => isSuccess && onSuccessAction && onSuccessAction()}
        />
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
