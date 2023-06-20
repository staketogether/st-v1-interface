import Image from 'next/image'
import useTranslation from '@/hooks/useTranslation'
import styled from 'styled-components'
import Loading from '../shared/icons/Loading'
import ethIcon from '@assets/icons/eth-icon.svg'
import sethIcon from '@assets/icons/seth-icon.svg'
import { AiFillCheckCircle, AiOutlineArrowRight } from 'react-icons/ai'

type StakeTransactionLoadingProps = {
  walletActionLoading: boolean
  transactionLoading: boolean
  amount: string
  transactionIsSuccess: boolean
  type: 'deposit' | 'withdraw'
}

function StakeTransactionLoading({
  walletActionLoading,
  transactionLoading,
  amount,
  transactionIsSuccess,
  type
}: StakeTransactionLoadingProps) {
  const { t } = useTranslation()
  const isWithdraw = type === 'withdraw'
  return (
    <Container>
      {transactionIsSuccess ? (
        <SuccessIcon size={47} />
      ) : (
        <LoadingIcon className={isWithdraw ? 'purple' : ''} size={36} />
      )}
      <div>
        {walletActionLoading && !transactionLoading && !transactionIsSuccess && (
          <TitleModal className={isWithdraw ? 'purple' : ''}>
            {t('confirmStakeModal.confirmStake')}
          </TitleModal>
        )}
        {transactionLoading && !transactionIsSuccess && (
          <TitleModal className={isWithdraw ? 'purple' : ''}>
            {t('confirmStakeModal.transactionSubmitted')}
          </TitleModal>
        )}
        {transactionIsSuccess && (
          <TitleModal className={isWithdraw ? 'purple' : ''}>{t('success')}</TitleModal>
        )}
        <ResumeStake>
          {isWithdraw ? (
            <>
              <div className={isWithdraw ? 'purple' : ''}>
                <Image src={sethIcon} alt={t('stakeTogether')} width={16} height={16} />
                <span>{`${amount}`}</span>
                <span>SETH</span>
              </div>
              <AiOutlineArrowRight />
              <div className={isWithdraw ? 'purple' : ''}>
                <Image src={ethIcon} alt={t('stakeTogether')} width={16} height={16} />
                <span>{`${amount}`}</span>
                <span> ETH</span>
              </div>
            </>
          ) : (
            <>
              <div className={isWithdraw ? 'purple' : ''}>
                <Image src={ethIcon} alt={t('stakeTogether')} width={16} height={16} />
                <span>{`${amount}`}</span>
                <span> ETH</span>
              </div>
              <AiOutlineArrowRight />
              <div className={isWithdraw ? 'purple' : ''}>
                <Image src={sethIcon} alt={t('stakeTogether')} width={16} height={16} />
                <span>{`${amount}`}</span>
                <span className={isWithdraw ? 'purple' : ''}> SETH</span>
              </div>
            </>
          )}
        </ResumeStake>
      </div>
      <DescriptionAction className={isWithdraw ? 'purple' : ''}>
        {walletActionLoading && !transactionIsSuccess && !transactionLoading && (
          <span>{t('confirmStakeModal.proceedInYourWallet')}</span>
        )}
        {transactionIsSuccess && <span>{t('confirmStakeModal.viewOnExplorer')}</span>}
      </DescriptionAction>
    </Container>
  )
}

export default StakeTransactionLoading

const { Container, DescriptionAction, ResumeStake, TitleModal, LoadingIcon, SuccessIcon } = {
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
      gap: ${({ theme }) => theme.size[12]};
    }
  `,
  TitleModal: styled.h1`
    font-size: ${({ theme }) => theme.font.size[18]};
    color: ${({ theme }) => theme.color.primary};
    &.purple {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  ResumeStake: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
      span:nth-child(1) {
        color: ${({ theme }) => theme.color.primary};
      }
      &.purple {
        span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `,
  DescriptionAction: styled.span`
    margin-top: ${({ theme }) => theme.size[24]};
    font-size: ${({ theme }) => theme.font.size[12]};
    color: ${({ theme }) => theme.color.blue[100]};
    &.purple {
      color: ${({ theme }) => theme.color.purple[300]};
    }
  `,
  LoadingIcon: styled(Loading)`
    color: ${({ theme }) => theme.color.primary};
    &.purple {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  SuccessIcon: styled(AiFillCheckCircle)`
    color: ${({ theme }) => theme.color.green[300]};
  `
}
