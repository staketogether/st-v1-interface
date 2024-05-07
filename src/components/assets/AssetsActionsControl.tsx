import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import LottieAnimation from '../shared/LottieAnimation'
import loadingAnimation from '@assets/animations/loading-animation.json'

interface AssetsActionsControlProps {
  type: 'buy' | 'sell' | 'swap'
  product: Asset
}

const AssetsBuyControl = dynamic(() => import('./AssetsBuyControl'), {
  ssr: false,
  loading: () => (
    <LoadingContainer>
      <LottieAnimation animationData={loadingAnimation} height={70} loop />
    </LoadingContainer>
  ),
  suspense: true
})

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

            <li className={`${type === 'sell' && 'activated'}`}>
              <Link href={`${product.url.replace('currency', currency)}/sell`}>{t('sell')}</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <BuyAssetContainer>
          <AssetsBuyControl type={type} asset={product} />
        </BuyAssetContainer>
      </div>
    </EthereumContainer>
  )
}

const { EthereumContainer, LoadingContainer, BuyAssetContainer } = {
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
  LoadingContainer: styled.div`
    width: 100%;
    min-height: 400px;

    display: grid;
    place-items: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-height: 524px;
    }
  `,
  BuyAssetContainer: styled.div``
}
