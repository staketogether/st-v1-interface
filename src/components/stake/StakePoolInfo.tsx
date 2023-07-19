import StakePoolAbout from '@/components/stake/StakePoolAbout'
import StakePoolMembers from '@/components/stake/StakePoolMembers'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import usePooledEthByShares from '../../hooks/contracts/usePooledEthByShares'
import usePool from '../../hooks/subgraphs/usePool'
import useTranslation from '../../hooks/useTranslation'
import { truncateWei } from '../../services/truncate'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakePoolInfoSwitchAction from './StakePoolInfoSwitchAction'

interface StakeStatsProps {
  poolAddress: `0x${string}` | undefined
}

export default function StakePoolInfo({ poolAddress }: StakeStatsProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState<'members' | 'about'>('about')

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
      <header>
        <h1>{t('poolDetail')}</h1>
      </header>
      <StatsContainer>
        <StatsBox>
          <span>{t('rewards')}</span>
          <span>
            {!!(isRewardsSharesLoading || initialLoading) && poolAddress ? (
              <SkeletonLoading width={80} />
            ) : (
              <>
                <span style={{ color: theme.color.green[400] }}>
                  + {truncateWei(rewardsShares, 5)} {t('lsd.symbol')}
                </span>
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
      </StatsContainer>
      <StakePoolInfoSwitchAction activeTab={activeTab} setActiveTab={value => setActiveTab(value)} />
      <TabContainer>
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
      </TabContainer>
    </Container>
  )
}

const { Container, StatsContainer, StatsBox, TabContainer } = {
  Container: styled.section`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};

    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    gap: ${({ theme }) => theme.size[16]};

    header {
      padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]} 0;
      h1 {
        color: ${({ theme }) => theme.color.blue[400]};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  `,
  StatsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.size[8]};
    padding: 0 ${({ theme }) => theme.size[24]};
  `,
  StatsBox: styled.div`
    display: flex;
    height: 75px;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[12]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    > span {
      &:nth-child(1) {
        font-size: ${({ theme }) => theme.font.size[12]};
        color: ${({ theme }) => theme.color.blue[300]};
      }

      &:nth-child(2) {
        display: flex;
        gap: ${({ theme }) => theme.size[4]};
        font-size: ${({ theme }) => theme.font.size[14]};
      }
    }
  `,
  TabContainer: styled.div`
    padding: ${({ theme }) => theme.size[24]};
    padding-top: ${({ theme }) => theme.size[8]};
  `
}
