import useActiveRoute from '@/hooks/useActiveRoute'
import useTranslation from '@/hooks/useTranslation'
import { Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai'
import { BsShare } from 'react-icons/bs'
import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import Tabs, { TabsItems } from '../shared/Tabs'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'
import { StakeForm } from './StakeForm'
import StakePoolInfo from './StakePoolInfo'

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

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  return (
    <Container>
      {poolAddress && (
        <header>
          <div>
            <EnsAvatar size={32} address={poolAddress} />
            <EnsName larger address={poolAddress} />
          </div>
          <Tooltip trigger='click' title={t('copiedToClipboard')}>
            <ShareButton onClick={copyToClipboard}>
              <ShareIcon />
            </ShareButton>
          </Tooltip>
        </header>
      )}
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

const { Container, Form, DepositIcon, WithdrawIcon, ShareButton, ShareIcon } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[16]};
    > header {
      display: flex;
      justify-content: space-between;
      padding: 0 ${({ theme }) => theme.size[24]};
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
  ShareIcon: styled(BsShare)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `
}
