import { Product } from '@/types/Product'
import React from 'react'
import { PiArrowLeft, PiArrowUpRight, PiCopy } from 'react-icons/pi'
import styled from 'styled-components'
import StakingIcons from '../tokens/StakingIcons'
import SymbolIcons from '../tokens/SymbolIcons'
import chainConfig from '@/config/chain'
import { truncateAddress } from '@/services/truncate'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

type ProductInfoProps = {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { contracts } = chainConfig()
  const { t } = useLocaleTranslation()
  return (
    <ProductContainer>
      <header>
        <HeaderBackAction>
          <PiArrowLeft />
          <span>{t('goToBack')}</span>
        </HeaderBackAction>

        <HeaderProduct>
          <StakingIcons stakingProduct={product.icon} size={36} />
          {product.title}
        </HeaderProduct>

        <HeaderDescribeInfo>
          <div>
            <SymbolIcons productSymbol={product.symbol} size={24} />
            <span className='symbol'>{product.symbol}</span>
          </div>
          <div>
            <span className='CoinValue'>$2.683,69</span>
            <span className='apy'>{`APY:${product.apy}%`}</span>
          </div>
        </HeaderDescribeInfo>
      </header>
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.statistics')}</h2>
        <StatisticContainer>
          <div>
            <span>{t('v2.ethereumStaking.marketCap')}</span>
            <span className='valueItem'>$256,128.61</span>
          </div>
          <div>
            <span>Volume</span>
            <span className='valueItem'>$256,128.61</span>
          </div>
          <div>
            <span>{t('v2.ethereumStaking.lowestValueWeeks')}</span>
            <span className='valueItem'>$256,128.61</span>
          </div>
          <div>
            <span>{t('v2.ethereumStaking.highestValueWeeks')}</span>
            <span className='valueItem'>$256,128.61</span>
          </div>
        </StatisticContainer>
      </ProductBodyContainer>
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.description')}</h2>
        <span>{t(`v2.ethereumStaking.${product.description}`)}</span>
      </ProductBodyContainer>
      <ProductBodyContainer>
        <h2>Links</h2>
        <LinksContainer>
          <a href='#' target='blank'>
            <span>Etherscan</span>
            <span>
              <PiArrowUpRight />
            </span>
          </a>
          <a href='#' target='blank'>
            <span>Website</span>
            <span>
              <PiArrowUpRight />
            </span>
          </a>
          <a href='#' target='blank'>
            <span>Twitter</span>
            <span>
              <PiArrowUpRight />
            </span>
          </a>
        </LinksContainer>
      </ProductBodyContainer>
      <ProductBodyContainer>
        <h2>{t('v2.ethereumStaking.contractAddress')}</h2>
        <span className='copy'>
          {truncateAddress(contracts.StakeTogether)} <PiCopy style={{ fontSize: 16 }} />
        </span>
      </ProductBodyContainer>
    </ProductContainer>
  )
}

const {
  ProductContainer,
  ProductBodyContainer,
  HeaderBackAction,
  LinksContainer,
  HeaderProduct,
  HeaderDescribeInfo,
  StatisticContainer
} = {
  ProductContainer: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[12]};
    }
  `,
  HeaderBackAction: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[15]};

    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.6;
    cursor: pointer;
  `,
  HeaderProduct: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    font-size: ${({ theme }) => theme.font.size[22]};
    font-style: normal;
    font-weight: 500;
  `,
  HeaderDescribeInfo: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      span {
        &.symbol {
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 400;
        }
        &.CoinValue {
          color: ${({ theme }) => theme.colorV2.blue[1]};
          font-size: ${({ theme }) => theme.font.size[22]};
          font-weight: 500;
        }
        &.apy {
          color: ${({ theme }) => theme.color.green[500]};
          font-size: ${({ theme }) => theme.font.size[13]};
          font-weight: 500;
        }
      }
    }
  `,
  ProductBodyContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    > h2 {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
    }

    span {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.8;

      &.valueItem {
        font-size: 20px;
        color: ${({ theme }) => theme.colorV2.gray[1]};
        opacity: 1;
      }

      &.copy {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        cursor: pointer;
        img {
          margin-top: 1px;
        }
      }
    }
  `,
  StatisticContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  LinksContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[32]};
    a {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
    }
  `
}
