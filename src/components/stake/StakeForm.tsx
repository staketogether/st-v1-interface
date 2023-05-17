import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { ShareButton } from '../shared/ShareButton'
import StakeFormStake from './StakeFormStake'
import StakeFormUnstake from './StakeFormUnstake'
import StakeStats from './StakeStats'
import StakeSwitchActions from './StakeSwitchAction'

interface StakeFormProps {
  communityAddress?: `0x${string}`
  type: 'stake' | 'unstake'
}

export default function StakeForm({ communityAddress, type }: StakeFormProps) {
  const { address } = useAccount()

  // Move Form State Control to Here

  return (
    <Container>
      <ShareButton />
      <Form>
        <StakeSwitchActions communityAddress={communityAddress} />
        {type === 'stake' && address && communityAddress && (
          <StakeFormStake accountAddress={address} communityAddress={communityAddress} />
        )}
        {type === 'unstake' && address && communityAddress && (
          <StakeFormUnstake accountAddress={address} communityAddress={communityAddress} />
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
    > h1 {
      font-weight: 500;
      font-size: ${({ theme }) => theme.font.size[16]};
      color: ${({ theme }) => theme.color.black};
    }
  `,
  Form: styled.div`
    padding: 16px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid ${({ theme }) => theme.color.gray[200]};
    border-radius: ${({ theme }) => theme.size[16]};
    display: grid;
    grid-template-columns: minmax(320px, 448px);
    grid-template-rows: 26px 136px 14px;
    gap: 24px;
  `
}
