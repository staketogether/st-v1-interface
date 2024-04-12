import React from 'react'
import styled from 'styled-components'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from './LottieAnimation'
import successAnimation from '@assets/animations/success-animation.json'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Image from 'next/image'
import Button from './Button'
import { chainConfigByChainId } from '@/config/chain'
import etherscan from '@assets/icons/etherscan.svg'

type GenericTransactionLoadingProps = {
  title: string
  showWalletMessage?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  successButtonLabel?: string
  loadingButtonLabel?: string
  onSuccessAction?: () => void
  bodyComponent?: React.ReactNode
  noPadding?: boolean
  noModalPadding?: boolean
  txHash?: `0x${string}` | undefined
  chainId: number
}

export default function GenericTransactionLoading({
  title,
  isLoading = true,
  isSuccess,
  successButtonLabel,
  loadingButtonLabel,
  bodyComponent,
  txHash,
  noPadding,
  noModalPadding,
  onSuccessAction,
  chainId
}: GenericTransactionLoadingProps) {
  const { t } = useLocaleTranslation()
  const buttonMessage = isSuccess ? successButtonLabel : loadingButtonLabel
  const chain = chainConfigByChainId(chainId)
  return (
    <Container className={`${noPadding && 'noPadding'} ${noModalPadding && 'noModalPadding'}`}>
      <div>
        {isLoading && !isSuccess && <LottieAnimation animationData={loadingAnimation} height={60} loop />}
        {!isLoading && isSuccess && <LottieAnimation animationData={successAnimation} height={60} />}
        <h2>{title}</h2>
        {bodyComponent && <>{bodyComponent}</>}
        <Button
          icon={<></>}
          type='submit'
          label={buttonMessage || t('v2.stake.confirmModal.proceedInYourWallet')}
          onClick={() => isSuccess && onSuccessAction && onSuccessAction()}
        />
        {isSuccess && txHash && (
          <a href={`${chain.blockExplorer.baseUrl}/tx/${txHash}`} target='_blank' rel='noopener noreferrer'>
            <Image src={etherscan} alt='etherscan icon' width={20} height={20} />
            <span>{t('viewOnExplorer')}</span>
          </a>
        )}
      </div>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding: 24px 0;

    &.noPadding {
      padding: 0;
    }
    &.noModalPadding {
      padding: 24px;
    }
    > div {
      width: 100%;
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

    a {
      font-size: ${({ theme }) => theme.font.size[14]};
      margin: 0 auto;
      text-decoration: none;
      color: ${({ theme }) => theme.color.primary};
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
      &:hover {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `
}
