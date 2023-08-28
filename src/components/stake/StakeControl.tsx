import usePool from '@/hooks/subgraphs/usePool'
import useStakeTogether from '@/hooks/subgraphs/useStakeTogether'
import useActiveRoute from '@/hooks/useActiveRoute'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai'
import { styled } from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import Tabs, { TabsItems } from '../shared/Tabs'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import { StakeForm } from './StakeForm'
import StakePoolInfo from './StakePoolInfo'
import LayoutTitle from '../shared/layout/LayoutTitle'

interface StakeControlProps {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ poolAddress, type }: StakeControlProps) {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()

  const { pool, initialLoading, loadMoreLoading, fetchMore } = usePool(poolAddress, { first: 10, skip: 0 })
  const { stakeTogether } = useStakeTogether()

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
      children: stakeForm,
      color: 'purple'
    }
  ]

  const activeTab = isActive('deposit') ? 'deposit' : 'withdraw'
  let poolMarketShare = 0

  if (pool?.poolShares && stakeTogether?.totalPoolShares) {
    const marketShare =
      (BigInt(pool.poolShares) * BigInt(ethers.parseEther('1'))) / BigInt(stakeTogether.totalPoolShares)
    poolMarketShare = (Number(marketShare) / Number(ethers.parseEther('1'))) * 100
  }

  return (
    <Container>
      {type === 'deposit' && (
        <LayoutTitle title={t('v2.pages.deposit.title')} description={t('v2.pages.deposit.description')} />
      )}
      {type === 'withdraw' && (
        <LayoutTitle title={t('v2.pages.withdraw.title')} description={t('v2.pages.withdraw.description')} />
      )}

      <TvlContainer>
        <div>
          <span>{t('v2.stake.annualRewards')}</span>
          <span className='green'>5%</span>
        </div>
        <div>
          <span>TVL</span>
          {!!pool?.poolBalance && !initialLoading ? (
            <span className='primary'>{`${truncateWei(pool?.poolBalance, 5)} ${t(
              'eth.symbol'
            )} (${poolMarketShare.toFixed(2)}%)`}</span>
          ) : (
            <SkeletonLoading height={14} width={100} />
          )}
        </div>
      </TvlContainer>

      <Form>
        <Tabs
          items={tabsItems}
          size='large'
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
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[24]};
    flex-direction: column;
    gap: 8px;

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      font-size: ${({ theme }) => theme.font.size[14]};

      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.blue[1]};

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
      &.primary {
        color: ${({ theme }) => theme.colorV2.blue[1]};
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
  DepositIcon: styled(AiOutlineDownload)`
    font-size: 16px;
  `,
  WithdrawIcon: styled(AiOutlineUpload)`
    font-size: 16px;
  `
}
