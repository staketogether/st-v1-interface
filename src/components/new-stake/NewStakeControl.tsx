import { ContentfulPool } from '@/types/ContentfulPool'
import React from 'react'
import styled from 'styled-components'
import { StakingProduct } from '@/types/Product'
import useProducts from '@/hooks/useProducts'
import ProductInfo from './ProductInfo'

type NewStakeControlProps = {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw'
  poolDetail?: ContentfulPool
  isStakeTogetherPool?: boolean
  productName: StakingProduct
}

export default function NewStakeControl({ productName }: NewStakeControlProps) {
  const { productsList } = useProducts()
  const product = productsList.find(product => product.name === productName) || productsList[0]

  return (
    <Container>
      <ProductInfo product={product} />
      <ActionContainer>Stake</ActionContainer>
    </Container>
  )
}

const { Container, ActionContainer } = {
  Container: styled.div`
    width: 100%;
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr minmax(320px, 400px);
    gap: ${({ theme }) => theme.size[24]};
  `,
  ActionContainer: styled.div`
    height: 500px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `
}
