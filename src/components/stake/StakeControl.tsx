import { getStakingProduct } from '@/config/products/staking'
import usePool from '@/hooks/subgraphs/usePool'
import usePoolActivities from '@/hooks/subgraphs/usePoolActivities'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { ContentfulPool } from '@/types/ContentfulPool'
import { Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PiArrowDown, PiArrowUp, PiQuestion, PiShareNetwork } from 'react-icons/pi'
import styled, { css } from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import { formatNumberByLocale } from '../../services/format'
import Tabs, { TabsItems } from '../shared/Tabs'
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
  chainId: number
  isStakeTogetherPool?: boolean
}

export default function StakeControl({ poolAddress, type, poolDetail, chainId, isStakeTogetherPool }: StakeControlProps) {
  const [skipMembers, setSkipMembers] = useState(0)
  const [skipActivity, setSkipActivity] = useState(0)
  const product = getStakingProduct({ name: 'ethereum-stake' })
  const { t } = useLocaleTranslation()

  const { query, locale } = useRouter()

  const { currency, network } = query

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
          pathname: `/${currency}/${network}/project/${type === 'deposit' ? '' : type}`
        },
        undefined,
        { shallow: true }
      )
      return
    }

    router.push(
      {
        pathname: `/${currency}/${network}/project/${type}/${poolAddress}`
      },
      undefined,
      { shallow: true }
    )
  }

  const { account } = useConnectedAccount()
  const stakeForm = <StakeForm type={type} product={product} accountAddress={account} poolAddress={poolAddress} chainId={chainId} />
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

  const activeTab = type

  const titleTvlTooltip = isStakeTogetherPool ? t('v2.stake.st.tvlTooltip') : t('v2.stake.tvlTooltip')

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.deposit.title')} description={''} isStakeTogetherPool={isStakeTogetherPool} />
      <FormContainer>
        {!isStakeTogetherPool && (
          <ProjectBackgroundContainer imageUrl={poolDetail?.image?.url}>
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
                <div>
                  <DataTitle className='gray'>
                    {`${t('v2.stake.tvl')}`}
                    <Tooltip title={titleTvlTooltip}>
                      <QuestionIcon />
                    </Tooltip>
                  </DataTitle>
                </div>
                <DataInfo className='bold purple'>
                  {!!pool?.poolBalance && !initialLoading ? (
                    <span className='primary'>{`${formatNumberByLocale(
                      truncateWei(pool.poolBalance, 5),
                      locale
                    )}  ${t('eth.symbol')} `}</span>
                  ) : (
                    <SkeletonLoading height={14} width={100} />
                  )}
                </DataInfo>
              </div>
              <div>
                <div>
                  <DataTitle className='align-right'>
                    {`${t('v2.stake.rewards')}`}
                    <Tooltip title={t('v2.stake.rewardsTooltip')}>
                      <QuestionIcon />
                    </Tooltip>
                  </DataTitle>
                </div>
                <DataInfo className='bold green '>
                  {!!pool?.totalRewards && !initialLoading ? (
                    <span>{`${formatNumberByLocale(truncateWei(pool.totalRewards, 5), locale)}  ${t('lsd.symbol')} `}</span>
                  ) : (
                    <SkeletonLoading height={14} width={100} />
                  )}
                </DataInfo>
              </div>
            </ProjectDataInfoContainer>
          </ProjectBackgroundContainer>
        )}
        <Form>
          <Tabs items={tabsItems} defaultActiveKey={activeTab} onChangeActiveTab={value => handleSwitch(value as string)} />
        </Form>
      </FormContainer>
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
        isStakeTogetherPool={!!isStakeTogetherPool}
      />
      {poolAddress.toLocaleLowerCase() === account?.toLocaleLowerCase() && <WalletLottery poolAddress={poolAddress} chainId={chainId} />}
    </Container>
  )
}

const {
  Container,
  Form,
  EthIcon,
  QuestionIcon,
  ShareButton,
  ShareIcon,
  ProjectTitle,
  WithdrawIcon,
  FormContainer,
  ProjectLogoContainer,
  ProjectBackgroundContainer,
  ProjectDataInfoContainer,
  DataTitle,
  DataInfo
} = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: ${({ theme }) => theme.size[24]};
      max-width: 420px;
    }
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProjectBackgroundContainer: styled.div<{ imageUrl?: string }>`
    border-radius: 8px 8px 0px 0px;
    margin-bottom: -${({ theme }) => theme.size[8]};
    ${({ imageUrl }) =>
      imageUrl
        ? css`
            background-image: url(${imageUrl});
            height: 420px;
            width: 100%;
            background-size: cover;
            background-position: center;
          `
        : css`
            background: ${({ theme }) => theme.colorV2.purple[3]};
          `};
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
    width: 32px;
    height: 32px;
    border-radius: 100%;

    img {
      border: 1px solid ${({ theme }) => theme.color.white};
    }
  `,
  ProjectDataInfoContainer: styled.div`
    width: 100%;

    border-radius: 8px;
    background: ${({ theme }) => theme.colorV2.white};
    padding: 8px;

    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
    justify-content: space-between;
    gap: 4px;

    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  `,
  DataTitle: styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colorV2.black};
    opacity: 0.5;

    display: flex;
    align-items: center;

    gap: 2px;
    &.align-right {
      align-self: end;
    }
  `,
  DataInfo: styled.span`
    font-size: 15px;
    color: ${({ theme }) => theme.colorV2.blue[1]};
    font-weight: 500;

    &.green {
      color: ${({ theme }) => theme.color.green[500]};
    }
    &.purple {
      color: ${({ theme }) => theme.colorV2.purple[1]};
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
