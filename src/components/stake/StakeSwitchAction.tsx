import { useRouter } from 'next/router'
import styled from 'styled-components'
import StakeSelectCommunity from './StakeSelectCommunity'

interface StakeSwitchActionsProps {
  communityAddress?: `0x${string}`
}

export default function StakeSwitchActions({ communityAddress }: StakeSwitchActionsProps) {
  const router = useRouter()

  function handleSwitch(type: 'stake' | 'unstake') {
    if (communityAddress) {
      router.push(`/${type}/${communityAddress}`)
    } else {
      router.push(`/${type}`)
    }
  }

  return (
    <Container>
      <Tabs>
        <StakeTab onClick={() => handleSwitch('stake')}>Stake</StakeTab>
        <StakeTab onClick={() => handleSwitch('unstake')}>Unstake</StakeTab>
      </Tabs>
      <StakeSelectCommunity communityAddress={communityAddress} />
    </Container>
  )
}

const { Container, Tabs, StakeTab } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: auto;
  `,
  Tabs: styled.div`
    display: flex;
    gap: 5px;
  `,
  StakeTab: styled.button`
    border: none;
    height: 24px;
    width: 91px;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.color.purple[100]};
    justify-content: center;
    border-radius: ${({ theme }) => theme.size[16]};
    > span {
      color: ${({ theme }) => theme.color.blue[300]};

      font-weight: 500;
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 17px;
    }
  `
}
