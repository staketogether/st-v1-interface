import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import { StakeForm } from './StakeForm'
import { StakeFormEmpty } from './StakeFormEmpty'
import StakePoolInfo from './StakePoolInfo'
import StakeSwitchActions from './StakeSwitchAction'

interface StakeControlProps {
  poolAddress: `0x${string}` | undefined
  type: 'deposit' | 'withdraw'
}

export default function StakeControl({ poolAddress, type }: StakeControlProps) {
  const { account } = useConnectedAccount()
  const hasAccountAndPool = account && poolAddress

  return (
    <Container>
      <Form>
        <StakeSwitchActions poolAddress={poolAddress} accountAddress={account} />
        {hasAccountAndPool && (
          <StakeForm type={type} accountAddress={account} poolAddress={poolAddress} />
        )}
        {!hasAccountAndPool && (
          <StakeFormEmpty type={type} accountAddress={account} poolAddress={poolAddress} />
        )}
      </Form>
      <StakePoolInfo poolAddress={poolAddress} />
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
