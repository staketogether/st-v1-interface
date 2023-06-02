import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import { Community } from '../../types/Community'
import { StakeForm } from './StakeForm'
import { StakeFormEmpty } from './StakeFormEmpty'
import StakeStats from './StakeStats'
import StakeSwitchActions from './StakeSwitchAction'

interface StakeControlProps {
  community?: Community
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ community, type }: StakeControlProps) {
  const { account } = useConnectedAccount()
  const hasAccountAndCommunity = account && community?.address

  return (
    <Container>
      <Form>
        <StakeSwitchActions communityAddress={community?.address} />
        {hasAccountAndCommunity && (
          <StakeForm type={type} accountAddress={account} communityAddress={community.address} />
        )}
        {!hasAccountAndCommunity && <StakeFormEmpty type={type} accountAddress={account} />}
      </Form>
      {community?.address && <StakeStats community={community} />}
    </Container>
  )
}

const { Container, Form } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
  `,
  Form: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 420px);
    padding: ${({ theme }) => theme.size[24]};
    gap: ${({ theme }) => theme.size[24]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `
}
