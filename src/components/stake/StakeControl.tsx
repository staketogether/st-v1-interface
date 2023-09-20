import usePool from '@/hooks/subgraphs/usePool'
import useActiveRoute from '@/hooks/useActiveRoute'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { PiArrowDown, PiArrowUp, PiCurrencyEth, PiQuestion, PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'
import useContentfulPoolDetails from '../../hooks/contentful/useContentfulPoolDetails'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import Tabs, { TabsItems } from '../shared/Tabs'
import TooltipComponent from '../shared/TooltipComponent'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import LayoutTitle from '../shared/layout/LayoutTitle'
import { StakeForm } from './StakeForm'
import StakePoolInfo from './StakePoolInfo'
import { useEffect, useState } from 'react'

interface StakeControlProps {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw' | 'exchange'
}

export default function StakeControl({ poolAddress, type }: StakeControlProps) {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()
  const { query } = useRouter()
  const [tooltipHasOpen, setTooltipHasOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTooltipHasOpen(true)
    }, 3000)
    setTimeout(() => {
      setTooltipHasOpen(false)
    }, 8000)
  }, [])

  const { currency, network } = query

  const { apy } = globalConfig

  const { pool, initialLoading, loadMoreLoading, fetchMore } = usePool(poolAddress, { first: 10, skip: 0 })

  const { poolDetail, loading: poolDetailLoading } = useContentfulPoolDetails(poolAddress)

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
      tooltipOpen: tooltipHasOpen,
      icon: <DexIcon />,
      children: stakeForm
    }
  ]

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  const activeTab = isActive('deposit') ? 'deposit' : isActive('withdraw') ? 'withdraw' : 'exchange'

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.deposit.title')} description={t('v2.pages.deposit.description')} />
      <TvlContainer>
        {poolAddress && (
          <PoolTitle>
            <div>
              <CommunityLogo
                size={32}
                src={poolDetail ? poolDetail?.logo?.url : ''}
                alt={poolDetail ? poolDetail?.logo?.url : ''}
                loading={poolDetailLoading}
              />
              <CommunityName $larger name={poolDetail?.name || ''} loading={poolDetailLoading} />
            </div>
            <Tooltip trigger='click' title={t('copiedToClipboard')}>
              <ShareButton onClick={copyToClipboard}>
                <ShareIcon />
              </ShareButton>
            </Tooltip>
          </PoolTitle>
        )}
        <div>
          <span>
            <TooltipComponent text={t('v2.stake.tvlTooltip')} left={225} width={200}>
              {`${t('v2.stake.tvl')}: `}
              <QuestionIcon />
            </TooltipComponent>
          </span>
          {!!pool?.poolBalance && !initialLoading ? (
            <span className='primary'>{`${truncateWei(pool?.poolBalance, 5)} ${t('eth.symbol')} `}</span>
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
        fetchMore={fetchMore}
        loadMoreLoadingPoolData={loadMoreLoading}
        initialLoadingPoolData={initialLoading}
      />
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
    grid-template-columns: minmax(320px, 468px);

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
