import Image from 'next/image'
import GenericModal from '../shared/GenericModal'
import useTranslation from '@/hooks/useTranslation'
import styled from 'styled-components'
import ethIcon from '@assets/icons/eth-icon.svg'
import sethIcon from '@assets/icons/seth-icon.svg'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import StakeTransactionLoading from './StakeTransactionLoading'

type StakeConfirmModalProps = {
  amount: string
  type: 'deposit' | 'withdraw'
  titleModal: string
  labelButton: string
  estimateGas: string | undefined
  walletActionLoading: boolean
  transactionLoading: boolean
  transactionIsSuccess: boolean
  txHash: string | undefined
  onClick: () => void
  onClose: () => void
}

function StakeConfirmModal({
  amount,
  titleModal,
  type,
  labelButton,
  estimateGas,
  transactionLoading,
  walletActionLoading,
  transactionIsSuccess,
  txHash,
  onClick,
  onClose
}: StakeConfirmModalProps) {
  const { isOpen } = useStakeConfirmModal()
  const { t } = useTranslation()
  const isWithdraw = type === 'withdraw'
  console.log('txHash', txHash)
  return (
    <GenericModal
      title={walletActionLoading ? undefined : <Header>{titleModal}</Header>}
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={!(walletActionLoading || transactionLoading) || transactionIsSuccess}
    >
      {walletActionLoading || transactionLoading ? (
        <StakeTransactionLoading
          walletActionLoading={walletActionLoading}
          transactionLoading={transactionLoading}
          amount={amount}
          transactionIsSuccess={transactionIsSuccess}
          type={type}
          txHash={txHash}
        />
      ) : (
        <>
          {isWithdraw ? (
            <>
              <ContainerPayment>
                <span>{t('confirmStakeModal.youPay')}</span>
                <div>
                  <span>
                    {amount} <span className={'purple'}>SETH</span>
                  </span>
                  <Image src={sethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
              <ContainerPayment>
                <span>{t('confirmStakeModal.youReceive')}</span>
                <div>
                  <span>
                    {amount} <span className={'purple'}>ETH</span>{' '}
                  </span>
                  <Image src={ethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
            </>
          ) : (
            <>
              <ContainerPayment>
                <span>{t('confirmStakeModal.youPay')}</span>
                <div>
                  <span>
                    {amount} <span className={'purple'}>ETH</span>
                  </span>
                  <Image src={ethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
              <ContainerPayment>
                <span>{t('confirmStakeModal.youReceive')}</span>
                <div>
                  <span>
                    {amount} <span className={'purple'}>SETH</span>
                  </span>
                  <Image src={sethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
            </>
          )}
          <Divider />
          <ContainerInfoReview>
            <InfoReview>
              <span>{t('confirmStakeModal.exchangeRate')}</span>
              <span>
                {isWithdraw ? (
                  <>
                    {amount} <span className={'purple'}>SETH</span> = {amount}
                    <span className={'purple'}>ETH</span>
                  </>
                ) : (
                  <>
                    {amount} <span className={'purple'}>ETH</span> = {amount}
                    <span className={'purple'}>SETH</span>
                  </>
                )}
              </span>
            </InfoReview>
            <InfoReview>
              <span>{t('confirmStakeModal.networkFee')}</span>
              <span>{`${estimateGas}`}</span>
            </InfoReview>
          </ContainerInfoReview>
          <Stake onClick={onClick}>{transactionLoading ? t('processing') : labelButton}</Stake>
        </>
      )}
    </GenericModal>
  )
}

export default StakeConfirmModal

const { ContainerPayment, Header, Divider, ContainerInfoReview, InfoReview, Stake } = {
  Header: styled.div`
    display: grid;
    place-items: center;
  `,
  ContainerPayment: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    span {
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.blue[100]};
    }
    > div {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      > span {
        font-size: ${({ theme }) => theme.font.size[24]};
        color: ${({ theme }) => theme.color.primary};
        > span {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  `,
  Divider: styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 12px;
  `,
  ContainerInfoReview: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
  `,
  InfoReview: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
      > span {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  `,
  Stake: styled.button`
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
