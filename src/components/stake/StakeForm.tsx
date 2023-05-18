/* eslint-disable @typescript-eslint/no-unused-vars */
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
        {/* {address && !communityAddress && <div> Put Unstake Empty Form Here</div>}
        {address && !communityAddress && <div> Put Unstake Empty Form Here</div>}
        {!address && <div> PutSelect Community Here</div>}
        {!address && <div> Put Connect Wallet Form Here</div>} */}
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
    background-color: ${({ theme }) => theme.color.whiteAlpha[500]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `
}
