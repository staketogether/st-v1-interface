import { Divider } from 'antd'
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

  return (
    <Container>
      <StatsContainer>
        <Stats>
          <StatsWrapper>
            <span>{t('delegated')}</span>
            <span>
              <span>{`${truncateEther(totalAmountReceived)} ${ceth.symbol}`}</span>
            </span>
          </StatsWrapper>
          <StatsWrapper>
            <span>{t('members')}</span>
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

const { Container, StatsContainer, Stats, StatsWrapper, Delegation } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[500]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[24]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `,
  StatsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[24]};
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
      font-size: ${({ theme }) => theme.font.size[14]};

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
