import usePool from '@/hooks/subgraphs/usePool'
import usePoolActivities from '@/hooks/subgraphs/usePoolActivities'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { ContentfulPool } from '@/types/ContentfulPool'
import { Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PiArrowDown, PiArrowUp, PiCurrencyEth, PiQuestion, PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import { formatNumberByLocale } from '../../services/format'
import Tabs, { TabsItems } from '../shared/Tabs'
import TooltipComponent from '../shared/TooltipComponent'
import WalletLottery from '../shared/WalletLottery'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import LayoutTitle from '../shared/layout/LayoutTitle'
import { StakeForm } from './StakeForm'
import StakePoolInfo from './StakePoolInfo'

interface StakeControlProps {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw' | 'exchange'
  poolDetail?: ContentfulPool
}

export default function StakeControl({ poolAddress, type, poolDetail }: StakeControlProps) {
  const [skipMembers, setSkipMembers] = useState(0)
  const [skipActivity, setSkipActivity] = useState(0)

  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { locale } = useRouter()

  const { currency, network } = query

  const { apy } = globalConfig

  const { pool, initialLoading, loadMoreLoading, fetchMore } = usePool(poolAddress)

  const handleLoadMoreMembers = () => {
    const newSkip = skipMembers + 10
    setSkipMembers(newSkip)
    fetchMore({ id: poolAddress, first: 10, skip: newSkip })
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

  const router = useRouter()
  const handleSwitch = (type: string) => {
    if (poolAddress) {
      router.push(`/${network}/${currency}/invest/${type}/${poolAddress}`)
      router.push(
        {
          pathname: `/${network}/${currency}/invest/${type}/${poolAddress}`
        },
        undefined,
        { shallow: true }
      )
    } else {
      router.push(`/${network}/${currency}/invest/${type}`)
    }
  }

  const { account } = useConnectedAccount()
  const stakeForm = <StakeForm type={type} accountAddress={account} poolAddress={poolAddress} />
  const tabsItems: TabsItems[] = [
    {
      key: 'deposit',
      label: t('deposit'),
      icon: <EthIcon />,
      children: stakeForm
    },
    {
      key: 'withdraw',
      label: t('withdraw'),
      icon: <WithdrawIcon />,
      children: stakeForm
    },
    {
      key: 'exchange',
      label: t('exchange'),
      tooltip: t('v2.stake.faucetTooltip'),
      icon: <DexIcon />,
      children: stakeForm
    }
  ]

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  const activeTab = type

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.deposit.title')} description={t('v2.pages.deposit.description')} />
      <TvlContainer>
        <PoolTitle>
          <div>
            <CommunityLogo
              size={32}
              src={poolDetail?.logo?.url}
              alt={poolDetail?.logo?.url || ''}
              loading={false}
              listed={pool?.listed}
            />
            {poolDetail?.name ? (
              <CommunityName $larger name={poolDetail?.name} loading={false} />
            ) : (
              <CommunityName $larger walletAddress={poolAddress} loading={false} />
            )}
          </div>

          <Tooltip trigger='click' title={t('copiedToClipboard')}>
            <ShareButton onClick={copyToClipboard}>
              <ShareIcon />
            </ShareButton>
          </Tooltip>
        </PoolTitle>
        <div>
          <span>
            <TooltipComponent text={t('v2.stake.tvlTooltip')} left={225} width={200}>
              {`${t('v2.stake.tvl')}: `}
              <QuestionIcon />
            </TooltipComponent>
          </span>
          {!!pool?.poolBalance && !initialLoading ? (
            <span className='primary'>{`${formatNumberByLocale(truncateWei(pool.poolBalance, 5), locale)}  ${t(
              'eth.symbol'
            )} `}</span>
          ) : (
            <SkeletonLoading height={14} width={100} />
          )}
        </div>
        <div>
          <span>
            <TooltipComponent text={t('v2.stake.rewardsTooltip')} left={126} width={350}>
              {`${t('generatedRewards')}: `}
              <QuestionIcon />
            </TooltipComponent>
          </span>
          {!!pool?.totalRewards && !initialLoading ? (
            <span className='green'>{`${formatNumberByLocale(truncateWei(pool?.totalRewards), locale)} ${t(
              'lsd.symbol'
            )} `}</span>
          ) : (
            <SkeletonLoading height={14} width={100} />
          )}
        </div>
        <div>
          <span>
            <TooltipComponent text={t('v2.stake.apyTooltip')} left={225} width={200}>
              {`${t('v2.stake.apy')}: `}
              <QuestionIcon />
            </TooltipComponent>
          </span>
          <span className='green'>{`${apy}%`}</span>
        </div>
      </TvlContainer>
      <Form>
        <Tabs
          items={tabsItems}
          defaultActiveKey={activeTab}
          onChangeActiveTab={value => handleSwitch(value as string)}
        />
      </Form>
      <StakePoolInfo
        poolAddress={poolAddress}
        poolData={pool}
        fetchMore={handleLoadMoreMembers}
        loadMoreLoadingPoolData={loadMoreLoading}
        initialLoadingPoolData={initialLoading}
        poolActivities={poolActivities}
        poolActivitiesLoading={poolActivitiesLoading}
        poolActivitiesFetchMoreLoading={poolActivitiesFetchMoreLoading}
        loadMoreActivitiesItems={handleLoadMoreActivity}
      />
      <WalletLottery poolAddress={poolAddress} />
    </Container>
  )
}

const {
  Container,
  Form,
  EthIcon,
  TvlContainer,
  QuestionIcon,
  ShareButton,
  ShareIcon,
  PoolTitle,
  WithdrawIcon,
  DexIcon
} = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: ${({ theme }) => theme.size[24]};
      max-width: 468px;
    }
  `,
  TvlContainer: styled.div`
    display: flex;
    padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]};
    flex-direction: column;
    gap: 12px;

    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      font-size: 14px;
      line-height: 15px;
      height: 15px;

      color: ${({ theme }) => theme.colorV2.gray[1]};

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
        font-weight: 500;
        font-size: 15px;
      }
      &.primary {
        color: ${({ theme }) => theme.colorV2.blue[3]};
        font-weight: 500;
        font-size: 15px;
      }
    }
  `,
  Form: styled.div`
    display: grid;
    grid-template-columns: 1fr;

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    > header {
      padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[8]};
      font-size: ${({ theme }) => theme.font.size[14]};
      border: none;
      transition: background-color 0.1s ease;
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
      }
    }
  `,
  EthIcon: styled(PiArrowDown)`
    font-size: 15px;
  `,
  WithdrawIcon: styled(PiArrowUp)`
    font-size: 15px;
  `,
  DexIcon: styled(PiCurrencyEth)`
    font-size: 15px;
  `,
  QuestionIcon: styled(PiQuestion)`
    width: 14px;
    height: 14px;
    margin-left: 3px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  ShareButton: styled.button`
    border: none;
    width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};

    border-radius: 8px;
    transition: background-color 0.1s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colorV2.blue[1]};
    color: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[300]};

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  ShareIcon: styled(PiShareNetwork)`
    font-size: ${({ theme }) => theme.font.size[15]};
  `,
  PoolTitle: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[12]};
    }
  `
}
