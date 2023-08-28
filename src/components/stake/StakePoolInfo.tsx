import StakePoolAbout from '@/components/stake/StakePoolAbout'
import StakePoolMembers from '@/components/stake/StakePoolMembers'
import usePoolActivities from '@/hooks/subgraphs/usePoolActivities'
import { PoolSubgraph } from '@/types/Pool'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { AiOutlineInfoCircle, AiOutlineUser } from 'react-icons/ai'
import { BsFillShareFill, BsGraphUp } from 'react-icons/bs'
import { styled } from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import Tabs, { TabsItems } from '../shared/Tabs'
import StakeActivity from './StakeActivity'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'

interface StakeStatsProps {
  poolAddress: `0x${string}`
  poolData: PoolSubgraph | undefined
  fetchMore: (variables: { id: string; first: number; skip: number }) => void
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
  const [skipMembers, setSkipMembers] = useState(0)

  const handleLoadMoreMembers = () => {
    const newSkip = skipMembers + 10
    setSkipMembers(newSkip)
    fetchMore({ id: poolAddress, first: 10, skip: newSkip })
  }

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
      key: 'members',
      label: t('members'),
      icon: <MembersIcon />,
      children: (
        <TabContainer>
          <StakePoolMembers
            delegations={poolData?.delegations}
            initialLoading={initialLoadingPoolData}
            loadMoreLoading={loadMoreLoadingPoolData}
            onLoadMore={handleLoadMoreMembers}
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

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  return (
    <Container>
      {poolAddress && (
        <header>
          <div>
            <CommunityLogo
              size={32}
              src={poolDetail ? poolDetail?.logo?.url : ''}
              alt={poolDetail ? poolDetail?.logo?.url : ''}
              loading={poolDetailLoading}
            />
            <CommunityName larger name={poolDetail?.name || ''} loading={poolDetailLoading} />
          </div>
          <Tooltip trigger='click' title={t('copiedToClipboard')}>
            <ShareButton onClick={copyToClipboard}>
              <ShareIcon />
            </ShareButton>
          </Tooltip>
        </header>
      )}
      <Tabs items={tabsItems} size='middle' />
    </Container>
  )
}

const { Container, AboutIcon, TabContainer, MembersIcon, ActivityIcon, ShareIcon, ShareButton } = {
  Container: styled.section`
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};

    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    > header {
      display: flex;
      justify-content: space-between;
      padding: 0px ${({ theme }) => theme.size[24]};
      padding-top: ${({ theme }) => theme.size[24]};
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
      }
    }
  `,
  TabContainer: styled.div`
    padding: ${({ theme }) => theme.size[24]};
  `,
  AboutIcon: styled(AiOutlineInfoCircle)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  MembersIcon: styled(AiOutlineUser)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  ActivityIcon: styled(BsGraphUp)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  ShareButton: styled.button`
    border: none;
    width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.secondary};
    background-color: transparent;
    border-radius: 50%;
    transition: background-color 0.1s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `,
  ShareIcon: styled(BsFillShareFill)`
    font-size: ${({ theme }) => theme.font.size[12]};
  `
}
