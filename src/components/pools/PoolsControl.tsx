import styled from 'styled-components'

import useTranslation from '@/hooks/useTranslation'
import { useState } from 'react'
import { Pool, PoolsType } from '../../types/Pool'
import PoolsInputSearch from './PoolsInputSearch'
import PoolsRowList from './PoolsRowList'
import { mapPoolsWithTypes } from '@/services/pools'
import handlePoolTypeIcon from '@/services/handlePoolTypeIcon'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import Fuse from 'fuse.js'
import useSearchPools from '@/hooks/subgraphs/useSearchPools'
import PoolsEmptyState from './PoolsEmptyState'

type PoolsListProps = {
  pools: Pool[]
}

export default function PoolsControl({ pools }: PoolsListProps) {
  const [search, setSearch] = useState<string>('')
  const [activeFilters, setActiveFilters] = useState<PoolsType[]>([PoolsType.all])
  const { t } = useTranslation()
  const { poolTypeTranslation } = usePoolTypeTranslation()

  const filterTypes = [
    {
      name: poolTypeTranslation(PoolsType.all),
      value: PoolsType.all
    },
    {
      name: poolTypeTranslation(PoolsType.art),
      value: PoolsType.art
    },
    {
      name: poolTypeTranslation(PoolsType.education),
      value: PoolsType.education
    },
    {
      name: poolTypeTranslation(PoolsType.socialImpact),
      value: PoolsType.socialImpact
    },
    {
      name: poolTypeTranslation(PoolsType.innovation),
      value: PoolsType.innovation
    }
  ]
  const { searchPools: searchPoolsData } = useSearchPools()
  const poolsWithTypes = mapPoolsWithTypes(pools)

  const poolsFilterByType = poolsWithTypes.filter(pool => {
    if (activeFilters.includes(PoolsType.all)) {
      return pool
    }
    if (activeFilters.includes(pool.type)) {
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

  function handleSetFilter(filter: PoolsType) {
    if (filter === PoolsType.all) {
      setActiveFilters([PoolsType.all])
      return
    }

    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(item => item !== filter))
    } else {
      setActiveFilters([...activeFilters.filter(item => item !== PoolsType.all), filter])
    }
  }

  const clearFilter = () => {
    setActiveFilters([PoolsType.all])
    setSearch('')
  }

  return (
    <Container>
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

const { Container, ListPools, FiltersContainer, Filters, Search, FilterButton } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
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
