import { useRouter } from 'next/router'
import useActiveRoute from '../../hooks/useActiveRoute'
import useTranslation from '../../hooks/useTranslation'
import styled from 'styled-components'
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai'

interface StakeSwitchActionsProps {
  poolAddress?: `0x${string}`
}

export default function StakeSwitchActions({ poolAddress }: StakeSwitchActionsProps) {
  const router = useRouter()
  const { isActive } = useActiveRoute()
  const { t } = useTranslation()

  function handleSwitch(type: 'deposit' | 'withdraw') {
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

  return (
    <TabsContainer>
      <TabItem className={`${isActive('deposit') ? 'active' : ''}`} onClick={() => handleSwitch('deposit')}>
        <DepositIcon />
        {t('deposit')}
      </TabItem>
      <TabItem
        className={`${isActive('withdraw') ? 'active' : ''} purple`}
        onClick={() => handleSwitch('withdraw')}
      >
        <WithdrawIcon />
        {t('withdraw')}
      </TabItem>
    </TabsContainer>
  )
}

const { TabsContainer, TabItem, DepositIcon, WithdrawIcon } = {
  TabsContainer: styled.div`
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.color.blue[50]};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[32]};
    padding: 0px ${({ theme }) => theme.size[24]};
  `,
  TabItem: styled.div`
    display: flex;
    cursor: pointer;
    gap: 8px;
    color: ${({ theme }) => theme.color.blackAlpha[500]};
    align-items: center;
    font-size: ${({ theme }) => theme.font.size[16]};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: ${({ theme }) => theme.size[12]} 0px;

    &.active {
      border-bottom: 3px solid ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.primary};
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
        border-bottom: 3px solid ${({ theme }) => theme.color.secondary};
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
