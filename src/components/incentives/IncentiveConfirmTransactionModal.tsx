import React from 'react'
import Modal from '../shared/Modal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { AccountClaimableReports } from '@/types/Incentives'
import Button from '../shared/Button'
import chainConfig from '@/config/chain'
import { useNetwork } from 'wagmi'
import styled from 'styled-components'
import useUserAirdropClaim from '@/hooks/contracts/useAirdropClaim'
import GenericTransactionLoading from '../shared/GenericTransactionLoading'
import { AccountReportMerkleData } from '@/types/AccountReportMerkleData'

type IncentiveConfirmTransactionModalProps = {
  mouth: string
  year: number
  incentiveTotalAmount: string
  reportIncentive: AccountClaimableReports
  accountReportMerkleData: AccountReportMerkleData
  userProof: string[]
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function IncentiveConfirmTransactionModal({
  incentiveTotalAmount,
  mouth,
  year,
  reportIncentive,
  accountReportMerkleData,
  userProof,
  isOpen,
  setIsOpen
}: IncentiveConfirmTransactionModalProps) {
  const { t } = useLocaleTranslation()
  const { claim, isLoading, isSuccess, awaitWalletAction, resetState, txHash, prepareTransactionIsError } =
    useUserAirdropClaim(
      reportIncentive,
      accountReportMerkleData,
      reportIncentive.account.address,
      userProof,
      true
    )
  const isLoadingTransaction = isLoading || awaitWalletAction

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chain.chainId !== walletChainId?.id

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    const actionLabel = t('airdrop.claim')
    return actionLabel
  }

  const handleCloseModal = () => {
    resetState()
    setIsOpen(false)
  }

  const disabledClaim =
    prepareTransactionIsError || !userProof || isLoading || isLoadingTransaction || isSuccess

  return (
    <Modal
      title={t('v2.incentives.myIncentives')}
      showHeader={isSuccess || isLoadingTransaction ? false : true}
      showCloseIcon={isSuccess || isLoadingTransaction ? false : true}
      noPadding={isLoadingTransaction ? true : false}
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      {isSuccess || isLoadingTransaction ? (
        <GenericTransactionLoading
          title={
            (isSuccess && `${t('v2.incentives.transactionModal.successMessage')}`) ||
            `${t('v2.incentives.transactionModal.loadingMessage')}`
          }
          isLoading={isLoadingTransaction}
          isSuccess={isSuccess}
          txHash={txHash}
          noModalPadding
          successButtonLabel={t('close')}
          bodyComponent={
            <IncentiveDetailContainer>
              <header>
                <h3>{`${mouth} ${year}`}</h3>
                <span className='green'>{`${incentiveTotalAmount} ${t('lsd.symbol')}`}</span>
              </header>
            </IncentiveDetailContainer>
          }
          onSuccessAction={handleCloseModal}
        />
      ) : (
        <Container>
          <span>{t('v2.incentives.transactionModal.description')}</span>
          <IncentiveDetailContainer>
            <header>
              <h3>{`${mouth} ${year}`}</h3>
              <span className='green'>{`${incentiveTotalAmount} ${t('lsd.symbol')}`}</span>
            </header>
          </IncentiveDetailContainer>
          <Button onClick={claim} disabled={disabledClaim} label={handleLabelButton()} block />
        </Container>
      )}
    </Modal>
  )
}
const { Container, IncentiveDetailContainer } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    > span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: ${({ theme }) => theme.font.size[13]};
    }
  `,
  IncentiveDetailContainer: styled.div`
    width: 100%;
    display: flex;
    padding: ${({ theme }) => theme.size[12]};
    flex-direction: column;
    justify-content: center;

    gap: ${({ theme }) => theme.size[24]};

    border-radius: ${({ theme }) => theme.size[8]};
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-style: normal;
      font-weight: 400;
      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
    }

    header {
      width: 100%;
      display: flex;
      justify-content: space-between;

      h3 {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: ${({ theme }) => theme.font.size[15]};
        font-weight: 500;
      }
      span {
        font-size: ${({ theme }) => theme.font.size[15]};
        font-weight: 500;
      }
    }
  `
}
