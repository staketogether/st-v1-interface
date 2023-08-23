import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import useTranslation from '@/hooks/useTranslation'
import { truncateDecimal, truncateWei } from '@/services/truncate'
import ethIcon from '@assets/icons/eth-icon.svg'
import sethIcon from '@assets/icons/seth-icon.svg'
import Image from 'next/image'
import styled from 'styled-components'
import Modal from '../shared/Modal'
import StakeTransactionLoading from './StakeTransactionLoading'

type StakeConfirmModalProps = {
  amount: string
  ethBySharesRatio: bigint
  sharesByEthRatio: bigint
  youReceive: bigint
  type: 'deposit' | 'withdraw'
  labelButton: string
  walletActionLoading: boolean
  transactionLoading: boolean
  transactionIsSuccess: boolean
  txHash: string | undefined
  onClick: () => void
  onClose: () => void
}

export default function StakeConfirmModal({
  amount,
  type,
  labelButton,
  transactionLoading,
  walletActionLoading,
  transactionIsSuccess,
  ethBySharesRatio,
  sharesByEthRatio,
  youReceive,
  txHash,
  onClick,
  onClose
}: StakeConfirmModalProps) {
  const { isOpen } = useStakeConfirmModal()
  const { t } = useTranslation()
  const isWithdraw = type === 'withdraw'
  const titleModal = isWithdraw
    ? t('v2.stake.confirmModal.withdrawTitle')
    : t('v2.stake.confirmModal.depositTitle')
  return (
    <Modal
      title={walletActionLoading ? undefined : <Header>{titleModal}</Header>}
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={!(walletActionLoading || transactionLoading) || transactionIsSuccess}
    >
      {walletActionLoading || transactionLoading ? (
        <StakeTransactionLoading
          walletActionLoading={walletActionLoading}
          transactionLoading={transactionLoading}
          amount={truncateDecimal(amount, 6)}
          youReceive={youReceive}
          transactionIsSuccess={transactionIsSuccess}
          type={type}
          txHash={txHash}
        />
      ) : (
        <>
          {isWithdraw ? (
            <>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.withdrawing')}</span>
                <div>
                  <span>
                    {truncateDecimal(amount, 6)} <span className={'purple'}> {t('lsd.symbol')}</span>
                  </span>
                  <Image src={sethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.youWillReceive')}</span>
                <div>
                  <span>
                    {truncateWei(youReceive, 6)} <span className={'purple'}>{t('eth.symbol')}</span>{' '}
                  </span>
                  <Image src={ethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
            </>
          ) : (
            <>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.deposit')}</span>
                <div>
                  <span>
                    {truncateDecimal(amount, 6)} <span className={'purple'}>{t('eth.symbol')}</span>
                  </span>
                  <Image src={ethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.youWillReceive')}</span>
                <div>
                  <span>
                    {truncateWei(youReceive, 6)}
                    <span className={'purple'}> {t('lsd.symbol')}</span>
                  </span>
                  <Image src={sethIcon} alt={t('stakeTogether')} width={36} height={36} />
                </div>
              </ContainerPayment>
            </>
          )}
          <Divider />
          <ContainerInfoReview>
            <InfoReview>
              <span>{t('v2.stake.descriptionForm.exchange')}</span>
              <div>
                {isWithdraw ? (
                  <>
                    1<span className={`purple`}> {t('lsd.symbol')}</span> = {truncateWei(sharesByEthRatio, 6)}
                    <span className={`purple`}> {t('eth.symbol')}</span>
                  </>
                ) : (
                  <>
                    1<span className={`purple`}> {t('eth.symbol')}</span> = {truncateWei(ethBySharesRatio, 6)}
                    <span className={`purple`}> {t('lsd.symbol')}</span>
                  </>
                )}
              </div>
            </InfoReview>
            {type === 'deposit' && (
              <InfoReview>
                <span>{`${t('v2.stake.descriptionForm.transactionFee')}`}</span>
                <span>0.3%</span>
              </InfoReview>
            )}
          </ContainerInfoReview>
          <Button onClick={onClick}>{labelButton}</Button>
        </>
      )}
    </Modal>
  )
}

const { ContainerPayment, Header, Divider, ContainerInfoReview, InfoReview, Button } = {
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
      color: ${({ theme }) => theme.color.blue[500]};
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
    background-color: ${({ theme }) => theme.color.blue[100]};
    border-radius: 12px;
  `,
  ContainerInfoReview: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
  `,
  InfoReview: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  Button: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[600]};
    transition: background-color 0.2s ease;
    height: 48px;

    font-size: ${({ theme }) => theme.font.size[16]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[500]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `
}
