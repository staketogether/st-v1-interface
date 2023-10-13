import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import { PiCheckCircle } from 'react-icons/pi'
import styled from 'styled-components'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../LottieAnimation'
import chainConfig from '@/config/chain'
import { ReactNode } from 'react'

type StakeTransactionLoadingProps = {
  walletActionLoading: boolean
  transactionLoading: boolean
  transactionIsSuccess: boolean
  txHash: string | undefined
  titleModal: string
  successMessage?: string
  componentSuccessResume?: ReactNode
}

export default function TransactionLoading({
  walletActionLoading,
  transactionLoading,
  transactionIsSuccess,
  txHash,
  titleModal,
  successMessage,
  componentSuccessResume
}: StakeTransactionLoadingProps) {
  const { t } = useLocaleTranslation()
  const chain = chainConfig()
  return (
    <Container>
      {transactionIsSuccess ? (
        <SuccessIcon size={60} />
      ) : (
        <LottieAnimation animationData={loadingAnimation} height={60} loop />
      )}
      <div>
        {walletActionLoading && !transactionLoading && !transactionIsSuccess && (
          <TitleModal>{titleModal}</TitleModal>
        )}
        {transactionLoading && !transactionIsSuccess && (
          <TitleModal>{t('v2.stake.confirmModal.transactionSubmitted')}</TitleModal>
        )}
        {transactionIsSuccess && <TitleModal>{successMessage}</TitleModal>}
        {componentSuccessResume && <ResumeStake>{componentSuccessResume}</ResumeStake>}
      </div>

      <DescriptionAction>
        {walletActionLoading && !transactionIsSuccess && !transactionLoading && (
          <span>{t('v2.stake.confirmModal.proceedInYourWallet')}</span>
        )}
        {transactionIsSuccess && (
          <a href={`${chain.blockExplorer.baseUrl}/tx/${txHash}`} target='_blank' rel='noopener noreferrer'>
            <Image src={etherscan} alt='etherscan icon' width={20} height={20} />
            <span>{t('viewOnExplorer')}</span>
          </a>
        )}
      </DescriptionAction>
    </Container>
  )
}

const { Container, DescriptionAction, ResumeStake, TitleModal, SuccessIcon } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${({ theme }) => theme.size[16]};
    }
    span {
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  TitleModal: styled.h1`
    font-size: ${({ theme }) => theme.font.size[18]};
    color: ${({ theme }) => theme.color.primary};
    font-weight: 500;
  `,
  ResumeStake: styled.div`
    width: 100%;
  `,
  DescriptionAction: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};

    font-weight: 500;
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.color.primary};

      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};

      &:hover {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  SuccessIcon: styled(PiCheckCircle)`
    color: ${({ theme }) => theme.color.green[300]};
  `
}
