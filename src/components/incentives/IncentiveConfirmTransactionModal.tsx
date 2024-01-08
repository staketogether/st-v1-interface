import React from 'react'
import Modal from '../shared/Modal'
import useIncentiveConfirmTransactionModal from '@/hooks/useIncentiveConfirmTransactionModal'

import { PiCheckCircle } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ReportIncentive } from '@/types/Incentives'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import Button from '../shared/Button'
import chainConfig from '@/config/chain'
import { useNetwork } from 'wagmi'
import styled from 'styled-components'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import useUserAirdropClaim from '@/hooks/contracts/useAirdropClaim'
import GenericTransactionLoading from '../shared/GenericTransactionLoading'

type IncentiveConfirmTransactionModalProps = {
  mouth: string
  year: number
  incentiveTotalAmount: string
  reportIncentive: ReportIncentive
  merkleTree: StandardMerkleTree<[bigint, bigint, string, bigint]> | null
  userProof: string[]
}

export default function IncentiveConfirmTransactionModal({
  incentiveTotalAmount,
  mouth,
  year,
  reportIncentive,
  userProof
}: IncentiveConfirmTransactionModalProps) {
  const { isOpen, setIsOpen } = useIncentiveConfirmTransactionModal()

  const { t } = useLocaleTranslation()
  const { claim, isLoading, isSuccess, awaitWalletAction, resetState, txHash, prepareTransactionIsError } =
    useUserAirdropClaim(reportIncentive, reportIncentive.account.address, userProof, true)
  const isLoadingTransaction = isLoading || awaitWalletAction

  const router = useRouter()
  const poolOwnerAmount =
    reportIncentive.poolOwnerAmount > 0n &&
    formatNumberByLocale(truncateWei(reportIncentive.poolOwnerAmount, 4), router.locale)
  const earlyAdopterAmount =
    reportIncentive.earlyAdopterAmount > 0n &&
    formatNumberByLocale(truncateWei(reportIncentive.earlyAdopterAmount, 4), router.locale)
  const socialImpactAmount =
    reportIncentive.socialImpactAmount > 0n &&
    formatNumberByLocale(truncateWei(reportIncentive.socialImpactAmount, 4), router.locale)

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

  const descriptionIncentives = (
    <DescriptionContainer>
      {!!poolOwnerAmount && (
        <div>
          <CheckIcon />
          <span>{t('v2.incentives.ownerPool')}</span>
          <span className={'green'}>{`${poolOwnerAmount} ${t('lsd.symbol')}`}</span>
        </div>
      )}
      {!!earlyAdopterAmount && (
        <div>
          <CheckIcon />
          <span>{t('v2.incentives.earlyAdopters')}</span>
          <span className={'green'}>{`${earlyAdopterAmount} ${t('lsd.symbol')}`}</span>
        </div>
      )}
      {!!socialImpactAmount && (
        <div>
          <CheckIcon />
          <span>{t('v2.incentives.socialImpact')}</span>
          <span className={'green'}>{`${socialImpactAmount} ${t('lsd.symbol')}`}</span>
        </div>
      )}
    </DescriptionContainer>
  )

  return (
    <Modal
      title={t('v2.incentives.myIncentives')}
      showHeader={isSuccess || isLoadingTransaction ? false : true}
      showCloseIcon={isSuccess || isLoadingTransaction ? false : true}
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
              {descriptionIncentives}
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
            {descriptionIncentives}
          </IncentiveDetailContainer>
          <Button onClick={claim} disabled={disabledClaim} label={handleLabelButton()} block />
        </Container>
      )}
    </Modal>
  )
}
const { Container, IncentiveDetailContainer, CheckIcon, DescriptionContainer } = {
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
  `,
  DescriptionContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    div {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: ${({ theme }) => theme.size[12]};
      align-items: center;
    }
  `,
  CheckIcon: styled(PiCheckCircle)`
    color: ${({ theme }) => theme.color.green[500]};
    width: 24px;
    height: 24px;
  `
}
