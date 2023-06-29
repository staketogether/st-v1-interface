import StakePoolAbout from '@/components/stake/StakePoolAbout'
import StakePoolActions from '@/components/stake/StakePoolActions'
import StakePoolMembers from '@/components/stake/StakePoolMembers'
import { Divider } from 'antd'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import usePooledEthByShares from '../../hooks/contracts/usePooledEthByShares'
import usePool from '../../hooks/subgraphs/usePool'
import useTranslation from '../../hooks/useTranslation'
import { truncateWei } from '../../services/truncate'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

interface StakeStatsProps {
  poolAddress: `0x${string}` | undefined
}

export default function StakePoolInfo({ poolAddress }: StakeStatsProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState<'members' | 'about'>('members')

  const [skip, setSkip] = useState(0)

  const {
    pool: poolData,
    fetchMore,
    loadMoreLoading: loadMoreLoadingPoolData,
    initialLoading
  } = usePool(poolAddress, { first: 10, skip: 0 })

  const { balance: rewardsShares, loading: isRewardsSharesLoading } = usePooledEthByShares(
    poolData ? poolData.rewardsShares : '0'
  )
  const { balance: delegatedShares, loading: delegatedSharesLoading } = usePooledEthByShares(
    poolData ? poolData.delegatedShares : '0'
  )

  const handleLoadMore = () => {
    if (poolAddress) {
      const newSkip = skip + 10
      setSkip(newSkip)
      fetchMore({ id: poolAddress, first: 10, skip: newSkip })
    }
  }

  return (
    <Container>
      <StatsContainer>
        <Stats>
          <StatsBox>
            <span>{t('rewards')}</span>
            <span>
              {!!(isRewardsSharesLoading || initialLoading) && poolAddress ? (
                <SkeletonLoading width={80} />
              ) : (
                <>
                  <span style={{ color: theme.color.green[600] }}>{truncateWei(rewardsShares, 6)}</span>
                  <span style={{ color: theme.color.secondary }}>{t('lsd.symbol')}</span>
                </>
              )}
            </span>
          </StatsBox>
          <StatsBox>
            <span>{t('staked')}</span>
            <span>
              {!!(delegatedSharesLoading || initialLoading) && poolAddress ? (
                <SkeletonLoading width={80} />
              ) : (
                <>
                  <span>{`${truncateWei(delegatedShares, 6)}`}</span>
                  <span style={{ color: theme.color.secondary }}>{t('lsd.symbol')}</span>
                </>
              )}
            </span>
          </StatsBox>
          <StatsBox>
            <span>{t('members')}</span>
            <span>
              {initialLoading && poolAddress ? (
                <SkeletonLoading width={80} />
              ) : (
                <>{poolData?.receivedDelegationsCount.toString()}</>
              )}
            </span>
          </StatsBox>
        </Stats>
      </StatsContainer>
      <Divider style={{ margin: `${theme.size['12']} 0`, color: theme.color.blue[100] }} />
      <StakePoolActions onActiveTabChange={tab => setActiveTab(tab)} />
      {activeTab === 'members' && (
        <StakePoolMembers
          delegations={poolData?.delegations}
          initialLoading={initialLoading}
          loadMoreLoading={loadMoreLoadingPoolData}
          onLoadMore={handleLoadMore}
          totalDelegations={Number(poolData?.receivedDelegationsCount?.toString() || 0)}
        />
      )}
      {activeTab === 'about' && <StakePoolAbout poolAddress={poolAddress} />}
    </Container>
  )
}

const { Container, StatsContainer, Stats, StatsBox } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[24]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    gap: ${({ theme }) => theme.size[8]};
  `,
  StatsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[12]};
  `,
  Stats: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.size[8]};
  `,
  StatsBox: styled.div`
    display: flex;
    height: 75px;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    background-color: ${({ theme }) => theme.color.whiteAlpha[400]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    > span {
      font-weight: 500;

      &:nth-child(1) {
        font-size: ${({ theme }) => theme.font.size[12]};
        color: ${({ theme }) => theme.color.blue[300]};
      }

      &:nth-child(2) {
        display: flex;
        gap: ${({ theme }) => theme.size[4]};

        @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
          font-size: ${({ theme }) => theme.font.size[12]};
        }
      }
    }
  `
}
