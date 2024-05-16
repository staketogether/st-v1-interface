import React from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'
import { PiTrendUp } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useRouter } from 'next/router'
import { Staking } from '@/types/Staking'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import { truncateWei } from '@/services/truncate'
import useCoinConversion from '@/hooks/useCoinConversion'
import useStAccount from '@/hooks/useStAccount'

interface StakingBalanceCardProps {
  staking: Staking
  stpETHBalance: bigint
  stpETHBalanceLoading: boolean
  userWalletAddress: `0x${string}`
}

export default function StakingBalanceCard({ staking, stpETHBalance, stpETHBalanceLoading, userWalletAddress }: StakingBalanceCardProps) {
  const { t } = useLocaleTranslation()
  const { query, push } = useRouter()
  const { currency } = query as { currency: string }

  const { accountTotalRewards, accountIsLoading: restakingAccountIsLoading } = useStAccount({
    address: userWalletAddress,
    productName: staking.id,
    chainId: staking.asset.chains[0]
  })
  const userLsdBalanceFormatted = truncateWei(stpETHBalance, 6)
  const accountTotalRewardsFormatted = truncateWei(accountTotalRewards, 6)
  const { priceConvertedValue: userLsdBalanceUsd, loading: lsdUsdLoading } = useCoinConversion(
    userLsdBalanceFormatted,
    staking.asset.chains[0],
    staking.asset.contractAddress
  )
  const { priceConvertedValue: accountRewardsUsd, loading: rewardsUsdLoading } = useCoinConversion(
    accountTotalRewardsFormatted,
    staking.asset.chains[0],
    staking.asset.contractAddress
  )

  return (
    <Container>
      <header>
        <ValueInfo>
          <span>{t('invested')}</span>
          <div>
            <div>
              {stpETHBalanceLoading ? <SkeletonLoading width={50} /> : <span>{truncateWei(stpETHBalance, 6)}</span>}
              <span>{staking.symbol}</span>
            </div>
            {lsdUsdLoading ? <SkeletonLoading width={50} /> : <span>{userLsdBalanceUsd}</span>}
          </div>
        </ValueInfo>
        <ValueInfo>
          <span>{t('rewards')}</span>
          <div>
            <div>
              {restakingAccountIsLoading ? <SkeletonLoading width={50} /> : <span>{truncateWei(accountTotalRewards, 6)}</span>}
              <span>{staking.asset.symbol}</span>
            </div>
            {rewardsUsdLoading ? <SkeletonLoading width={50} /> : <span>{accountRewardsUsd}</span>}
          </div>
        </ValueInfo>
      </header>
      <InvestContainer>
        <span>{t('v2.ethereumStaking.balanceStakingCardMessage')}</span>
        <Button
          onClick={() => push(`${staking.asset.url.replace('currency', currency)}`)}
          label={t('buy')}
          color={'green'}
          icon={<PiTrendUp />}
        />
      </InvestContainer>
    </Container>
  )
}

const { Container, InvestContainer, ValueInfo } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};

    header {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  `,
  ValueInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    > span {
      font-size: 13px;
      font-weight: 400;
      opacity: 0.8;
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        > span {
          font-size: 16px;
          font-weight: 500;
        }
      }
      span {
        font-size: 13px;
        font-weight: 400;
      }
    }
  `,
  InvestContainer: styled.div`
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    gap: ${({ theme }) => theme.size[4]};

    padding: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.colorV2.background};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};

    span {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }
  `
}
