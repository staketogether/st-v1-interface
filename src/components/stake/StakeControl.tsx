import useActiveRoute from '@/hooks/useActiveRoute'
import useTranslation from '@/hooks/useTranslation'
import { useRouter } from 'next/router'
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai'
import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import Tabs, { TabsItems } from '../shared/Tabs'
import { StakeForm } from './StakeForm'
import StakePoolInfo from './StakePoolInfo'
import usePool from '@/hooks/subgraphs/usePool'
import { truncateWei } from '@/services/truncate'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

interface StakeControlProps {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ poolAddress, type }: StakeControlProps) {
  const { t } = useTranslation()
  const { isActive } = useActiveRoute()

  const { pool, initialLoading, loadMoreLoading, fetchMore } = usePool(poolAddress, { first: 10, skip: 0 })

  const router = useRouter()
  const handleSwitch = (type: string) => {
    if (poolAddress) {
      router.push(`/pools/${type}/${poolAddress}`)
      router.push(
        {
          pathname: `/pools/${type}/${poolAddress}`
        },
        undefined,
        { shallow: true }
      )
    } else {
      router.push(`/pools/${type}`)
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

  return (
    <Container>
      <header>
        <h1>{t('v2.stake.header.title')}</h1>
        <span>{t('v2.stake.header.description')}</span>
      </header>

      <TvlContainer>
        <div>
          <span>{t('v2.stake.annualRewards')}</span>
          <span className='green'>5.7%</span>
        </div>
        <div>
          <span>TVL</span>
          {!!pool?.poolBalance && !initialLoading ? (
            <span className='primary'>{`${truncateWei(pool?.poolBalance, 3)} ${t('eth.symbol')} (${
              pool?.marketShare
            }%)`}</span>
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
    gap: ${({ theme }) => theme.size[16]};
    > header {
      display: grid;
      flex-direction: column;
      grid-template-columns: minmax(320px, 468px);
      gap: ${({ theme }) => theme.size[8]};

      > h1 {
        color: ${({ theme }) => theme.color.primary};
        font-size: ${({ theme }) => theme.font.size[32]};
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: ${({ theme }) => theme.color.blue[400]};
      }
    }
  `,
  TvlContainer: styled.div`
    display: flex;
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[24]};
    flex-direction: column;
    gap: 8px;

    border-radius: ${({ theme }) => theme.size[12]};
    background: ${({ theme }) => theme.color.whiteAlpha[500]};

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: ${({ theme }) => theme.color.blue[400]};

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
      &.primary {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  `,
  Form: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 468px);

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
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
