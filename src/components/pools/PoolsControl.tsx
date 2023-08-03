import styled from 'styled-components'

import { Pool } from '../../types/Pool'
import { useState } from 'react'
import PoolsInputSearch from './PoolsInputSearch'
import PoolsRowList from './PoolsRowList'

type PoolsListProps = {
  pools: Pool[]
}

export enum PoolsTypes {
  ALL = 'all',
  SOCIALIMPACT = 'socialImpact',
  DEFI = 'defi',
  NFT = 'nft',
  EDUCATION = 'education',
  COMMUNITY = 'community',
  CONTENTCREATOR = 'contentCreator'
}

export default function PoolsControl({ pools }: PoolsListProps) {
  const [search, setSearch] = useState<string>('')
  const [activeFilters] = useState<PoolsTypes[]>([PoolsTypes.ALL])
  // const { t } = useTranslation()

  const filterTypes = [
    {
      name: 'Todos',
      value: PoolsTypes.ALL
    },
    {
      name: 'Impacto Social',
      value: PoolsTypes.SOCIALIMPACT
    },
    {
      name: 'Defi',
      value: PoolsTypes.DEFI
    },
    {
      name: 'NFT',
      value: PoolsTypes.NFT
    },
    {
      name: 'Educação',
      value: PoolsTypes.EDUCATION
    }
  ]

  return (
    <Container>
      <PoolsInputSearch search={search} setSearch={setSearch} />
      <FilterContainer>
        {filterTypes.map(filter => (
          <button className={`${activeFilters.includes(filter.value) && 'active'}`} key={filter.value}>
            {filter.name}
          </button>
        ))}
      </FilterContainer>
      <ListPools>
        <header>
          <span>Rank</span>
          <span>Name</span>
          <span>Type</span>
          <span>Members</span>
          <span>Staked</span>
        </header>
        {!pools && <div>No Pools</div>}
        {pools.map(pool => (
          <PoolsRowList
            key={pool.address}
            poolAddress={pool.address}
            members={pool.receivedDelegationsCount}
            staked={pool.poolBalance}
            rankPosition={1}
          />
        ))}
      </ListPools>
    </Container>
  )
}

const { Container, ListPools, FilterContainer } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  FilterContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      padding: 0px ${({ theme }) => theme.size[8]};

      border-radius: ${({ theme }) => theme.size[12]};
      background: ${({ theme }) => theme.color.whiteAlpha[500]};
      box-shadow: ${({ theme }) => theme.shadow[100]};

      border: none;

      font-size: ${({ theme }) => theme.font.size[12]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      color: ${({ theme }) => theme.color.primary};

      &:hover,
      &.active {
        background: ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.white};
      }
    }
  `,
  ListPools: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    > header {
      display: grid;
      grid-template-columns: 40px 320px 1fr 1fr 1fr 92px;
      gap: 8px;
      align-items: center;
      padding-left: 12px;

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        color: ${({ theme }) => theme.color.blue[400]};
      }
    }
  `
}
