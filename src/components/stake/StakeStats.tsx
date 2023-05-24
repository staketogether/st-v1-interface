import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import useReceivedDelegationsOf from '../../hooks/contracts/useReceivedDelegationsOf'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import EnsAvatar from '../shared/ens/EnsAvatar'
import { default as EnsName } from '../shared/ens/EnsName'

interface StakeStatsProps {
  communityAddress: `0x${string}`
}

export default function StakeStats({ communityAddress }: StakeStatsProps) {
  const { t } = useTranslation()
  const { ceth } = globalConfig
  const { receivedDelegations, totalAmountReceived, totalDelegationsReceived } =
    useReceivedDelegationsOf(communityAddress)

  const communityRewards = '0'

  return (
    <Container>
      <StatsContainer>
        <Stats>
          <StatsWrapper>
            <span>{t('rewards')}</span>
            <span>
              {truncateEther(communityRewards)}
              <span>{ceth.symbol}</span>
            </span>
          </StatsWrapper>
          <StatsWrapper>
            <span>{t('delegated')}</span>
            <span>
              {`${truncateEther(totalAmountReceived)}`}
              <span>{ceth.symbol}</span>
            </span>
          </StatsWrapper>
          <StatsWrapper>
            <span>{t('members')}</span>
            <span>{totalDelegationsReceived}</span>
          </StatsWrapper>
        </Stats>
      </StatsContainer>
      {receivedDelegations.length > 0 && (
        <DelegationsContainer>
          {receivedDelegations.map(delegation => (
            <Delegation key={delegation.account}>
              <div>
                <EnsAvatar address={delegation.account as `0x${string}`} />
                <EnsName address={delegation.account as `0x${string}`} />
              </div>
              <div>
                <span>
                  {`${truncateEther(delegation.amount.toString())}`} <span>{ceth.symbol}</span>
                </span>
              </div>
            </Delegation>
          ))}
        </DelegationsContainer>
      )}
    </Container>
  )
}

const { Container, StatsContainer, Stats, StatsWrapper, DelegationsContainer, Delegation } = {
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
  `,
  Delegation: styled.div`
    display: grid;
    grid-template-columns: 2fr auto;
    align-items: center;
    gap: 8px;

    > div:nth-child(1) {
      display: grid;
      grid-template-columns: 24px auto;
      gap: 8px;
    }

    > div:nth-child(2) {
      display: grid;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};

      > span:nth-child(1) {
        > span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `
}
