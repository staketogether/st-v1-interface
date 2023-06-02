import styled from 'styled-components'
import useConnectedAccount from '../../hooks/useConnectedAccount'
import { Community } from '../../types/Community'
import StakeFormDeposit from './StakeFormDeposit'
import StakeFormWithdraw from './StakeFormWithdraw'
import StakeStats from './StakeStats'
import StakeSwitchActions from './StakeSwitchAction'
import StakeFormWithdrawEmptyAccount from './StakeFormWithdrawEmptyAccount'
import StakeFormWithdrawEmptyCommunity from './StakeFormWithdrawEmptyCommunity'
import StakeFormDepositEmptyAccount from './StakeFormDepositEmptyAccount'
import StakeFormDepositEmptyCommunity from './StakeFormDepositEmptyCommunity'

interface StakeFormProps {
  community?: Community
  type: 'deposit' | 'withdraw'
}

export default function StakeForm({ community, type }: StakeFormProps) {
  const { account } = useConnectedAccount()
  const hasAccountAndCommunity = account && community?.address
  const emptyAccountAndEmptyCommunity = !account && !community?.address
  const hasAccountAndEmptyCommunity = account && !community?.address
  const emptyCommunityAndHasAccount = community?.address && !account
  return (
    <Container>
      <Form>
        <StakeSwitchActions communityAddress={community?.address} />
        {type === 'deposit' && hasAccountAndCommunity && (
          <StakeFormDeposit accountAddress={account} communityAddress={community?.address} />
        )}
        {type === 'deposit' && emptyAccountAndEmptyCommunity && (
          <StakeFormDepositEmptyAccount accountAddress={account} />
        )}
        {type === 'deposit' && emptyCommunityAndHasAccount && (
          <StakeFormDepositEmptyAccount accountAddress={account} />
        )}
        {type === 'deposit' && hasAccountAndEmptyCommunity && (
          <StakeFormDepositEmptyCommunity
            accountAddress={account}
            communityAddress={community?.address}
          />
        )}
        {type === 'withdraw' && hasAccountAndCommunity && (
          <StakeFormWithdraw accountAddress={account} communityAddress={community?.address} />
        )}
        {type === 'withdraw' && emptyAccountAndEmptyCommunity && (
          <StakeFormWithdrawEmptyAccount accountAddress={account} />
        )}
        {type === 'withdraw' && emptyCommunityAndHasAccount && (
          <StakeFormWithdrawEmptyAccount accountAddress={account} />
        )}
        {type === 'withdraw' && hasAccountAndEmptyCommunity && (
          <StakeFormWithdrawEmptyCommunity
            accountAddress={account}
            communityAddress={community?.address}
          />
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
