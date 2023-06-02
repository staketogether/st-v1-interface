import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import { Community } from '../../types/Community'
import StakeFormDeposit from './StakeFormDeposit'
import StakeFormWithdraw from './StakeFormWithdraw'
import StakeStats from './StakeStats'
import StakeSwitchActions from './StakeSwitchAction'
import useStAccount from "@/hooks/subgraphs/useStAccount";

interface StakeFormProps {
  community?: Community
  type: 'deposit' | 'withdraw'
}

export default function StakeForm({ community, type }: StakeFormProps) {
  const { account: walletAddress } = useConnectedAccount()
  const { account } = useStAccount(walletAddress)
  // Move Form State Control to Here
  return (
    <Container>
      <Form>
        <StakeSwitchActions communityAddress={community?.address} />
        {type === 'deposit' && walletAddress && community?.address && (
          <StakeFormDeposit account={account} walletAddress={walletAddress} community={community} />
        )}
        {type === 'withdraw' && walletAddress && community?.address && (
          <StakeFormWithdraw stAcccount={account} walletAddress={walletAddress} community={community} />
        )}
        {type === 'deposit' && !walletAddress && <div>WIP: Connect Wallet Deposit</div>}
        {type === 'withdraw' && !walletAddress && <div>WIP: Connect Wallet Withdraw</div>}
        {type === 'deposit' && walletAddress && !community?.address && <div>WIP: Select Community Deposit</div>}
        {type === 'withdraw' && walletAddress && !community?.address && (
          <div>WIP: Select Community Withdraw</div>
        )}
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
