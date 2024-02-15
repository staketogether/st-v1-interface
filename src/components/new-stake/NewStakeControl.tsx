import { ContentfulPool } from '@/types/ContentfulPool'
import React from 'react'
import styled from 'styled-components'
import StakingIcons from '../tokens/StakingIcons'

export type Product = {
  name: string
  logo: string
}

type NewStakeControlProps = {
  poolAddress: `0x${string}`
  type: 'deposit' | 'withdraw'
  poolDetail?: ContentfulPool
  isStakeTogetherPool?: boolean
  productName: 'Ethereum Staking'
  productIcon: 'ethereum'
}

export default function NewStakeControl({ poolAddress, productIcon, productName }: NewStakeControlProps) {
  return (
    <Container>
      <ProductContainer>
        <header>
          <HeaderProduct>
            <StakingIcons stakingProduct={productIcon} size={36} />
            {productName}
          </HeaderProduct>
        </header>
      </ProductContainer>
      <ActionContainer>Stake</ActionContainer>
    </Container>
  )
}

const { Container, ProductContainer, HeaderProduct, ActionContainer } = {
  Container: styled.div`
    width: 100%;
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr minmax(320px, 400px);
    gap: ${({ theme }) => theme.size[24]};
  `,
  ProductContainer: styled.div`
    height: 500px;
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
  HeaderProduct: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    font-size: ${({ theme }) => theme.font.size[22]};
    font-style: normal;
    font-weight: 500;
  `,

  ActionContainer: styled.div`
    height: 500px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `
}
