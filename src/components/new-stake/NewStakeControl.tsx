import React from 'react'
import styled from 'styled-components'
import { Product, ProductMarketAssetData } from '@/types/Product'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import dynamic from 'next/dynamic'
import ProductInfo from './ProductInfo'

const EthereumFormControl = dynamic(() => import('./ethereum/EthereumFormControl'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
  suspense: true
})

type NewStakeControlProps = {
  type: 'deposit' | 'withdraw'
  product: Product
  assetData: ProductMarketAssetData
}

export default function NewStakeControl({ product, type, assetData }: NewStakeControlProps) {
  const { t } = useLocaleTranslation()

  const handleProductAction = () => {
    switch (product.name) {
      case 'ethereum':
        return <EthereumFormControl type={type} />

      default:
        return <div>{t('v2.products.productNotAvailable')}</div>
    }
  }

  return (
    <Container>
      <ProductInfo product={product} assetData={assetData} />
      <ActionContainer>{handleProductAction()}</ActionContainer>
    </Container>
  )
}

const { Container, ActionContainer } = {
  Container: styled.div`
    width: 100%;
    min-width: 100%;

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
  `,
  ActionContainer: styled.div`
    padding: ${({ theme }) => theme.size[24]};
    background-color: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
  `
}
