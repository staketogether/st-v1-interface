/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import StakeStats from './StakeStats'
import StakeSwitchActions from './StakeSwitchAction'

interface StakeFormProps {
  communityAddress?: `0x${string}`
  type: 'deposit' | 'withdraw'
}

export default function StakeForm({ communityAddress, type }: StakeFormProps) {
  const { address } = useAccount()

  // Move Form State Control to Here

  return (
    <Container>
      <Form>
        <StakeSwitchActions communityAddress={communityAddress} />
        {/* {type === 'stake' && address && communityAddress && (
          <StakeFormDeposit accountAddress={address} communityAddress={communityAddress} />
        )} */}
        {/* {type === 'unstake' && address && communityAddress && (
          <StakeFormWithdraw accountAddress={address} communityAddress={communityAddress} />
        )} */}
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
    border-radius: ${({ theme }) => theme.size[16]};
    display: grid;
    grid-template-columns: minmax(320px, 420px);
    grid-template-rows: 26px 136px 14px;
    gap: ${({ theme }) => theme.size[24]};
    padding: ${({ theme }) => theme.size[24]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[500]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};

    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `
}
