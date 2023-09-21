import StakePoolAbout from '@/components/stake/StakePoolAbout'
import StakePoolMembers from '@/components/stake/StakePoolMembers'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import usePoolActivities from '@/hooks/subgraphs/usePoolActivities'
import { PoolSubgraph } from '@/types/Pool'
import { PiAppWindow, PiListDashes, PiUsers } from 'react-icons/pi'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import Tabs, { TabsItems } from '../shared/Tabs'
import StakeActivity from './StakeActivity'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

interface StakeStatsProps {
  poolAddress: `0x${string}`
  poolData: PoolSubgraph | undefined
  fetchMore: () => void
  loadMoreLoadingPoolData: boolean
  initialLoadingPoolData: boolean
}

export default function StakePoolInfo({
  poolAddress,
  fetchMore,
  poolData,
  initialLoadingPoolData,
  loadMoreLoadingPoolData
}: StakeStatsProps) {
  const { t } = useLocaleTranslation()

  const { poolActivities, initialLoading: poolActivitiesLoading } = usePoolActivities(poolAddress, {
    first: 10,
    skip: 0
  })
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
      label: (
        <AccountContainer>
          {`${t('accounts')}`}{' '}
          {!initialLoadingPoolData ? `(${poolData?.receivedDelegationsCount})` : <SkeletonLoading width={20} />}
        </AccountContainer>
      ),
      icon: <MembersIcon />,
      children: (
        <TabContainer>
          <StakePoolMembers
            delegations={poolData?.delegations}
            initialLoading={initialLoadingPoolData}
            loadMoreLoading={loadMoreLoadingPoolData}
            onLoadMore={fetchMore}
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
          <StakeActivity poolActivities={poolActivities} isLoading={poolActivitiesLoading} />
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

const { Container, AboutIcon, TabContainer, MembersIcon, ActivityIcon, AccountContainer } = {
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
  `
}
