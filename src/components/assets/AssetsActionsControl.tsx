import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { AssetActionType } from '@/types/AssetActionType'
import { Tooltip } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import AssetsBuyControl from './AssetsBuyControl'
import { AssetsReceive } from './AssetsReceive'
import { AssetsSend } from './AssetsSend'

interface AssetsActionsControlProps {
  type: AssetActionType
  product: Asset
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
              <Link href={product.url.replace('currency', currency)}>{t('buy')}</Link>
            </li>
            <Tooltip title={t('soon')}>
              <li className={`${type === 'sell' && 'activated'}`}>
                <Link href={`${product.url.replace('currency', currency)}/withdraw`}>{t('sell')}</Link>
              </li>
            </Tooltip>
            <li className={`${type === 'swap' && 'activated'}`}>
              <Link href={`${product.url.replace('currency', currency)}/swap`}>{t('swap')}</Link>
            </li>
            <li className={`${type === 'send' && 'activated'}`}>
              <Link href={`${product.url.replace('currency', currency)}/send`}>{t('send')}</Link>
            </li>
            <li className={`${type === 'receive' && 'activated'}`}>
              <Link href={`${product.url.replace('currency', currency)}/receive`}>{t('receive')}</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        {type === 'buy' && (
          <BuyAssetContainer>
            <AssetsBuyControl type={type} asset={product} />
          </BuyAssetContainer>
        )}
        {type === 'sell' && (
          <BuyAssetContainer>
            <AssetsBuyControl type={type} asset={product} />
          </BuyAssetContainer>
        )}
        {type === 'send' && <AssetsSend asset={product} />}
        {type === 'receive' && <AssetsReceive asset={product} />}
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
