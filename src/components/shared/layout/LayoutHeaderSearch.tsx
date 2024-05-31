import { useEffect, useRef, useState } from 'react'
import { PiCoinsLight, PiChartLine } from 'react-icons/pi'
import { getListedStaking } from '@/config/product/staking'
import { getListedAssets } from '@/config/product/asset'
import styled from 'styled-components'
import Fuse from 'fuse.js'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import AssetIcon from '../AssetIcon'
import { chainConfigByChainId } from '@/config/chain'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchInput from '../inputs/SearchInput'
import useHeaderSearch from '@/hooks/useHeaderSearch'

export default function LayoutHeaderSearch() {
  const [searchValue, setSearchValue] = useState('')
  const [showResultArea, setShowResultArea] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { t } = useLocaleTranslation()

  const {hasItemsFiltered, assetsListFiltered, stakingListsFiltered}  = useHeaderSearch(searchValue)
  
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showResultArea) setShowResultArea(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResultArea(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showResultArea])

  return (
    <Container ref={containerRef}>
      <SearchInput search={searchValue} setSearch={setSearchValue} onFocus={() => setShowResultArea(true)} />

      {showResultArea && hasItemsFiltered && (
        <WrapperResult onBlur={() => setShowResultArea(false)}>
          <WrapperCard>
            {!!assetsListFiltered.length && (
              <header>
                <PiCoinsLight />
                <span>{t('v2.header.assets')}</span>
              </header>
            )}
            {assetsListFiltered.map(asset => (
              <Row key={asset.item.id} href={asset.item.url.replace('currency', currency)} onClick={() => setShowResultArea(false)}>
                <AssetIcon image={asset.item.symbolImage} chain={asset.item.chains[0]} size={32} altName={asset.item.id} />
                <div>
                  <h2>{asset.item.symbol}</h2>
                  <span>{chainConfigByChainId(asset.item.chains[0]).name}</span>
                </div>
              </Row>
            ))}
            {!!stakingListsFiltered.length && (
              <header>
                <PiChartLine />
                <span>{t('v2.header.staking')}</span>
              </header>
            )}
            {stakingListsFiltered.map(staking => (
              <Row key={staking.item.id} href={staking.item.url.replace('currency', currency)} onClick={() => setShowResultArea(false)}>
                <AssetIcon image={staking.item.symbolImage} chain={staking.item.asset.chains[0]} size={32} altName={staking.item.id} />
                <div>
                  <h2>{staking.item.symbol}</h2>
                  <span>{chainConfigByChainId(staking.item.asset.chains[0]).name}</span>
                </div>
              </Row>
            ))}
          </WrapperCard>
        </WrapperResult>
      )}
    </Container>
  )
}

const { Container, WrapperResult, WrapperCard, Row } = {
  Container: styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;
  `,
  WrapperResult: styled.div`
    width: 100%;
    height: auto;

    background: ${({ theme }) => theme.color.white};
    position: absolute;
    z-index: 1;
    top: 40px;
    border-radius: 8px;
    box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.2);
  `,
  WrapperCard: styled.div`
    width: 100%;
    height: auto;

    min-height: 150px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    overflow-y: auto;
    padding: ${({ theme }) => theme.size[8]};

    > header {
      font-size: ${props => props.theme.font.size[15]};
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  Row: styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[8]};
    transition: background-color 0.2s;
    padding: 4px 2px;
    cursor: pointer;

    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-size: ${props => props.theme.font.size[12]};
      text-decoration: none;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.foreground};
    }
  `
}
