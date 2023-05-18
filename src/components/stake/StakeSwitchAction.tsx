import { useRouter } from 'next/router'
import styled from 'styled-components'
import useActiveRoute from '../../hooks/useActiveRoute'
import useTranslation from '../../hooks/useTranslation'
import StakeSelectCommunity from './StakeSelectCommunity'

interface StakeSwitchActionsProps {
  communityAddress?: `0x${string}`
}

export default function StakeSwitchActions({ communityAddress }: StakeSwitchActionsProps) {
  const router = useRouter()
  const { isActive } = useActiveRoute()
  const { t } = useTranslation()

  function handleSwitch(type: 'deposit' | 'withdraw') {
    if (communityAddress) {
      router.push(`/stake/${type}/${communityAddress}`)
    } else {
      router.push(`/stake/${type}`)
    }
  }

  return (
    <Container>
      <StakeSelectCommunity communityAddress={communityAddress} />
      <Tabs>
        <StakeTab
          className={`${isActive('deposit') ? 'active' : ''}`}
          onClick={() => handleSwitch('deposit')}
        >
          {t('deposit')}
        </StakeTab>
        <StakeTab
          className={`${isActive('withdraw') ? 'active' : ''} purple`}
          onClick={() => handleSwitch('withdraw')}
        >
          {t('withdraw')}
        </StakeTab>
      </Tabs>
    </Container>
  )
}

const { Container, Tabs, StakeTab } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${({ theme }) => theme.size[8]};
  `,
  Tabs: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    justify-content: flex-end;
  `,
  StakeTab: styled.button`
    border: none;
    height: 32px;
    display: flex;
    align-items: center;

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
  `
}
