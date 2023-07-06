import { Tooltip } from 'antd'
import { useRouter } from 'next/router'
import {
  AiOutlinePlus,
  AiOutlineShareAlt,
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignTop
} from 'react-icons/ai'
import styled from 'styled-components'
import useActiveRoute from '../../hooks/useActiveRoute'
import useTranslation from '../../hooks/useTranslation'
import useWalletByEthModal from '@/hooks/useWalletByEthModal'

interface StakeSwitchActionsProps {
  poolAddress?: `0x${string}`
  accountAddress?: `0x${string}`
}

export default function StakeSwitchActions({ poolAddress, accountAddress }: StakeSwitchActionsProps) {
  const router = useRouter()
  const { isActive } = useActiveRoute()
  const { t } = useTranslation()

  function handleSwitch(type: 'deposit' | 'withdraw') {
    if (poolAddress) {
      router.push(`/stake/${type}/${poolAddress}`)
    } else {
      router.push(`/stake/${type}`)
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  const { setOpenModal } = useWalletByEthModal()

  return (
    <Container>
      <Tabs>
        <StakeButton
          className={`${isActive('deposit') ? 'active' : ''}`}
          onClick={() => handleSwitch('deposit')}
        >
          <AiOutlineVerticalAlignBottom />
          <span>{t('deposit')}</span>
        </StakeButton>
        <StakeButton
          className={`${isActive('withdraw') ? 'active' : ''} purple`}
          onClick={() => handleSwitch('withdraw')}
        >
          <AiOutlineVerticalAlignTop />
          <span>{t('withdraw')}</span>
        </StakeButton>
        {accountAddress && (
          <StakeButton onClick={() => setOpenModal(true)}>
            <AiOutlinePlus />
            <span>{t('buyEth.button')}</span>
          </StakeButton>
        )}
      </Tabs>
      <Tooltip trigger='click' title={t('copiedToClipboard')}>
        <StakeButton onClick={copyToClipboard}>
          <AiOutlineShareAlt />
        </StakeButton>
      </Tooltip>
    </Container>
  )
}

const { Container, Tabs, StakeButton } = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Tabs: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    justify-content: flex-end;
  `,
  StakeButton: styled.button`
    border: none;
    height: 32px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }

    span {
      display: none;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      span {
        display: block;
      }
    }
  `
}
