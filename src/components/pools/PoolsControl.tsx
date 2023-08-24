import styled from 'styled-components'

import useTranslation from '@/hooks/useTranslation'
import { useState } from 'react'
import { PoolSubgraph } from '../../types/Pool'
import PoolsInputSearch from './PoolsInputSearch'
import PoolsRowList from './PoolsRowList'
import handlePoolTypeIcon from '@/services/handlePoolTypeIcon'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import Fuse from 'fuse.js'
import useSearchPools from '@/hooks/subgraphs/useSearchPools'
import PoolsEmptyState from './PoolsEmptyState'
import { useMapPoolsWithTypes } from '@/hooks/contentful/useMapPoolsWithTypes'
import PoolsCard from './PoolsCard'

type PoolsListProps = {
  pools: PoolSubgraph[]
}

export default function PoolsControl({ pools }: PoolsListProps) {
  const [search, setSearch] = useState<string>('')
  const [activeFilters, setActiveFilters] = useState<string[]>(['all'])
  const { t } = useTranslation()
  const { poolTypeTranslation } = usePoolTypeTranslation()

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
    console.log(filter)
    if (filter === 'all') {
      setActiveFilters(['all'])
      return
    }

    if (activeFilters.includes(filter)) {
      const filters = activeFilters.filter(item => item !== filter)
      setActiveFilters(!filters.length ? ['all'] : filters)
      return
    }
    setActiveFilters([...activeFilters.filter(item => item !== 'all'), filter])
  }

  const clearFilter = () => {
    setActiveFilters(['all'])
    setSearch('')
  }

  return (
    <Container>
      <header>
        <h1>{t('v2.pools.title')}</h1>
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
        <PoolsInputSearch search={search} setSearch={setSearch} />
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
        {poolsFilterBySearch.map((pool, i) => (
          <>
            <PoolsRowList
              key={pool.address}
              poolAddress={pool.address}
              members={pool.receivedDelegationsCount}
              staked={pool.poolBalance}
              type={pool.type}
            />
            <PoolsCard
              key={i}
              poolAddress={pool.address}
              members={pool.receivedDelegationsCount}
              staked={pool.poolBalance}
              type={pool.type}
            />
          </>
        ))}
      </ListPools>
    </Container>
  )
}

const { Container, ListPools, FiltersContainer, Filters, FilterButton } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    > header {
      > h1 {
        font-size: ${({ theme }) => theme.font.size[32]};
        font-style: normal;
        font-weight: 500;
        color: ${({ theme }) => theme.color.primary};
      }
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: ${({ theme }) => theme.size[32]};
    }
  `,
  FiltersContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-wrap: wrap-reverse;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      justify-content: space-between;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: ${({ theme }) => theme.size[16]};
    }
  `,
  Filters: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  FilterButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0px ${({ theme }) => theme.size[12]};
    gap: ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    border: none;
    font-size: ${({ theme }) => theme.font.size[14]};

    white-space: nowrap;
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
    color: ${({ theme }) => theme.color.primary};
    &.active,
    &:hover {
      background: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.white};
    }
  `,

  ListPools: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.size[8]};
    }

    > header {
      display: none;
      grid-template-columns: 1fr 0.8fr 0.8fr 1fr;
      gap: 8px;
      align-items: center;
      padding-left: 16px;

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};

        line-height: 150%;
        color: ${({ theme }) => theme.color.blue[600]};
      }

      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: grid;
      }
    }
  `
}
