import { Divider } from 'antd'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'
import useReceivedDelegationsOf from '../../hooks/contracts/useReceivedDelegationsOf'
import { truncateEther } from '../../services/truncateEther'
import EnsAvatar from '../shared/ens/EnsAvatar'
import { default as EnsName, default as EnsNameCommunity } from '../shared/ens/EnsName'

interface StakeStatsProps {
  communityAddress: `0x${string}`
}

export default function StakeStats({ communityAddress }: StakeStatsProps) {
  const { ceth } = globalConfig
  const { receivedDelegations, totalAmountReceived, totalDelegationsReceived } =
    useReceivedDelegationsOf(communityAddress)

  return (
    <Container>
      <StatsContainer>
        <Header>
          <span>Community Stats</span>
          <EnsNameCommunity address={communityAddress} />
        </Header>
        <Stats>
          <StatsWrapper>
            <span>Delegated</span>
            <span>
              <span>{`${truncateEther(totalAmountReceived)} ${ceth.symbol}`}</span>
            </span>
          </StatsWrapper>
          <StatsWrapper>
            <span>Members</span>
            <span>{totalDelegationsReceived}</span>
          </StatsWrapper>
        </Stats>
      </StatsContainer>

      <div>
        <Divider style={{ border: '1px solid #B0B5F2' }} />
        {receivedDelegations.map(delegation => (
          <Delegation key={delegation.account}>
            <div>
              <EnsAvatar address={delegation.account as `0x${string}`} />
              <EnsName address={delegation.account as `0x${string}`} />
            </div>
            <div>
              <span>{`${truncateEther(delegation.amount.toString())} ${ceth.symbol}`}</span>
            </div>
          </Delegation>
        ))}
      </div>
    </Container>
  )
}

const { Container, StatsContainer, Stats, StatsWrapper, Header, Delegation } = {
  Container: styled.div`
    padding: 16px;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid ${({ theme }) => theme.color.gray[200]};
    border-radius: ${({ theme }) => theme.size[16]};
    display: flex;
    flex-direction: column;
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-between;

    font-weight: 500;
    font-size: ${({ theme }) => theme.font.size[14]};
    line-height: 17px;
    color: ${({ theme }) => theme.color.purple[600]};
    text-align: center;
  `,
  StatsContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Stats: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  StatsWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    > span {
      font-weight: 500;
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 15px;
      > span {
        color: ${({ theme }) => theme.color.purple[600]};
      }
    }
  `,
  Delegation: styled.div`
    display: grid;
    grid-template-columns: 3fr auto;
    align-items: center;

    > div:nth-child(1) {
      display: grid;
      grid-template-columns: 24px auto;
      gap: 8px;
    }

    > div:nth-child(2) {
      display: grid;
      font-size: ${({ theme }) => theme.font.size[14]};
    }
  `
}
