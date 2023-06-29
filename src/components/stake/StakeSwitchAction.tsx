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
import StakeSelectPool from './StakeSelectPool'

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
    } else {
      router.push(`/stake/${type}`)
    }
  }

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
        <StakeButton>
          <AiOutlinePlus />
          <span>{t('buyEth')}</span>
        </StakeButton>
      </Tabs>
      <StakeButton>
        <AiOutlineShareAlt />
      </StakeButton>
    </Container>
  )
}

const { Container, Tabs, StakeButton } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: ${({ theme }) => theme.size[8]};
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
