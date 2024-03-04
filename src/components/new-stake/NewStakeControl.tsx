import React from 'react'
import styled from 'styled-components'
import { StakingProduct } from '@/types/Product'
import useProducts from '@/hooks/useProducts'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import dynamic from 'next/dynamic'

const ProductInfo = dynamic(() => import('./ProductInfo'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
  suspense: true
})

const EthereumFormControl = dynamic(() => import('./ethereum/EthereumFormControl'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

type NewStakeControlProps = {
  type: 'deposit' | 'withdraw'
  productName: StakingProduct
  suspense: true
}

export default function NewStakeControl({ productName, type }: NewStakeControlProps) {
  const { findProduct } = useProducts()
  const { t } = useLocaleTranslation()
  const product = findProduct(productName)

  const handleProductAction = () => {
    switch (productName) {
      case 'ethereum':
        return <EthereumFormControl type={type} />

      default:
        return <div>{t('v2.products.productNotAvailable')}</div>
    }
  }

  return (
    <Container>
      <ProductInfo product={product} />
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

    gap: ${({ theme }) => theme.size[24]};

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: 1fr minmax(320px, 400px);
      gap: ${({ theme }) => theme.size[24]};
      align-items: start;
    }
  `,
  ActionContainer: styled.div`
    width: 100%;
    flex: 1;

    padding: ${({ theme }) => theme.size[24]};
    background-color: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
  `
}
