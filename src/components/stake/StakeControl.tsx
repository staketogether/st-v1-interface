import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import StakePoolInfo from './StakePoolInfo'
import { AiFillSafetyCertificate, AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai'
import { StakeForm } from './StakeForm'
import useTranslation from '@/hooks/useTranslation'
import Tabs, { TabsItems } from '../shared/Tabs'
import useActiveRoute from '@/hooks/useActiveRoute'
import { useRouter } from 'next/router'

interface StakeControlProps {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ poolAddress, type }: StakeControlProps) {
  const { t } = useTranslation()
  const { isActive } = useActiveRoute()
  const router = useRouter()

  const handleSwitch = (type: string) => {
    if (poolAddress) {
      router.push(`/stake/${type}/${poolAddress}`)
      router.push(
        {
          pathname: `/stake/${type}/${poolAddress}`
        },
        undefined,
        { shallow: true }
      )
    } else {
      router.push(`/stake/${type}`)
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
        <div>
          <h1>{t('titles.stake')}</h1>
          <SafeButton>
            <SafeIcon /> {t('safe')}
          </SafeButton>
        </div>
        <span>{t('depositDescription')}</span>
      </header>
      <PoolDataCard>
        <div>
          <span>{t('annualRewards')}</span>
          <span className='green'>5.7%</span>
        </div>
        <div>
          <span>TVL</span>
          <span className='primary'>9,868 ETH</span>
        </div>
      </PoolDataCard>
      <Form>
        <Tabs
          items={tabsItems}
          size='large'
          defaultActiveKey={activeTab}
          onChangeActiveTab={value => handleSwitch(value as string)}
        />
      </Form>
      <StakePoolInfo poolAddress={poolAddress} />
    </Container>
  )
}

const { Container, SafeButton, Form, DepositIcon, WithdrawIcon, SafeIcon, PoolDataCard } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[16]};
    > header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
      max-width: 468px;

      h1 {
        font-size: ${({ theme }) => theme.font.size[32]};
        font-style: normal;
        font-weight: 500;
        color: ${({ theme }) => theme.color.primary};
      }

      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        color: ${({ theme }) => theme.color.blue[400]};
        word-break: break-word;
      }

      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[16]};
      }
    }
  `,
  SafeButton: styled.div`
    display: flex;
    height: 25px;
    padding: 0px ${({ theme }) => theme.size[4]};
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.blue[50]};
    background: ${({ theme }) => theme.color.white};

    font-size: ${({ theme }) => theme.font.size[14]};
    font-style: normal;
    font-weight: 500;
    color: ${({ theme }) => theme.color.blackAlpha[600]};
  `,
  PoolDataCard: styled.div`
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[24]};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    border-radius: 12px;
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: ${({ theme }) => theme.font.size[14]};
        font-style: normal;
        font-weight: 500;
        color: ${({ theme }) => theme.color.blue[400]};
        &.primary {
          color: ${({ theme }) => theme.color.primary};
        }
        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }
      }
    }
  `,
  SafeIcon: styled(AiFillSafetyCertificate)`
    color: ${({ theme }) => theme.color.green[600]};
    font-size: ${({ theme }) => theme.font.size[16]};
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
