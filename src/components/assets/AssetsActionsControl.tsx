import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProductAsset } from '@/types/ProductAsset'
import { Tooltip } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import AssetsBuyControl from './AssetsBuyControl'

type AssetsActionsControlProps = {
  type: 'buy' | 'sell' | 'swap'
  product: ProductAsset
}

export default function AssetsActionsControl({ type, product }: AssetsActionsControlProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  return (
    <EthereumContainer>
      <header>
        <nav>
          <ul>
            <li className={`${type === 'buy' && 'activated'}`}>
              <Link href={product.urlRedirect.replace('currency', currency)}>{t('buy')}</Link>
            </li>
            <Tooltip title={t('soon')}>
              <li className={`${type === 'sell' && 'activated'} disabled`}>
                <Link href={`${product.urlRedirect.replace('currency', currency)}/withdraw`}>{t('sell')}</Link>
              </li>
            </Tooltip>
          </ul>
        </nav>
      </header>
      <div>
        {type === 'buy' && (
          <BuyAssetContainer>
            <AssetsBuyControl type={type} product={product} />
          </BuyAssetContainer>
        )}
        {type === 'sell' && (
          <BuyAssetContainer>
            <AssetsBuyControl type={type} product={product} />
          </BuyAssetContainer>
        )}
        {type === 'swap' && <div>sell</div>}
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
          &.disabled {
            cursor: not-allowed;
            opacity: 0.6;
            a {
              pointer-events: none;
              cursor: not-allowed;
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
