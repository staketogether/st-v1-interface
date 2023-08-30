import usePool from '@/hooks/subgraphs/usePool'
import useActiveRoute from '@/hooks/useActiveRoute'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { styled } from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import Tabs, { TabsItems } from '../shared/Tabs'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import LayoutTitle from '../shared/layout/LayoutTitle'
import { StakeForm } from './StakeForm'
import StakePoolInfo from './StakePoolInfo'

interface StakeControlProps {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ poolAddress, type }: StakeControlProps) {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()

  const { pool, initialLoading, loadMoreLoading, fetchMore } = usePool(poolAddress, { first: 10, skip: 0 })

  const router = useRouter()
  const handleSwitch = (type: string) => {
    if (poolAddress) {
      router.push(`/invest/${type}/${poolAddress}`)
      router.push(
        {
          pathname: `/invest/${type}/${poolAddress}`
        },
        undefined,
        { shallow: true }
      )
    } else {
      router.push(`/invest/${type}`)
    }
  }

  const { account } = useConnectedAccount()
  const stakeForm = <StakeForm type={type} accountAddress={account} poolAddress={poolAddress} />

  const tabsItems: TabsItems[] = [
    {
      key: 'deposit',
      label: t('deposit'),
      icon: <DepositIcon />,
      children: stakeForm
    },
    {
      key: 'withdraw',
      label: t('withdraw'),
      icon: <WithdrawIcon />,
      children: stakeForm
    }
  ]

  const activeTab = isActive('deposit') ? 'deposit' : 'withdraw'

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.deposit.title')} description={t('v2.pages.deposit.description')} />
      <TvlContainer>
        <div>
          <span>{t('v2.stake.apy')}</span>
          <span className='green'>5%</span>
        </div>
        <div>
          <span>{t('v2.stake.tvl')}</span>
          {!!pool?.poolBalance && !initialLoading ? (
            <span className='primary'>{`${truncateWei(pool?.poolBalance, 5)} ${t('eth.symbol')} `}</span>
          ) : (
            <SkeletonLoading height={14} width={100} />
          )}
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

const { Container, Form, DepositIcon, WithdrawIcon, TvlContainer } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: ${({ theme }) => theme.size[16]};
      max-width: 468px;
    }
  `,
  TvlContainer: styled.div`
    display: flex;
    padding: ${({ theme }) => theme.size[16]} ${({ theme }) => theme.size[24]};
    flex-direction: column;
    gap: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      font-size: ${({ theme }) => theme.font.size[14]};

      color: ${({ theme }) => theme.colorV2.gray[1]};

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
      &.primary {
        color: ${({ theme }) => theme.colorV2.blue[3]};
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
  DepositIcon: styled(BsArrowDown)`
    font-size: 14px;
  `,
  WithdrawIcon: styled(BsArrowUp)`
    font-size: 14px;
  `
}
