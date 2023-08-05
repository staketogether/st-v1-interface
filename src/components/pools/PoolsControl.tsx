import styled from 'styled-components'

import useTranslation from '@/hooks/useTranslation'
import { useState } from 'react'
import { BsBook, BsHeart, BsLightbulb, BsPalette } from 'react-icons/bs'
import { Pool } from '../../types/Pool'
import PoolsInputSearch from './PoolsInputSearch'
import PoolsRowList from './PoolsRowList'

type PoolsListProps = {
  pools: Pool[]
}

export enum PoolsFilter {
  'all' = 'All',
  'art' = 'Art',
  'education' = 'Education',
  'socialImpact' = 'Social Impact',
  'innovation' = 'Innovation'
}

export default function PoolsControl({ pools }: PoolsListProps) {
  const [search, setSearch] = useState<string>('')
  const [activeFilters] = useState<PoolsFilter[]>([PoolsFilter.all])
  const { t } = useTranslation()

  const filterTypes = [
    {
      icon: <></>,
      name: t('v2.pools.filter.all'),
      value: PoolsFilter.all
    },
    {
      icon: <BsPalette fontSize={14} />,
      name: t('v2.pools.filter.art'),
      value: PoolsFilter.art
    },
    {
      icon: <BsBook fontSize={14} />,
      name: t('v2.pools.filter.education'),
      value: PoolsFilter.education
    },
    {
      icon: <BsHeart fontSize={14} />,
      name: t('v2.pools.filter.socialImpact'),
      value: PoolsFilter.socialImpact
    },
    {
      icon: <BsLightbulb fontSize={14} />,
      name: t('v2.pools.filter.innovation'),
      value: PoolsFilter.innovation
    }
  ]

  return (
    <Container>
      <FiltersContainer>
        <Filters>
          {filterTypes.map(filter => (
            <FilterButton className={`${activeFilters.includes(filter.value) && 'active'}`} key={filter.value}>
              {filter.icon}
              {filter.name}
            </FilterButton>
          ))}
        </Filters>
        <Search>
          <PoolsInputSearch search={search} setSearch={setSearch} />
        </Search>
      </FiltersContainer>
      <ListPools>
        <header>
          <span>{t('v2.pools.list.name')}</span>
          <span>{t('v2.pools.list.type')}</span>
          <span>{t('v2.pools.list.people')}</span>
          <span>{t('v2.pools.list.invested')}</span>
        </header>
        {!pools && <div>No Pools</div>}
        {pools.map(pool => (
          <PoolsRowList
            key={pool.address}
            address={pool.address}
            people={pool.receivedDelegationsCount}
            invested={pool.poolBalance}
          />
        ))}
        {pools.map(pool => (
          <PoolsRowList
            key={pool.address}
            address={pool.address}
            people={pool.receivedDelegationsCount}
            invested={pool.poolBalance}
          />
        ))}
        {pools.map(pool => (
          <PoolsRowList
            key={pool.address}
            address={pool.address}
            people={pool.receivedDelegationsCount}
            invested={pool.poolBalance}
          />
        ))}
        {pools.map(pool => (
          <PoolsRowList
            key={pool.address}
            address={pool.address}
            people={pool.receivedDelegationsCount}
            invested={pool.poolBalance}
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
    gap: ${({ theme }) => theme.size[24]};
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
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
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
      grid-template-columns: 1fr 0.8fr 0.5fr 0.8fr 112px;
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
