import StakePoolAbout from '@/components/stake/StakePoolAbout'
import StakePoolMembers from '@/components/stake/StakePoolMembers'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import { PoolSubgraph } from '@/types/Pool'
import { PiAppWindow, PiChartBar, PiListDashes, PiUsers } from 'react-icons/pi'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import Tabs, { TabsItems } from '../shared/Tabs'
import StakeActivity from './StakeActivity'
import usePoolRewards from '@/hooks/subgraphs/usePoolRewards'
import StakeRewardsPool from './StakeRewardsPool'
import { useState } from 'react'
import usePoolActivities from '@/hooks/subgraphs/usePoolActivities'

interface StakeStatsProps {
  poolAddress: `0x${string}`
  poolData: PoolSubgraph | undefined
  loadMoreLoadingPoolData: boolean
  initialLoadingPoolData: boolean
  fetchMorePoolMembers: () => void
}

export default function StakePoolInfo({
  poolAddress,
  poolData,
  initialLoadingPoolData,
  loadMoreLoadingPoolData,
  fetchMorePoolMembers
}: StakeStatsProps) {
  const [skipActivity, setSkipActivity] = useState(0)
  const [skipRewards, setSkipRewards] = useState(0)
  const { t } = useLocaleTranslation()

  const {
    rewardsPool,
    loadMore: rewardsPoolLoadMore,
    initialLoading: poolRewardsLoading,
    loadingFetchMore: poolRewardsFetchMoreLoading
  } = usePoolRewards(poolAddress, {
    first: 10,
    skip: 0
  })
  const handleLoadMoreRewards = () => {
    const newSkip = skipRewards + 10
    setSkipRewards(newSkip)
    rewardsPoolLoadMore({ poolAddress: poolAddress, first: 10, skip: newSkip })
  }

  const {
    poolActivities,
    initialLoading: poolActivitiesLoading,
    loadingFetchMore: poolActivitiesFetchMoreLoading,
    loadMore
  } = usePoolActivities(poolAddress)
  const handleLoadMoreActivity = () => {
    const newSkip = skipActivity + 10
    setSkipActivity(newSkip)
    loadMore({ poolAddress: poolAddress, first: 10, skip: newSkip })
  }

  const { poolDetail, loading: poolDetailLoading } = useContentfulPoolDetails(poolAddress)

  const tabsItems: TabsItems[] = [
    {
      key: 'about',
      label: t('about'),
      icon: <AboutIcon />,
      children: (
        <TabContainer>
          <StakePoolAbout poolDetail={poolDetail} loading={poolDetailLoading} />
        </TabContainer>
      )
    },
    {
      key: 'accounts',
      label: <AccountContainer>{`${t('accounts')}`}</AccountContainer>,
      icon: <MembersIcon />,
      children: (
        <TabContainer>
          <StakePoolMembers
            delegations={poolData?.delegations}
            initialLoading={initialLoadingPoolData}
            loadMoreLoading={loadMoreLoadingPoolData}
            onLoadMore={fetchMorePoolMembers}
            totalDelegations={Number(poolData?.receivedDelegationsCount?.toString() || 0)}
          />
        </TabContainer>
      )
    },
    {
      key: 'activity',
      label: t('activity'),
      icon: <ActivityIcon />,
      children: (
        <TabContainer>
          <StakeActivity
            poolActivities={poolActivities}
            poolActivitiesLoading={poolActivitiesLoading}
            poolActivitiesFetchMoreLoading={poolActivitiesFetchMoreLoading}
            loadMoreActivitiesItems={handleLoadMoreActivity}
            activityCount={poolData?.activitiesCount || '0'}
          />
        </TabContainer>
      )
    },
    {
      key: 'rewards',
      label: t('rewards'),
      icon: <RewardsIcon />,
      children: (
        <TabContainer>
          <StakeRewardsPool
            poolRewardsFetchMoreLoading={poolRewardsFetchMoreLoading}
            rewardsPool={rewardsPool}
            poolRewardLoading={poolRewardsLoading}
            loadMoreRewardsItems={handleLoadMoreRewards}
            rewardsCount={poolData?.activitiesCount || '0'}
          />
        </TabContainer>
      )
    }
  ]

  return (
    <Container>
      <Tabs items={tabsItems} />
    </Container>
  )
}

const { Container, AboutIcon, TabContainer, MembersIcon, ActivityIcon, AccountContainer, RewardsIcon } = {
  Container: styled.section`
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    transition: background-color 0.1s ease;
    border: none;
  `,
  TabContainer: styled.div`
    padding: ${({ theme }) => theme.size[16]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: ${({ theme }) => theme.size[24]};
    }
  `,
  AboutIcon: styled(PiAppWindow)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  MembersIcon: styled(PiUsers)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  ActivityIcon: styled(PiListDashes)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  AccountContainer: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
  `,
  RewardsIcon: styled(PiChartBar)`
    font-size: 16px;
  `
}
