import styled from 'styled-components'

import usePooledEthByShares from '../../hooks/contracts/usePooledEthByShares'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import { Community } from '../../types/Community'
import StakeReceivedDelegation from './StakeReceivedDelegation'
interface StakeStatsProps {
  community: Community
}

export default function StakeStats({ community }: StakeStatsProps) {
  const { t } = useTranslation()

  const rewardsShares = usePooledEthByShares(community.rewardsShares)
  const delegatedShares = usePooledEthByShares(community.delegatedShares)

  return (
    <Container>
      <StatsContainer>
        <Stats>
          <StatsWrapper>
            <span>{t('delegated')}</span>
            <span>
              {`${truncateEther(delegatedShares.toString(), 6)}`}
              <span>{t('lsd.symbol')}</span>
            </span>
          </StatsWrapper>
          <StatsWrapper>
            <span>{t('rewards')}</span>
            <span>
              {truncateEther(rewardsShares.toString(), 6)}
              <span>{t('lsd.symbol')}</span>
            </span>
          </StatsWrapper>
        </Stats>
      </StatsContainer>

      {community.delegations.length > 0 && (
        <DelegationsContainer>
          <StatsWrapper>
            <span>{t('members')}</span>
            <span>{community.receivedDelegationsCount}</span>
          </StatsWrapper>
          {community.delegations.map(delegation => (
            <StakeReceivedDelegation key={delegation.delegate.address} delegation={delegation} />
          ))}
        </DelegationsContainer>
      )}
    </Container>
  )
}

const { Container, StatsContainer, Stats, StatsWrapper, DelegationsContainer } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[24]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    gap: ${({ theme }) => theme.size[16]};
  `,
  StatsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[12]};
  `,
  Stats: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  StatsWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    height: 20px;
    align-items: center;
    > span:nth-child(2) {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
      display: flex;
      gap: 4px;

      > span {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  DelegationsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[8]};
    border-top: 1px solid ${({ theme }) => theme.color.blue[100]};
    padding-top: ${({ theme }) => theme.size[16]};

    > div:first-of-type {
      margin-bottom: ${({ theme }) => theme.size[8]};
    }
  `
}
