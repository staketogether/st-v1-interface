import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import styled from 'styled-components'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'
import useAssetsList from './hooks/useAssetsList'
import CryptoAssetTableRow from './CryptoAssetTableRow'
import { useCallback, useRef, useState } from 'react'
import NetworkIcon from '../shared/NetworkIcon'
import { Select } from 'antd'

interface FilterType {
  orderBy: 'market_cap' | 'price' | 'volume'
  orderDirection: 'desc' | 'asc'
  category: 'Decentralized Finance (DeFi)' | 'Fan Token' | 'Stablecoins' | null
  chainId: number
}

export default function CryptoPageControl() {
  const [filter, setFilter] = useState<FilterType>({ orderBy: 'market_cap', orderDirection: 'asc', category: null, chainId: 10 })
  const { t } = useLocaleTranslation()

  const { AssetsList, initialLoading, loadMoreLoading, fetchMore } = useAssetsList({
    chainId: filter.chainId,
    orderBy: filter.orderBy,
    orderDirection: filter.orderDirection
  })
  const loadMoreRef = useRef<IntersectionObserver | null>(null)
  const lastBookElementRef = useCallback(
    (node: Element | null) => {
      if (initialLoading || loadMoreLoading) return
      console.log('passei aq')
      if (loadMoreRef.current) loadMoreRef.current.disconnect()
      loadMoreRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchMore({ ...filter, chainId: 10, offset: AssetsList.length, limit: 10 })
        }
      })
      if (node) loadMoreRef.current.observe(node)
    },
    [AssetsList.length, fetchMore, filter, initialLoading, loadMoreLoading]
  )

  function handleFilter(orderBy: 'market_cap' | 'price' | 'volume', orderDirection: 'desc' | 'asc') {
    setFilter({ ...filter, orderDirection, orderBy })
  }

  function handleCategoryFilter(category: 'Decentralized Finance (DeFi)' | 'Fan Token' | 'Stablecoins' | null) {
    setFilter({ ...filter, category })
  }

  const networks = [
    { network: 'Optimism', chainId: 10 },
    { network: 'Ethereum', chainId: 1 },
    { network: 'Chiliz', chainId: 88888 },
    { network: 'Polygon', chainId: 137 },
    { network: 'Arbitrum', chainId: 42161 },
    { network: 'zkSync', chainId: 324 }
  ]

  const optionsList = networks.map(option => {
    return {
      value: option.chainId,
      key: option.chainId,
      label: (
        <NetWorkItem>
          <NetworkIcon chain={option.chainId} size={24} />
          <span>{option.network}</span>
        </NetWorkItem>
      )
    }
  })

  return (
    <Container>
      <Title>
        <h1>{t(`v3.pages.crypto.title`)}</h1>
        <h2>{t(`v3.pages.crypto.description`)}</h2>
      </Title>
      <FilterTabContainer>
        <CategoryContainer>
          <div className={`${!filter.category && 'active'}`} onClick={() => handleCategoryFilter(null)}>
            <span>Todos</span>
          </div>
          <div
            className={`${filter.category === 'Decentralized Finance (DeFi)' && 'active'}`}
            onClick={() => handleCategoryFilter('Decentralized Finance (DeFi)')}
          >
            <span>Defi</span>
          </div>
          <div className={`${filter.category === 'Stablecoins' && 'active'}`} onClick={() => handleCategoryFilter('Stablecoins')}>
            <span>Stablecoin</span>
          </div>
          <div className={`${filter.category === 'Fan Token' && 'active'}`} onClick={() => handleCategoryFilter('Fan Token')}>
            <span>Fan Tokens</span>
          </div>
        </CategoryContainer>
        <Select
          defaultValue={filter.chainId}
          style={{ height: '40px', outline: 'none', fontSize: '13px' }}
          onChange={data => setFilter({ ...filter, chainId: data })}
          options={optionsList}
        />
      </FilterTabContainer>
      <AssetsListContainer>
        <header>
          <div>
            <span>nome</span>
          </div>
          <div>
            <span>preço</span>
            <OrderByContainer>
              <UpIcon
                className={`${filter.orderBy === 'price' && filter.orderDirection === 'asc' && 'active'}`}
                onClick={() => handleFilter('price', 'asc')}
              />
              <DownIcon
                className={`${filter.orderBy === 'price' && filter.orderDirection === 'desc' && 'active'}`}
                onClick={() => handleFilter('price', 'desc')}
              />
            </OrderByContainer>
          </div>
          <div>
            <span>variação</span>
            <OrderByContainer>
              <UpIcon
                className={`${filter.orderBy === 'volume' && filter.orderDirection === 'asc' && 'active'}`}
                onClick={() => handleFilter('volume', 'asc')}
              />
              <DownIcon
                className={`${filter.orderBy === 'volume' && filter.orderDirection === 'desc' && 'active'}`}
                onClick={() => handleFilter('volume', 'desc')}
              />
            </OrderByContainer>
          </div>
          <div>
            <span>Valor de mercado</span>
            <OrderByContainer>
              <UpIcon
                className={`${filter.orderBy === 'market_cap' && filter.orderDirection === 'asc' && 'active'}`}
                onClick={() => handleFilter('market_cap', 'asc')}
              />
              <DownIcon
                className={`${filter.orderBy === 'market_cap' && filter.orderDirection === 'desc' && 'active'}`}
                onClick={() => handleFilter('market_cap', 'desc')}
              />
            </OrderByContainer>
          </div>
          <div />
        </header>
        {AssetsList.map(asset => {
          return <CryptoAssetTableRow asset={asset} key={asset.ref} chainIdActivated={filter.chainId} />
        })}
      </AssetsListContainer>
      {!loadMoreLoading && !initialLoading && <div ref={lastBookElementRef} style={{ height: 20 }} />}
    </Container>
  )
}

const { Container, AssetsListContainer, Title, OrderByContainer, NetWorkItem, UpIcon, DownIcon, FilterTabContainer, CategoryContainer } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
  `,

  Title: styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.colorV2.blue[1]};
    h1 {
      font-size: ${({ theme }) => theme.font.size[32]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${({ theme }) => theme.color.gray[600]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.size[8]};

      h1 {
        font-size: 36px;
      }
    }
  `,
  NetWorkItem: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    > span {
      font-size: 13px;
      font-weight: 400;
    }
  `,
  FilterTabContainer: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[32]};
    align-items: center;
    justify-content: space-between;
  `,
  CategoryContainer: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.size[24]};
    align-items: center;
    div {
      height: 24px;
      display: flex;
      justify-content: center;
      cursor: pointer;
      &:hover,
      &.active {
        border-bottom: 2px solid ${({ theme }) => theme.colorV2.blue[1]};
        span {
          opacity: 1;
        }
      }
      span {
        font-size: 13px;
        font-weight: 500;
        opacity: 0.8;
      }
    }
  `,
  UpIcon: styled(PiCaretUp)`
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size[16]};
    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  DownIcon: styled(PiCaretDown)`
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size[16]};
    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  AssetsListContainer: styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    > header {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 2fr 1fr;
      background: ${({ theme }) => theme.colorV2.white};
      box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
      border-radius: ${({ theme }) => theme.size[8]};
      padding: 4px 16px;
      align-items: center;

      > div {
        font-size: 13px;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  `,
  OrderByContainer: styled.div`
    display: flex;
    flex-direction: column;
  `
}
