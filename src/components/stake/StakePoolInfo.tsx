import StakePoolAbout from '@/components/stake/StakePoolAbout'
import StakePoolMembers from '@/components/stake/StakePoolMembers'
import { useState } from 'react'
import { AiOutlineInfoCircle, AiOutlineUser } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import styled from 'styled-components'
import usePool from '../../hooks/subgraphs/usePool'
import useTranslation from '../../hooks/useTranslation'
import Tabs, { TabsItems } from '../shared/Tabs'

interface StakeStatsProps {
  poolAddress: `0x${string}` | undefined
}

export default function StakePoolInfo({ poolAddress }: StakeStatsProps) {
  const { t } = useTranslation()

  const [skip, setSkip] = useState(0)

  const {
    pool: poolData,
    fetchMore,
    loadMoreLoading: loadMoreLoadingPoolData,
    initialLoading
  } = usePool(poolAddress, { first: 10, skip: 0 })

  const handleLoadMore = () => {
    if (poolAddress) {
      const newSkip = skip + 10
      setSkip(newSkip)
      fetchMore({ id: poolAddress, first: 10, skip: newSkip })
    }
  }

  const tabsItems: TabsItems[] = [
    {
      key: 'about',
      label: t('about'),
      icon: <AboutIcon />,
      children: <StakePoolAbout poolAddress={poolAddress} />
    },
    {
      key: 'members',
      label: t('members'),
      icon: <MembersIcon />,
      children: (
        <StakePoolMembers
          delegations={poolData?.delegations}
          initialLoading={initialLoading}
          loadMoreLoading={loadMoreLoadingPoolData}
          onLoadMore={handleLoadMore}
          totalDelegations={Number(poolData?.receivedDelegationsCount?.toString() || 0)}
        />
      )
    },
    {
      key: 'activity',
      label: t('activity'),
      icon: <ActivityIcon />,
      children: <></>
    }
  ]

  return (
    <Container>
      <Tabs items={tabsItems} size='middle' />
    </Container>
  )
}

const { Container, AboutIcon, MembersIcon, ActivityIcon } = {
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
  `,
  AboutIcon: styled(AiOutlineInfoCircle)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  MembersIcon: styled(AiOutlineUser)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  ActivityIcon: styled(BsGraphUp)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `
}
