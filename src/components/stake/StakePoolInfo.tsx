import StakePoolAbout from '@/components/stake/StakePoolAbout'
import StakePoolMembers from '@/components/stake/StakePoolMembers'
import { Tooltip } from 'antd'
import { useState } from 'react'
import {
  AiFillCheckCircle,
  AiOutlineAreaChart,
  AiOutlineInfoCircle,
  AiOutlineShareAlt,
  AiOutlineUser
} from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import styled, { useTheme } from 'styled-components'
import usePool from '../../hooks/subgraphs/usePool'
import useTranslation from '../../hooks/useTranslation'
import Tabs, { TabsItems } from '../shared/Tabs'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

interface StakeStatsProps {
  poolAddress: `0x${string}` | undefined
}

export default function StakePoolInfo({ poolAddress }: StakeStatsProps) {
  const { t } = useTranslation()
  const theme = useTheme()

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
      key: 'analytics',
      label: t('analytics'),
      icon: <AnalyticsIcon />,
      children: <></>,
      disabled: true,
      tooltip: t('soon')
    },
    {
      key: 'activity',
      label: t('activity'),
      icon: <ActivityIcon />,
      children: <></>,
      disabled: true,
      tooltip: t('soon')
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
            <EnsAvatar size={32} address={poolAddress} />
            <Verified>
              <EnsName color={theme.color.primary} larger address={poolAddress} />
              <VerifiedIcon fontSize={16} />
            </Verified>
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

const {
  Container,
  AboutIcon,
  MembersIcon,
  AnalyticsIcon,
  ActivityIcon,
  Verified,
  VerifiedIcon,
  ShareButton,
  ShareIcon
} = {
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
      display: flex;
      justify-content: space-between;
      padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]} 0;
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
      }
      h1 {
        color: ${({ theme }) => theme.color.blue[600]};
        font-size: ${({ theme }) => theme.font.size[16]};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  `,
  AboutIcon: styled(AiOutlineInfoCircle)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  MembersIcon: styled(AiOutlineUser)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  AnalyticsIcon: styled(AiOutlineAreaChart)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  Verified: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.color.whatsapp[600]};
    > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
  `,
  VerifiedIcon: styled(AiFillCheckCircle)`
    color: ${({ theme }) => theme.color.secondary};
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

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }
  `,
  ShareIcon: styled(AiOutlineShareAlt)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  ActivityIcon: styled(BsGraphUp)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `
}
