import { useState } from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import styled, { useTheme } from 'styled-components'
import usePooledEthByShares from '../../hooks/contracts/usePooledEthByShares'
import usePool from '../../hooks/subgraphs/usePool'
import useTranslation from '../../hooks/useTranslation'
import { truncateWei } from '../../services/truncate'

import Loading from '../shared/icons/Loading'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeReceivedDelegation from './StakeReceivedDelegation'

interface StakeStatsProps {
  poolAddress: `0x${string}` | undefined
}

export default function StakePoolInfo({ poolAddress }: StakeStatsProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  const [skip, setSkip] = useState(0)

  const {
    pool: poolData,
    fetchMore,
    loadMoreLoading: loadMoreLoadingPoolData,
    initialLoading
  } = usePool(poolAddress, { first: 10, skip: 0 })

  const { balance: rewardsShares, loading: isRewardsSharesLoading } = usePooledEthByShares(
    poolData ? poolData.rewardsShares : '0'
  )
  const { balance: delegatedShares, loading: delegatedSharesLoading } = usePooledEthByShares(
    poolData ? poolData.delegatedShares : '0'
  )

  const handleLoadMore = () => {
    if (poolAddress) {
      const newSkip = skip + 10
      setSkip(newSkip)
      fetchMore({ id: poolAddress, first: 10, skip: newSkip })
    }
  }

  return (
    <Container>
      <StatsContainer>
        <Stats>
          <StatsBox>
            <span>{t('staked')}</span>
            <span>
              {!!(delegatedSharesLoading || initialLoading) && poolAddress ? (
                <SkeletonLoading width={80} />
              ) : (
                <>
                  <span style={{ color: theme.color.green[600] }}>{`${truncateWei(
                    delegatedShares,
                    6
                  )}`}</span>{' '}
                  <span style={{ color: theme.color.secondary }}>{t('lsd.symbol')}</span>
                </>
              )}
            </span>
          </StatsBox>
          <StatsBox>
            <span>{t('rewards')}</span>
            <span>
              {!!(isRewardsSharesLoading || initialLoading) && poolAddress ? (
                <SkeletonLoading width={80} />
              ) : (
                <>
                  {truncateWei(rewardsShares, 6)}{' '}
                  <span style={{ color: theme.color.secondary }}>{t('lsd.symbol')}</span>
                </>
              )}
            </span>
          </StatsBox>
          <StatsBox>
            <span>{t('members')}</span>
            <span>
              {initialLoading && poolAddress ? (
                <SkeletonLoading width={80} />
              ) : (
                <>{poolData?.receivedDelegationsCount.toString()}</>
              )}
            </span>
          </StatsBox>
        </Stats>
      </StatsContainer>
      {initialLoading && (
        <DelegationsContainer>
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
        </DelegationsContainer>
      )}
      {!initialLoading && poolData && poolData.delegations.length > 0 && (
        <DelegationsContainer>
          {poolData.delegations.map((delegation, index) => (
            <StakeReceivedDelegation
              key={delegation.delegate.address}
              delegation={delegation}
              rank={index + 1}
            />
          ))}
          {poolData?.address && poolData.delegations.length < poolData.receivedDelegationsCount && (
            <LoadMoreButton onClick={handleLoadMore}>
              {loadMoreLoadingPoolData && <Loading />}
              {!loadMoreLoadingPoolData && <AiOutlineUsergroupAdd />}
              {t('loadMore')}
            </LoadMoreButton>
          )}
        </DelegationsContainer>
      )}
    </Container>
  )
}

const { Container, StatsContainer, Stats, StatsBox, DelegationsContainer, LoadMoreButton } = {
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.size[8]};
  `,
  StatsBox: styled.div`
    display: flex;
    height: 75px;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    background-color: ${({ theme }) => theme.color.whiteAlpha[400]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    > span {
      font-weight: 500;

      &:nth-child(1) {
        font-size: ${({ theme }) => theme.font.size[12]};
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
