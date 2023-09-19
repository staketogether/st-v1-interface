import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import { useMapPoolsWithTypes } from '@/hooks/contentful/useMapPoolsWithTypes'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { truncateWei } from '@/services/truncate'
import { StakeTogether } from '@/types/StakeTogether'
import Fuse from 'fuse.js'
import { useState } from 'react'
import styled from 'styled-components'
import { PoolSubgraph } from '../../types/Pool'
import LayoutTitle from '../shared/layout/LayoutTitle'
import PoolsCard from './PoolsCard'
import PoolsEmptyState from './PoolsEmptyState'
import PoolsInputSearch from './PoolsInputSearch'
import PoolsRowList from './PoolsRowList'

type PoolsListProps = {
  pools: PoolSubgraph[]
  stakeTogether: StakeTogether
}

export default function PoolsControl({ pools, stakeTogether }: PoolsListProps) {
  const [search, setSearch] = useState<string>('')
  const [activeFilters, setActiveFilters] = useState<string[]>(['all'])
  const { t } = useLocaleTranslation()
  const { poolTypeTranslation } = usePoolTypeTranslation()

  const { poolsWithTypes, isLoading } = useMapPoolsWithTypes(pools)

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

  const fuse = new Fuse(poolsFilterByType, options)

  function searchPools() {
    if (!search || search.trim() === '') {
      return poolsFilterByType
    }
    const itemFiltered = fuse.search(search).map(pool => pool.item)

    return poolsFilterByType.filter(pool => itemFiltered.find(item => item.address === pool.address))
  }

  const poolsFilterBySearch = searchPools()

  const selectFilter = (filter: string[]) => {
    setSearch('')
    setActiveFilters(filter)
  }

  const selectSearch = (search: string) => {
    setActiveFilters(['all'])
    setSearch(search)
  }

  const clearFilter = () => {
    setActiveFilters(['all'])
    setSearch('')
  }

  const filterTypes = [
    {
      name: `${poolTypeTranslation('all')}`,
      value: 'all'
    },
    {
      name: poolTypeTranslation('education'),
      value: 'education'
    },
    {
      name: poolTypeTranslation('social'),
      value: 'social'
    },
    {
      name: poolTypeTranslation('technology'),
      value: 'technology'
    }
  ]

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.invest.title')} description={t('v2.pages.invest.description')} />
      <StatusCard>
        <div>
          <h2>{t('v2.pools.status.totalSupply')}</h2>
          <span className='blue'>{`${truncateWei(stakeTogether.totalSupply, 4)} ${t('eth.symbol')}`}</span>
        </div>
        <div>
          <h2>{t('v2.pools.status.totalRewards')}</h2>
          <span className='green'>{`${truncateWei(stakeTogether.totalRewards, 4)} ${t('lsd.symbol')}`}</span>
        </div>
        <div>
          <h2>{t('v2.pools.status.gifts')}</h2>
          <span className='green'>{`${truncateWei(0n, 4)} ${t('lsd.symbol')}`}</span>
        </div>
        <div>
          <h2>{t('v2.pools.status.validators')}</h2>
          <span className='cyan'>{stakeTogether.validatorsCount}</span>
        </div>
        <div>
          <h2>{t('v2.pools.status.totalProjects')}</h2>
          <span className='purple'>{stakeTogether.poolsCount}</span>
        </div>
        <div>
          <h2>{t('v2.pools.status.totalAccounts')}</h2>
          <span>{stakeTogether.accountsCount}</span>
        </div>
      </StatusCard>
      <FiltersContainer>
        <Filters>
          {filterTypes.map(filter => (
            <FilterButton
              onClick={() => selectFilter([filter.value])}
              className={`${activeFilters.includes(filter.value) && 'active'}`}
              key={filter.value}
            >
              {PoolFilterIcon({ iconSize: 16, value: filter.value })}
              {filter.name}
            </FilterButton>
          ))}
        </Filters>
        <PoolsInputSearch search={search} setSearch={selectSearch} />
      </FiltersContainer>
      <ListPools>
        <header>
          <span>{t('v2.pools.list.name')}</span>
          <span>{t('v2.pools.list.type')}</span>
          <span>{t('v2.pools.list.people')}</span>
          <span>{t('v2.pools.list.invested')}</span>
          <span>{t('v2.pools.list.rewards')}</span>
        </header>
        {!poolsFilterBySearch.length && (
          <PoolsEmptyState handleClickButton={clearFilter} key='pool-row-empty' />
        )}
        {poolsFilterBySearch.map(pool => (
          <div key={`pool-row-${pool.address}`}>
            <PoolsRowList key={`pool-list-row-${pool.address}`} pool={pool} loading={isLoading} />
            <PoolsCard key={`pool-card-${pool.address}`} pool={pool} loading={isLoading} />
          </div>
        ))}
      </ListPools>
    </Container>
  )
}

const { Container, ListPools, FiltersContainer, Filters, FilterButton, StatusCard } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.size[24]};
    }
  `,
  StatusCard: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 8px;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 16px;
      margin-bottom: 12px;
      margin-top: 8px;
      gap: 16px;
    }

    div {
      background: ${({ theme }) => theme.color.white};
      padding: 12px 16px;
      box-shadow: ${({ theme }) => theme.shadow[100]};
      border-radius: 8px;

      display: flex;
      flex-direction: column;
      gap: 8px;

      h2 {
        font-size: ${({ theme }) => theme.font.size[12]};
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }

      span {
        font-size: ${({ theme }) => theme.font.size[16]};
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.blue[1]};

        &.blue {
          color: ${({ theme }) => theme.colorV2.blue[3]};
        }

        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }

        &.cyan {
          color: ${({ theme }) => theme.color.messenger[400]};
        }

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }
  `,
  FiltersContainer: styled.div`
    width: 100%;
    display: grid;
    flex-wrap: wrap;
    flex-wrap: wrap-reverse;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.size[16]};
      grid-template-columns: auto 250px;
      grid-template-rows: 34px;
    }
  `,
  Filters: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.size[12]};
    height: 34px;
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
    height: 32px;
    justify-content: center;
    padding: 8px ${({ theme }) => theme.size[12]};
    gap: ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.white};

    border: none;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]} !important;

    white-space: nowrap;
    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
    }
  `,
  ListPools: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    > header {
      display: none;
      grid-template-columns: 0.9fr 0.7fr 0.5fr 0.7fr 0.7fr;
      gap: 8px;
      align-items: center;
      /* background: ${({ theme }) => theme.color.white}; */
      padding: 0 16px;
      border-radius: 8px;

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.colorV2.blue[1]};
        font-weight: 500;
      }

      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: grid;
      }
    }
  `
}
