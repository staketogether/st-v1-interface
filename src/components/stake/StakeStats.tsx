import styled from 'styled-components'

import { BigNumber } from 'ethers'
import usePooledEthByShares from '../../hooks/contracts/usePooledEthByShares'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import { Pool } from '../../types/Pool'
import StakeReceivedDelegation from './StakeReceivedDelegation'
interface StakeStatsProps {
  pool?: Pool
}

export default function StakeStats({ pool }: StakeStatsProps) {
  const { t } = useTranslation()

  const rewardsShares = usePooledEthByShares(pool ? pool.rewardsShares : BigNumber.from(0))
  const delegatedShares = usePooledEthByShares(pool ? pool.delegatedShares : BigNumber.from(0))

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

      {pool && pool.delegations.length > 0 && (
        <DelegationsContainer>
          <StatsWrapper>
            <span>{t('members')}</span>
            <span>{pool.receivedDelegationsCount}</span>
          </StatsWrapper>
          {pool.delegations.map(delegation => (
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
    gap: ${({ theme }) => theme.size[12]};
    border-top: 1px solid ${({ theme }) => theme.color.blue[100]};
    padding-top: ${({ theme }) => theme.size[16]};

    > div:first-of-type {
      margin-bottom: ${({ theme }) => theme.size[8]};
    }
  `
}
