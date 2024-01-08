import useStAccount from '@/hooks/subgraphs/useStAccount'
import React from 'react'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import { formatNumberByLocale } from '@/services/format'

type IncentivesUserBalancesProps = {
  walletAddress: `0x${string}`
}

export default function IncentivesUserBalances({ walletAddress }: IncentivesUserBalancesProps) {
  const { accountData, accountIsLoading } = useStAccount(walletAddress)
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()
  return (
    <UserInfoContainer>
      <div>
        <span>{t('v2.incentives.ransomed')}</span>
        {accountIsLoading && <SkeletonLoading width={100} height={20} />}
        {!!(!accountIsLoading && accountData && accountData?.redeemedIncentivesAmount) && (
          <span>{`${formatNumberByLocale(truncateWei(accountData?.redeemedIncentivesAmount, 4), locale)} ${t(
            'lsd.symbol'
          )}`}</span>
        )}
      </div>
      <div>
        <span>{t('v2.incentives.pending')}</span>
        {accountIsLoading && <SkeletonLoading width={100} height={20} />}
        {!!(!accountIsLoading && accountData && accountData?.pendingIncentivesAmount) && (
          <span className='green'>{`${formatNumberByLocale(
            truncateWei(accountData?.pendingIncentivesAmount, 4),
            locale
          )} ${t('lsd.symbol')}`}</span>
        )}
      </div>
    </UserInfoContainer>
  )
}

const { UserInfoContainer } = {
  UserInfoContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.size[12]};
    > div {
      width: 100%;
      border-radius: 8px;
      border: ${({ theme }) => theme.colorV2.gray[6]} 1px solid;

      display: flex;
      flex-direction: column;
      padding: 12px;

      span {
        &:first-child {
          color: ${({ theme }) => theme.colorV2.gray[1]};
          opacity: 0.8;
          font-size: ${({ theme }) => theme.font.size[13]};
          font-style: normal;
          font-weight: 400;
        }
        &:last-child {
          color: ${({ theme }) => theme.colorV2.purple[1]};
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }
      }
    }
  `
}
