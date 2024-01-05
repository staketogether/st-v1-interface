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

type IncentiveConfirmTransactionModalProps = {
  mouth: string
  year: number
  incentiveTotalAmount: string
  reportIncentive: ReportIncentive
}

export default function IncentiveConfirmTransactionModal({
  incentiveTotalAmount,
  mouth,
  year,
  reportIncentive
}: IncentiveConfirmTransactionModalProps) {
  const { isOpen, setIsOpen } = useIncentiveConfirmTransactionModal()

  const { t } = useLocaleTranslation()

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
    setIsOpen(false)
  }
  return (
    <Modal
      title={'Resgaar Incentivo'}
      // showHeader={isSuccess || isLoadingTransaction ? false : true}
      // showCloseIcon={isSuccess || isLoadingTransaction ? false : true}
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <Container>
        <span>Clique em resgatar para transferir o stpETH para sua carteira</span>
        <IncentiveDetailContainer>
          <header>
            <h3>{`${mouth} ${year}`}</h3>
            <span className='green'>{incentiveTotalAmount}</span>
          </header>
          <DescriptionContainer>
            {!!poolOwnerAmount && (
              <div>
                <CheckIcon />
                <span>Proprietario de Pool</span>
                <span className={'green'}>{`${poolOwnerAmount} ${t('lsd.symbol')}`}</span>
              </div>
            )}
            {!!earlyAdopterAmount && (
              <div>
                <CheckIcon />
                <span>Early Adopters</span>
                <span className={'green'}>{`${earlyAdopterAmount} ${t('lsd.symbol')}`}</span>
              </div>
            )}
            {!!socialImpactAmount && (
              <div>
                <CheckIcon />
                <span>Social Impact</span>
                <span className={'green'}>{`${socialImpactAmount} ${t('lsd.symbol')}`}</span>
              </div>
            )}
          </DescriptionContainer>
        </IncentiveDetailContainer>
        <Button onClick={() => {}} label={handleLabelButton()} block />
      </Container>
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
      grid-template-columns: 24px 1fr auto;
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
