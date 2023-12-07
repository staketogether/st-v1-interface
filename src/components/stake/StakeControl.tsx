import usePool from '@/hooks/subgraphs/usePool'
import usePoolActivities from '@/hooks/subgraphs/usePoolActivities'
import useStakeTogether from '@/hooks/subgraphs/useStakeTogether'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { ContentfulPool } from '@/types/ContentfulPool'
import { Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PiArrowDown, PiArrowUp, PiQuestion, PiShareNetwork, PiUsers } from 'react-icons/pi'
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
  type: 'deposit' | 'withdraw'
  poolDetail?: ContentfulPool
  isStakeTogetherPool?: boolean
}

export default function StakeControl({
  poolAddress,
  type,
  poolDetail,
  isStakeTogetherPool
}: StakeControlProps) {
  const [skipMembers, setSkipMembers] = useState(0)
  const [skipActivity, setSkipActivity] = useState(0)

  const { t } = useLocaleTranslation()

  const { query, locale } = useRouter()

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
    if (isStakeTogetherPool) {
      router.push(
        {
          pathname: `/${network}/${currency}/${type === 'deposit' ? '' : type}`
        },
        undefined,
        { shallow: true }
      )
      return
    }

    router.push(
      {
        pathname: `/${network}/${currency}/project/${type}/${poolAddress}`
      },
      undefined,
      { shallow: true }
    )
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
    }
  ]

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  const { stakeTogether, stakeTogetherIsLoading } = useStakeTogether()

  const activeTab = type
  const titleDescription = t('v2.pages.deposit.description')

  const titleTvl = isStakeTogetherPool ? t('v2.stake.st.tvl') : t('v2.stake.tvl')
  const titleApy = isStakeTogetherPool ? t('v2.stake.st.apy') : t('v2.stake.apy')

  const titleTvlTooltip = isStakeTogetherPool ? t('v2.stake.st.tvlTooltip') : t('v2.stake.tvlTooltip')
  const titleApyTooltip = isStakeTogetherPool ? t('v2.stake.st.apyTooltip') : t('v2.stake.apyTooltip')

  return (
    <Container>
      <LayoutTitle
        title={t('v2.pages.deposit.title')}
        description={titleDescription}
        isStakeTogetherPool={isStakeTogetherPool}
      />
      <FormContainer>
        {!isStakeTogetherPool && (
          <ProjectBackgroundContainer>
            <ProjectTitle>
              <div>
                <ProjectLogoContainer>
                  <CommunityLogo
                    size={32}
                    src={poolDetail?.logo?.url}
                    alt={poolDetail?.logo?.url || ''}
                    loading={false}
                    listed={pool?.listed}
                  />
                </ProjectLogoContainer>
                {poolDetail?.name ? (
                  <CommunityName $larger name={poolDetail?.name} loading={false} $color='white' />
                ) : (
                  <CommunityName $larger walletAddress={poolAddress} loading={false} $color='white' />
                )}
              </div>
              <Tooltip trigger='click' title={t('copiedToClipboard')}>
                <ShareButton onClick={copyToClipboard}>
                  <ShareIcon />
                </ShareButton>
              </Tooltip>
            </ProjectTitle>
            <ProjectDataInfoContainer>
              <div>
                <span>{`${t('v2.stake.tvl')}:`}</span>
                <Tooltip title={titleTvlTooltip}>
                  <QuestionIcon />
                </Tooltip>
                <span className='bold'>
                  {!!pool?.poolBalance && !initialLoading ? (
                    <span className='primary'>{`${formatNumberByLocale(
                      truncateWei(pool.poolBalance, 5),
                      locale
                    )}  ${t('eth.symbol')} `}</span>
                  ) : (
                    <SkeletonLoading height={14} width={100} />
                  )}
                </span>
              </div>
              <div>
                <MembersIcon />
                {!initialLoading ? `${pool?.receivedDelegationsCount}` : <SkeletonLoading width={20} />}
              </div>
            </ProjectDataInfoContainer>
          </ProjectBackgroundContainer>
        )}
        <Form>
          <Tabs
            items={tabsItems}
            defaultActiveKey={activeTab}
            onChangeActiveTab={value => handleSwitch(value as string)}
          />
        </Form>
      </FormContainer>
      <TvlContainer>
        <header>{`Stake together ${t('v2.stake.statistics')}`}</header>
        <div>
          <span>
            <TooltipComponent text={titleTvlTooltip} left={225} width={200}>
              {`${titleTvl}: `}
              <QuestionIcon />
            </TooltipComponent>
          </span>

          <div>
            <>
              {!!stakeTogether?.totalSupply && !stakeTogetherIsLoading ? (
                <span className='primary'>
                  {`${formatNumberByLocale(truncateWei(stakeTogether.totalSupply, 5), locale)}  ${t(
                    'eth.symbol'
                  )} `}
                </span>
              ) : (
                <SkeletonLoading height={14} width={100} />
              )}
            </>
          </div>
        </div>

        <div>
          <span>
            <TooltipComponent text={titleApyTooltip} left={225} width={200}>
              {`${titleApy}: `}
              <QuestionIcon />
            </TooltipComponent>
          </span>
          <span className='green'>{`${apy}%`}</span>
        </div>
      </TvlContainer>
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
      {poolAddress.toLocaleLowerCase() === account?.toLocaleLowerCase() && (
        <WalletLottery poolAddress={poolAddress} />
      )}
    </Container>
  )
}

const {
  Container,
  Form,
  MembersIcon,
  EthIcon,
  TvlContainer,
  QuestionIcon,
  ShareButton,
  ShareIcon,
  ProjectTitle,
  WithdrawIcon,
  FormContainer,
  ProjectLogoContainer,
  ProjectBackgroundContainer,
  ProjectDataInfoContainer
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
    gap: 8px;

    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};

    > header {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
      margin-bottom: 8px;
    }

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
        font-weight: 400;
        font-size: 15px;
      }
      &.primary {
        color: ${({ theme }) => theme.colorV2.blue[3]};
        font-weight: 400;
        font-size: 15px;
      }
    }
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProjectBackgroundContainer: styled.div`
    border-radius: 8px 8px 0px 0px;
    background: ${({ theme }) => theme.colorV2.purple[3]};

    display: flex;
    height: 200px;
    padding: 24px 24px 32px 24px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    align-self: stretch;

    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
  `,
  QuestionIcon: styled(PiQuestion)`
    font-size: ${({ theme }) => theme.font.size[16]};

    margin-left: 2px;
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  ProjectLogoContainer: styled.span`
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.white};
  `,
  MembersIcon: styled(PiUsers)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  ProjectDataInfoContainer: styled.div`
    width: 100%;

    border-radius: 8px;
    background: #fff;
    padding: 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    font-size: 13px;
    font-style: normal;
    font-weight: 400;

    span {
      &.bold {
        font-size: 15px;
        font-weight: 500;
      }
    }

    div {
      &:nth-child(1) {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      &:nth-child(2) {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  `,
  ProjectTitle: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[12]};
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
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  ShareIcon: styled(PiShareNetwork)`
    font-size: ${({ theme }) => theme.font.size[15]};
  `
}
