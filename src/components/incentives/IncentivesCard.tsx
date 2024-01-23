import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import StpEthIcon from '../shared/StpethIcon'
import ethIcon from '@assets/images/incentives/card-icon.svg'
import disabledEthIcon from '@assets/images/incentives/disabled-card-icon.svg'
import Image from 'next/image'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Info, Settings } from 'luxon'
import Button from '../shared/Button'
import { useRouter } from 'next/router'
import { truncateWei } from '@/services/truncate'
import chainConfig from '@/config/chain'
import { formatNumberByLocale } from '@/services/format'
import { useNetwork } from 'wagmi'
import { AccountClaimableReports } from '@/types/Incentives'
import IncentiveConfirmTransactionModal from './IncentiveConfirmTransactionModal'
import useAccountReportMerkleData from '@/hooks/subgraphs/incentives/useAccountReportMerkleData'

type IncentivesCardProps = {
  reportIncentive: AccountClaimableReports
  index: number
}

export default function IncentivesCard({ reportIncentive, index }: IncentivesCardProps) {
  const [mouth, setMouth] = useState<number>(0)
  const [year, setYear] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isDisabled = reportIncentive.claimed
  const { t } = useLocaleTranslation()
  const { isLoading: userProofLoading, accountReportMerkleData } = useAccountReportMerkleData(
    reportIncentive.reportBlock,
    reportIncentive.account.address
  )
  const buttonDisabled = userProofLoading || isDisabled || !accountReportMerkleData

  const router = useRouter()
  const incentiveTotalAmount = formatNumberByLocale(
    truncateWei(BigInt(accountReportMerkleData?.weiAmount || 0n), 4),
    router.locale
  )
  function handleMouth(mes: number): string {
    const locale = router.locale ? (router.locale === 'en' ? 'en-US' : router.locale) : 'en'
    Settings.defaultLocale = locale

    return Info.months('long', { locale: locale })[mes - 1]
  }

  const { provider } = chainConfig()

  useEffect(() => {
    function handleIndex() {
      switch (index) {
        case 0:
          return 12
        case 1:
          return 1
        case 2:
          return 2
        case 3:
          return 3
        case 4:
          return 4
        case 5:
          return 5
        case 6:
          return 6
        case 7:
          return 7
        default:
          return 12
      }
    }
    async function getBlockMonthAndYear() {
      const block = await provider.getBlock(Number(reportIncentive.reportBlock))
      if (block) {
        const date = new Date(block.timestamp * 1000)
        setYear(date.getFullYear())
        setMouth(handleIndex())
      }
    }
    getBlockMonthAndYear()
  }, [reportIncentive.reportBlock, provider, index])

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

  return (
    <>
      <Container className={`${isDisabled && 'disabled'}`}>
        <IconCard src={isDisabled ? disabledEthIcon : ethIcon} alt='eth icon' />
        <StpEthIcon />
        <div>
          <span>{`${handleMouth(Number(mouth))} ${year}`}</span>
          <span className='green'>{`${incentiveTotalAmount} ${t('lsd.symbol')}`}</span>
        </div>
        <Claim
          onClick={() => setIsOpen(true)}
          disabled={buttonDisabled}
          label={handleLabelButton()}
          small
          width={120}
        />
      </Container>
      {isOpen && accountReportMerkleData && accountReportMerkleData.proof && (
        <IncentiveConfirmTransactionModal
          mouth={handleMouth(Number(mouth))}
          year={year}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accountReportMerkleData={accountReportMerkleData}
          incentiveTotalAmount={incentiveTotalAmount}
          reportIncentive={reportIncentive}
          userProof={accountReportMerkleData?.proof}
        />
      )}
    </>
  )
}

const { Container, IconCard, Claim } = {
  Container: styled.div`
    width: 100%;
    min-height: 146px;
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.size[12]};
    gap: ${({ theme }) => theme.size[12]};
    border-radius: ${({ theme }) => theme.size[12]};
    box-shadow: ${({ theme }) => theme.shadow[200]};
    position: relative;
    background: ${({ theme }) => theme.color.background};

    div {
      display: flex;
      flex-direction: column;
      span {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 400;
        &.green {
          color: ${({ theme }) => theme.color.green[500]};
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 500;
        }
      }
    }

    &.disabled {
      background: ${({ theme }) => theme.colorV2.gray[2]};
    }
  `,
  IconCard: styled(Image)`
    position: absolute;
    top: 0;
    right: -10px;
  `,
  Claim: styled(Button)`
    width: 120px;
    height: 32px;
  `
}
