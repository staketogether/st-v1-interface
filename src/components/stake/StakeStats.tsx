import { BigNumber } from 'ethers'
import { useState } from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import styled from 'styled-components'
import usePooledEthByShares from '../../hooks/contracts/usePooledEthByShares'
import usePool from '../../hooks/subgraphs/usePool'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import { Pool } from '../../types/Pool'
import Loading from '../shared/icons/Loading'
import StakeReceivedDelegation from './StakeReceivedDelegation'

interface StakeStatsProps {
  pool?: Pool
}

export default function StakeStats({ pool }: StakeStatsProps) {
  const { t } = useTranslation()

  const [skip, setSkip] = useState(0)

  const { pool: poolData, fetchMore, loading } = usePool(pool?.address, { first: 10, skip: 0 })

  const rewardsShares = usePooledEthByShares(BigNumber.from(poolData ? poolData.rewardsShares : '0'))
  const delegatedShares = usePooledEthByShares(BigNumber.from(poolData ? poolData.delegatedShares : '0'))

  const handleLoadMore = () => {
    if (pool?.address) {
      const newSkip = skip + 10
      setSkip(newSkip)
      fetchMore({ id: pool.address, first: 10, skip: newSkip })
    }
  }

  return (
    <Container>
      <StatsContainer>
        <Stats>
          <StatsWrapper>
            <span>{t('staked')}</span>
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
      {poolData && poolData.delegations.length > 0 && (
        <DelegationsContainer>
          <StatsWrapper>
            <span>{t('members')}</span>
            <span>{poolData.receivedDelegationsCount}</span>
          </StatsWrapper>
          {poolData.delegations.map((delegation, index) => (
            <StakeReceivedDelegation
              key={delegation.delegate.address}
              delegation={delegation}
              rank={index + 1}
            />
          ))}
          {poolData?.address && poolData.delegations.length < poolData.receivedDelegationsCount && (
            <LoadMoreButton onClick={handleLoadMore}>
              {loading && <Loading />}
              {!loading && <AiOutlineUsergroupAdd />}
              {t('loadMore')}
            </LoadMoreButton>
          )}
        </DelegationsContainer>
      )}
    </Container>
  )
}

const { Container, StatsContainer, Stats, StatsWrapper, DelegationsContainer, LoadMoreButton } = {
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
  `,
  LoadMoreButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    justify-content: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
