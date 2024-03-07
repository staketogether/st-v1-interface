import React from 'react'
import styled from 'styled-components'
import { Product, ProductMarketAssetData } from '@/types/Product'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import dynamic from 'next/dynamic'
import ProductInfo from './ProductInfo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PiArrowLeft } from 'react-icons/pi'

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

  const { query } = useRouter()
  const { currency, network } = query

  return (
    <Container>
      <HeaderBackAction href={`/${network}/${currency}/product`}>
        <PiArrowLeft />
        <span>{t('goToBack')}</span>
      </HeaderBackAction>
      <div>
        <ProductInfo product={product} assetData={assetData} />
        <ActionContainer>
          <EthereumFormControl product={product} type={type} />
        </ActionContainer>
      </div>
    </Container>
  )
}

const { Container, ActionContainer, HeaderBackAction } = {
  Container: styled.div`
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    > div {
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
  `
}
