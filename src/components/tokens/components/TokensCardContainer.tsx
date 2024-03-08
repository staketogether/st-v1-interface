import { Product } from '@/types/Product'
import React from 'react'
import styled from 'styled-components'
import StakingIcons from './StakingIcons'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import StpEthIcon from '../../shared/StpethIcon'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'

type TokensCardContainerProps = {
  product: Product
}

const TokensShowValuePrice = dynamic(() => import('./TokensShowValuePrice'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} />,
  suspense: true
})

export default function TokensCardContainer({ product }: TokensCardContainerProps) {
  const { t } = useLocaleTranslation()
  return (
    <CardContainer
      href={product.urlRedirect}
      className={`${!product.enabled && 'disabled'}`}
      style={{
        pointerEvents: !product.enabled ? 'none' : undefined
      }}
    >
      <ImageContainer>
        <div>
          <StakingIcons stakingProduct={product.icon} size={36} />
          <span>{t(`v2.products.${product.name}`)}</span>
        </div>
        {!product.enabled && <Soon>Soon</Soon>}
      </ImageContainer>
      <ContainerInfo>
        <div>
          <TokensShowValuePrice product={product} />
          <span className='green'>{`APY ${product.apy}%`}</span>
        </div>
        <div>
          <StpEthIcon size={24} />
          <span>{product.symbol}</span>
        </div>
      </ContainerInfo>
    </CardContainer>
  )
}

const { CardContainer, ImageContainer, ContainerInfo, Soon } = {
  CardContainer: styled(Link)`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 24px;
    gap: 24px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid transparent;
    transition:
      border 0.3s ease,
      color 0.3s ease;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      * {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    &.disabled {
      opacity: 0.75;
    }
  `,
  ContainerInfo: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      &:nth-child(1) {
        span {
          display: flex;
          gap: ${({ theme }) => theme.size[8]};

          color: ${({ theme }) => theme.colorV2.blue[1]};
          font-size: 22px;
          font-weight: 500;

          &.green {
            font-size: ${({ theme }) => theme.font.size[13]};
            font-weight: 500;
            color: ${({ theme }) => theme.color.green[500]};
          }
        }
      }
      &:nth-child(2) {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: ${({ theme }) => theme.font.size[15]};
        font-weight: 400;
      }
    }
  `,
  ImageContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
      span {
        color: ${({ theme }) => theme.colorV2.black};
        font-size: 22px;
        font-weight: 500;
      }
    }
  `,
  Soon: styled.div`
    display: flex;
    padding: 3px 8px;
    align-items: center;
    gap: 10px;

    border-radius: 99px;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[1]};

    color: ${({ theme }) => theme.colorV2.gray[6]};

    font-size: 13px;
    font-weight: 400;
  `
}