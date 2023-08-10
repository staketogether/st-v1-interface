import styled from 'styled-components'

import useTranslation from '@/hooks/useTranslation'
import { useState } from 'react'
import { Pool } from '../../types/Pool'
import PoolsInputSearch from './PoolsInputSearch'
import PoolsRowList from './PoolsRowList'
import handlePoolTypeIcon from '@/services/handlePoolTypeIcon'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import Fuse from 'fuse.js'
import useSearchPools from '@/hooks/subgraphs/useSearchPools'
import PoolsEmptyState from './PoolsEmptyState'
import useStakeTogether from '@/hooks/subgraphs/useStakeTogether'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import { truncateWei } from '@/services/truncate'
import { useMapPoolsWithTypes } from '@/hooks/contentful/useMapPoolsWithTypes'

type PoolsListProps = {
  pools: Pool[]
}

export default function PoolsControl({ pools }: PoolsListProps) {
  const [search, setSearch] = useState<string>('')
  const [activeFilters, setActiveFilters] = useState<string[]>(['all'])
  const { t } = useTranslation()
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { stakeTogether, stakeTogetherIsLoading } = useStakeTogether()

  const filterTypes = [
    {
      name: poolTypeTranslation('all'),
      value: 'all'
    },
    {
      name: poolTypeTranslation('art'),
      value: 'art'
    },
    {
      name: poolTypeTranslation('education'),
      value: 'education'
    },
    {
      name: poolTypeTranslation('socialImpact'),
      value: 'socialImpact'
    },
    {
      name: poolTypeTranslation('innovation'),
      value: 'innovation'
    }
  ]
  const { searchPools: searchPoolsData } = useSearchPools()
  const poolsWithTypes = useMapPoolsWithTypes(pools)

  const poolsFilterByType = poolsWithTypes.filter(pool => {
    if (activeFilters.includes('all')) {
      return pool
    }
    if (pool.type && activeFilters.includes(pool.type)) {
      return pool
    }
    return
  })

  const options = {
    includeScore: true,
    keys: [
      {
        name: 'address',
        weight: 1
      },
      {
        name: 'name',
        weight: 2
      }
    ],
    threshold: 0.3
  }

  const fuse = new Fuse(searchPoolsData, options)

  function searchPools() {
    if (!search || search.trim() === '') {
      return poolsFilterByType
    }
    const itemFiltered = fuse.search(search).map(pool => pool.item)
    return poolsFilterByType.filter(pool => itemFiltered.find(item => item.address === pool.address))
  }

  const poolsFilterBySearch = searchPools()

  function handleSetFilter(filter: string) {
    if (filter === 'all') {
      setActiveFilters(['all'])
      return
    }

    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(item => item !== filter))
    } else {
      setActiveFilters([...activeFilters.filter(item => item !== 'all'), filter])
    }
  }

  const clearFilter = () => {
    setActiveFilters(['all'])
    setSearch('')
  }

  return (
    <Container>
      <header>
        <h1>{t('v2.pools.title')}</h1>
        <InfoProjectContainer>
          <div>
            <h3>{t('v2.pools.projectInfo.tvl')}</h3>
            {stakeTogetherIsLoading ? (
              <SkeletonLoading height={14} />
            ) : (
              <span>{`${truncateWei(stakeTogether?.totalValueLocked || 0n)} ${t('eth.symbol')}`}</span>
            )}
          </div>
          <div>
            <h3>{t('v2.pools.projectInfo.rewards')}</h3>
            {stakeTogetherIsLoading ? (
              <SkeletonLoading height={14} />
            ) : (
              <span className='blue'>{`${truncateWei(stakeTogether?.totalRewards || 0n)} ${t(
                'eth.symbol'
              )}`}</span>
            )}
          </div>
          <div>
            <h3>{t('v2.pools.projectInfo.incentives')}</h3>
            {stakeTogetherIsLoading ? (
              <SkeletonLoading height={14} />
            ) : (
              <span className='blue'>{`${truncateWei(stakeTogether?.totalIncentives || 0n)} ${t(
                'eth.symbol'
              )}`}</span>
            )}
          </div>
          <div>
            <h3>{t('v2.pools.projectInfo.members')}</h3>
            {stakeTogetherIsLoading ? (
              <SkeletonLoading height={14} />
            ) : (
              <span className='secondary'>{`${stakeTogether?.accountsCount.toString()}`}</span>
            )}
          </div>
          <div>
            <h3>{t('v2.pools.projectInfo.projects')}</h3>
            {stakeTogetherIsLoading ? (
              <SkeletonLoading height={14} />
            ) : (
              <span className='purple'>{`${stakeTogether?.poolsCount.toString()}`}</span>
            )}
          </div>
          <div>
            <h3>{t('v2.pools.projectInfo.apy')}</h3>
            <span className='green'>6,5%</span>
          </div>
        </InfoProjectContainer>
      </header>
      <FiltersContainer>
        <Filters>
          {filterTypes.map(filter => (
            <FilterButton
              onClick={() => handleSetFilter(filter.value)}
              className={`${activeFilters.includes(filter.value) && 'active'}`}
              key={filter.value}
            >
              {handlePoolTypeIcon({ iconSize: 14, value: filter.value })}
              {filter.name}
            </FilterButton>
          ))}
        </Filters>
        <Search>
          <PoolsInputSearch search={search} setSearch={setSearch} />
        </Search>
      </FiltersContainer>
      <ListPools>
        {!poolsFilterBySearch.length && <PoolsEmptyState handleClickButton={clearFilter} />}
        {!!poolsFilterBySearch.length && (
          <header>
            <span>{t('v2.pools.list.name')}</span>
            <span>{t('v2.pools.list.type')}</span>
            <span>{t('v2.pools.list.people')}</span>
            <span>{t('v2.pools.list.invested')}</span>
          </header>
        )}
        {poolsFilterBySearch.map(pool => (
          <PoolsRowList
            key={pool.address}
            poolAddress={pool.address}
            members={pool.receivedDelegationsCount}
            staked={pool.poolBalance}
            type={pool.type}
          />
        ))}
      </ListPools>
    </Container>
  )
}

const { Container, InfoProjectContainer, ListPools, FiltersContainer, Filters, Search, FilterButton } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
    > header {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
      align-items: center;
      justify-content: center;

      > h1 {
        font-size: ${({ theme }) => theme.font.size[24]};
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        color: ${({ theme }) => theme.color.primary};
        text-align: center;
        align-self: stretch;
      }
    }
  `,
  InfoProjectContainer: styled.div`
    width: 90%;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 2px;
    align-items: center;

    > div {
      height: 50px;
      padding: 0px ${({ theme }) => theme.size[8]};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      background-color: ${({ theme }) => theme.color.whiteAlpha[500]};

      &:first-child {
        border-radius: 12px 0 0 12px;
      }
      &:last-child {
        border-radius: 0px 12px 12px 0px;
      }

      > h3 {
        font-size: ${({ theme }) => theme.font.size[12]};
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        color: ${({ theme }) => theme.color.blackAlpha[600]};
      }

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        color: ${({ theme }) => theme.color.primary};

        &.blue {
          color: ${({ theme }) => theme.color.blue[300]};
        }
        &.secondary {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.purple {
          color: ${({ theme }) => theme.color.purple[500]};
        }
        &.green {
          color: ${({ theme }) => theme.color.green[700]};
        }
      }
    }
  `,
  FiltersContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 320px;
  `,
  Filters: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  FilterButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0px ${({ theme }) => theme.size[12]};
    gap: ${({ theme }) => theme.size[8]};

    border-radius: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.color.whiteAlpha[400]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    border: none;

    font-size: ${({ theme }) => theme.font.size[14]};

    color: ${({ theme }) => theme.color.primary};

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
      color: ${({ theme }) => theme.color.secondary};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  Search: styled.div`
    display: grid;
    justify-content: flex-end;
  `,
  ListPools: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    > header {
      display: grid;
      grid-template-columns: 1fr 0.8fr 0.8fr 0.8fr 112px;
      gap: 8px;
      align-items: center;
      padding-left: 16px;

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};

        line-height: 150%;
        color: ${({ theme }) => theme.color.blue[600]};
      }
    }
  `
}
