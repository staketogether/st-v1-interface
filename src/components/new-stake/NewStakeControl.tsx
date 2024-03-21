import React from 'react'
import styled from 'styled-components'
import { Product, ProductMarketAssetData } from '@/types/Product'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import dynamic from 'next/dynamic'
import ProductInfo from './ProductInfo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PiArrowLeft } from 'react-icons/pi'
import LottieAnimation from '../shared/LottieAnimation'
import loadingAnimation from '@assets/animations/loading-animation.json'

const EthereumFormControl = dynamic(() => import('./ethereum/EthereumFormControl'), {
  ssr: false,
  loading: () => (
    <LoadingContainer>
      <LottieAnimation animationData={loadingAnimation} height={70} loop />
    </LoadingContainer>
  ),
  suspense: true
})

type NewStakeControlProps = {
  type: 'deposit' | 'withdraw'
  product: Product
  assetData: ProductMarketAssetData
  chainId: number
}

export default function NewStakeControl({ product, type, assetData, chainId }: NewStakeControlProps) {
  const { t } = useLocaleTranslation()

  const { query } = useRouter()
  const { currency } = query

  return (
    <Container>
      <HeaderBackAction href={`/${currency}`}>
        <PiArrowLeft />
        <span>{t('goToBack')}</span>
      </HeaderBackAction>
      <div>
        <ProductInfo product={product} assetData={assetData} chainId={chainId} />
        <ActionContainer>
          <EthereumFormControl product={product} type={type} chainId={chainId} />
        </ActionContainer>
      </div>
    </Container>
  )
}

const { Container, ActionContainer, HeaderBackAction, LoadingContainer } = {
  Container: styled.div`
    position: relative;
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    > div {
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: ${({ theme }) => theme.size[24]};

      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        display: grid;
        grid-template-columns: 1fr minmax(320px, 400px);
        gap: ${({ theme }) => theme.size[24]};
        align-items: start;
      }
    }
  `,
  ActionContainer: styled.div`
    width: 100%;
    max-width: 400px;
    padding: ${({ theme }) => theme.size[24]};
    background-color: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
  `,
  HeaderBackAction: styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[15]};

    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.6;
    cursor: pointer;
    position: fixed;
    margin-top: -39px;
  `,
  LoadingContainer: styled.div`
    width: 100%;
    min-height: 453px;

    display: grid;
    place-items: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-height: 524px;
    }
  `
}
