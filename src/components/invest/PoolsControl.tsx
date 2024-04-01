import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import { useMapPoolsWithTypes } from '@/hooks/contentful/useMapPoolsWithTypes'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
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
import useResizeView from '@/hooks/useResizeView'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'
import { PiPencilSimpleLine } from 'react-icons/pi'
import ProjectCreateModal from '../project/ProjectCreateModal'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import { ProjectButton } from '../project/ProjectButton'

type PoolsListProps = {
  pools: PoolSubgraph[]
  stakeTogether: StakeTogether
}

export default function PoolsControl({ pools }: PoolsListProps) {
  const [search, setSearch] = useState<string>('')
  const [activeFilters, setActiveFilters] = useState<string[]>(['all'])
  const { t } = useLocaleTranslation()
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { setOpenProjectCreateModal } = useProjectCreateModal()
  const { screenWidth, breakpoints } = useResizeView()
  const { account } = useConnectedAccount()

  const { poolsWithTypes, isLoading } = useMapPoolsWithTypes(pools)
  const { poolDetail: poolDetailUs } = useContentfulPoolDetails({
    poolAddress: account,
    fetchPolicy: 'network-only',
    locale: 'en-US'
  })

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
      <LayoutTitle title={t('v2.pages.invest.title')} description={''} />
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
        {!poolDetailUs && (
          <MenuButton onClick={() => setOpenProjectCreateModal(true)}>
            <CreateProjectIcon /> {t('v2.createProject.title')}
          </MenuButton>
        )}
        {poolDetailUs && <ProjectButton poolDetail={poolDetailUs} account={account} />}
        <PoolsInputSearch search={search} setSearch={selectSearch} />
      </FiltersContainer>
      <ListPools>
        <header>
          <span>{t('v2.pools.list.name')}</span>
          <span>{t('v2.pools.list.type')}</span>
          <span>{t('v2.pools.list.people')}</span>
          <span>{t('v2.pools.list.invested')}</span>
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
      {screenWidth > breakpoints.lg && <ProjectCreateModal account={account} poolDetail={poolDetailUs} />}
    </Container>
  )
}

const { Container, ListPools, FiltersContainer, Filters, FilterButton, CreateProjectIcon, MenuButton } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.size[24]};
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
      grid-template-columns: auto 150px 250px;
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
      grid-template-columns: 0.9fr 0.7fr 0.5fr 0.7fr;
      gap: 8px;
      align-items: center;
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
  `,
  MenuButton: styled.button`
    width: auto;
    height: 32px;
    border-radius: 99px;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    border: none;
    padding: 0 ${({ theme }) => theme.size[12]};
    background: transparent;

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]} !important;

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }

    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `
}
