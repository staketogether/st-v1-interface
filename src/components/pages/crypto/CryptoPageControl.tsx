import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import styled from 'styled-components'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'
import useAssetsList from './hooks/useAssetsList'
import { useEffect, useRef, useState } from 'react'
import NetworkIcon from '../../shared/NetworkIcon'
import { Select } from 'antd'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../../shared/LottieAnimation'
import Image from 'next/image'
import CryptoAssetTableRow from './CryptoAssetTableRow'

interface FilterType {
  orderBy: 'market_cap' | 'price' | 'price_change_24h'
  orderDirection: 'desc' | 'asc'
  category: 'Decentralized Finance (DeFi)' | 'Fan Token' | 'Stablecoins' | null
  chainId: number
}

export default function CryptoPageControl() {
  const [filter, setFilter] = useState<FilterType>({ orderBy: 'market_cap', orderDirection: 'desc', category: null, chainId: 10 })
  const { t } = useLocaleTranslation()

  const { AssetsList, initialLoading, loadMoreLoading, fetchMore, hasMoreItems } = useAssetsList({
    chainId: filter.chainId,
    orderBy: filter.orderBy,
    orderDirection: filter.orderDirection,
    category: filter.category
  })

  const observerTarget = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (initialLoading || loadMoreLoading || !hasMoreItems) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchMore({ ...filter, chainId: 10, offset: AssetsList.length, limit: 10 })
        }
      },
      { threshold: 1 }
    )

    const target = observerTarget.current

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [observerTarget, initialLoading, loadMoreLoading, hasMoreItems, fetchMore, filter, AssetsList.length])

  function handleFilter(orderBy: 'market_cap' | 'price' | 'price_change_24h', orderDirection: 'desc' | 'asc') {
    setFilter({ ...filter, orderDirection, orderBy })
  }

  function handleCategoryFilter(category: 'Decentralized Finance (DeFi)' | 'Fan Token' | 'Stablecoins' | null) {
    setFilter({ ...filter, category })
  }

  const networks = [
    { network: 'Bitcoin', chainId: 500 },
    { network: 'Optimism', chainId: 10 },
    { network: 'Ethereum', chainId: 1 },
    { network: 'Chiliz', chainId: 88888 },
    { network: 'Polygon', chainId: 137 },
    { network: 'Arbitrum', chainId: 42161 },
    { network: 'zkSync', chainId: 324 }
  ]

  const assets = [
    { network: 'Bitcoin', price: '$60.383,69', variation: '-5.98%' },
    { network: 'Optimism', price: '$60.383,69', variation: '-5.98%' },
    { network: 'Pendle', price: '$60.383,69', variation: '-5.98%' }
  ]

  const isSimplified = !!process.env.NEXT_PUBLIC_SIMPLIFIED

  const optionsList = networks.map(option => {
    return {
      value: option.chainId,
      key: option.chainId,
      label: (
        <NetworkItem>
          <NetworkIcon chain={option.chainId} size={24} />
          <span>{option.network}</span>
        </NetworkItem>
      )
    }
  })

  return (
    <Container>
      <Title>
        <h1>{t(`v3.pages.crypto.title`)}</h1>
        <h2>{t(`v3.pages.crypto.description`)}</h2>
      </Title>
      {!isSimplified && (<HeaderContainerCard>
        <Box open>
          <summary>{t(`tendencies`)}</summary>
          {assets.map(asset => (
            <Detail href="#" key={asset.network}>
              <div>
                <Image src={'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg'} width={24} height={24}
                       alt={''} />
                <span>{asset.network}</span>
              </div>
              <div>
                <span>{asset.price}</span>
                <span className="price-down">{asset.variation}</span>
              </div>
            </Detail>
          ))}
        </Box>
        <Box open>
          <summary>{t(`latestAdded`)}</summary>
          <div>
            {assets.map(asset => (
              <Detail href="#" key={asset.network}>
                <div>
                  <Image src={'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg'} width={24} height={24}
                         alt={''} />
                  <span>{asset.network}</span>
                </div>
                <div>
                  <span>{asset.price}</span>
                  <span className="price-down">{asset.variation}</span>
                </div>
              </Detail>
            ))}
          </div>
        </Box>
        <Box open>
          <summary>{t(`mostVisited`)}</summary>
          <div>
            {assets.map(asset => (
              <Detail href="#" key={asset.network}>
                <div>
                  <Image src={'http://localhost:3000/_next/static/media/bitcoin.59eba954.svg'} width={24} height={24}
                         alt={''} />
                  <span>{asset.network}</span>
                </div>
                <div>
                  <span>{asset.price}</span>
                  <span className="price-down">{asset.variation}</span>
                </div>
              </Detail>
            ))}
          </div>
        </Box>
      </HeaderContainerCard>)}
      <FilterTabContainer>
        <CategoryContainer>
          <div className={`${!filter.category && 'active'}`} onClick={() => handleCategoryFilter(null)}>
            <span>{t('v3.crypto-filter.all')}</span>
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
            <span>{t('v3.crypto-table.name')}</span>
          </div>
          <div>
            <span>{t('v3.crypto-table.price')}</span>
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
            <span>{t('v3.crypto-table.change')}</span>
            <OrderByContainer>
              <UpIcon
                className={`${filter.orderBy === 'price_change_24h' && filter.orderDirection === 'asc' && 'active'}`}
                onClick={() => handleFilter('price_change_24h', 'asc')}
              />
              <DownIcon
                className={`${filter.orderBy === 'price_change_24h' && filter.orderDirection === 'desc' && 'active'}`}
                onClick={() => handleFilter('price_change_24h', 'desc')}
              />
            </OrderByContainer>
          </div>
          <div>
            <span>{t('v3.crypto-table.marketCap')}</span>
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
        {initialLoading && <LottieAnimation animationData={loadingAnimation} height={70} loop />}
        {!initialLoading &&
          AssetsList.map(asset => {
            return <CryptoAssetTableRow asset={asset} key={asset.ref} chainId={filter.chainId} />
          })}
        {loadMoreLoading && <LottieAnimation animationData={loadingAnimation} height={70} width={50} loop />}
      </AssetsListContainer>
      {!loadMoreLoading && !initialLoading && <div ref={observerTarget} style={{ height: 20 }} />}
    </Container>
  )
}

const {
  Container,
  AssetsListContainer,
  Title,
  HeaderContainerCard,
  Box,
  Detail,
  OrderByContainer,
  NetworkItem,
  UpIcon,
  DownIcon,
  FilterTabContainer,
  CategoryContainer
} = {
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
  HeaderContainerCard: styled.div`
    width: 100%;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      flex-wrap: nowrap;
    }
  `,
  Box: styled.details`
    background: ${({ theme }) => theme.color.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: ${({ theme }) => theme.size[16]} 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    cursor: pointer;

    summary {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
      padding: 0px 16px 8px 16px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      summary {
        list-style: none;
        pointer-events: none;
      }
      summary::-webkit-details-marker {
        display: none;
      }
    }
  `,
  Detail: styled.a`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 8px 16px;
    gap: 16px;
    color: ${({ theme }) => theme.color.gray[700]};
    font-weight: 500;
    border: 1px solid transparent;

    > div {
      display: flex;
      align-items: center;
      text-align: center;
      gap: ${({ theme }) => theme.size[8]};
    }

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;

      &.price-down {
        color: ${({ theme }) => theme.color.red[500]};
      }
    }
    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  NetworkItem: styled.div`
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
    > div {
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
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.3;
    &.active {
      opacity: 1;
      color: ${({ theme }) => theme.color.blue[800]};
    }
  `,
  DownIcon: styled(PiCaretDown)`
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.3;
    &.active {
      opacity: 1;
      color: ${({ theme }) => theme.color.blue[800]};
    }
  `,
  AssetsListContainer: styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    > header {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 2fr 1fr;
      background: ${({ theme }) => theme.colorV2.white};
      border-radius: 8px 8px 0 0;

      padding: 4px 16px;
      align-items: center;

      border-bottom: 1px solid ${({ theme }) => theme.colorV2.background};

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
