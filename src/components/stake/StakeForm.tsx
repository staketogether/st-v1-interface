import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import StakeFormDeposit from './StakeFormDeposit'
import StakeFormWithdraw from './StakeFormWithdraw'
import StakeStats from './StakeStats'
import StakeSwitchActions from './StakeSwitchAction'

interface StakeFormProps {
  communityAddress?: `0x${string}`
  type: 'deposit' | 'withdraw'
}

export default function StakeForm({ communityAddress, type }: StakeFormProps) {
  const { account } = useConnectedAccount()

  // Move Form State Control to Here

  return (
    <Container>
      <Form>
        <StakeSwitchActions communityAddress={communityAddress} />
        {type === 'deposit' && account && communityAddress && (
          <StakeFormDeposit accountAddress={account} communityAddress={communityAddress} />
        )}
        {type === 'withdraw' && account && communityAddress && (
          <StakeFormWithdraw accountAddress={account} communityAddress={communityAddress} />
        )}
        {type === 'deposit' && !account && <div>WIP: Connect Wallet Deposit</div>}
        {type === 'withdraw' && !account && <div>WIP: Connect Wallet Withdraw</div>}
        {type === 'deposit' && account && !communityAddress && <div>WIP: Select Community Deposit</div>}
        {type === 'withdraw' && account && !communityAddress && <div>WIP: Select Community Withdraw</div>}
      </Form>
      {communityAddress && <StakeStats communityAddress={communityAddress} />}
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
