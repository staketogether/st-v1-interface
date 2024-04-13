import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProductAsset } from '@/types/ProductAsset'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import AssetsBuyControl from './AssetsBuyControl'

type AssetsActionsControlProps = {
  type: 'buy' | 'sell' | 'swap'
  product: ProductAsset
  chainId: number
}

export default function AssetsActionsControl({ type, product, chainId }: AssetsActionsControlProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }
  const { account } = useConnectedAccount()

  console.log(chainId, account)

  return (
    <EthereumContainer>
      <header>
        <nav>
          <ul>
            <li className={`${type === 'buy' && 'activated'}`}>
              <Link href={product.urlRedirect.replace('currency', currency)}>{t('buy')}</Link>
            </li>
            <li className={`${type === 'sell' && 'activated'}`}>
              <Link href={`${product.urlRedirect.replace('currency', currency)}/withdraw`}>{t('sell')}</Link>
            </li>
            <li className={`${type === 'sell' && 'activated'}`}>
              <Link href={`${product.urlRedirect.replace('currency', currency)}/withdraw`}>swap</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        {type === 'buy' && (
          <BuyAssetContainer>
            <AssetsBuyControl />
          </BuyAssetContainer>
        )}
        {type === 'sell' && <div>sell</div>}
        {type === 'swap' && <div>swap</div>}
      </div>
    </EthereumContainer>
  )
}

const { EthereumContainer, BuyAssetContainer } = {
  EthereumContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav {
      ul {
        display: flex;
        gap: ${({ theme }) => theme.size[24]};
        align-items: center;
        li {
          height: 24px;
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 400;
          cursor: pointer;

          position: relative;
          display: inline-block;
          text-decoration: none;
          overflow: hidden;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: ${({ theme }) => theme.colorV2.purple[1]};
            transform: scaleX(0);
            transform-origin: bottom left;
            transition: transform 0.3s ease-out;
          }
          &:hover {
            a {
              color: ${({ theme }) => theme.colorV2.purple[1]};
              opacity: 1;
            }
          }

          &:hover::after {
            transform: scaleX(1);
          }

          &.activated::after,
          &.activated:hover::after {
            transform: scaleX(0);
            transition: none;
          }

          &.activated {
            border-bottom: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
            a {
              color: ${({ theme }) => theme.colorV2.purple[1]};
              opacity: 1;
            }
          }

          a {
            color: ${({ theme }) => theme.colorV2.gray[1]};
            opacity: 0.6;
          }
        }
      }
    }
  `,
  BuyAssetContainer: styled.div``
}
